<#
  ESTRO · verifica di collegamenti, file e immagini
  Controlla ogni riferimento a file in html, css e js di una cartella-sito:
    - il file esiste (anche rispettando le MAIUSCOLE: un server Linux le distingue)
    - il riferimento non contiene spazi, %-codifiche o caratteri speciali
    - le immagini sono webp (eccetto svg, favicon e icone dell'app)
    - le ancore #id puntano a un id che esiste nella pagina di destinazione
    - niente id duplicati nella stessa pagina, niente <img> senza alt
  Non modifica nulla. Uso:
    powershell -File strumenti\verifica-collegamenti.ps1 -Root <cartella-sito> [-Report file.md]
#>
param(
  [Parameter(Mandatory = $true)][string]$Root,
  [string]$Report = ''
)
$ErrorActionPreference = 'Stop'
$Root = (Resolve-Path $Root).Path.TrimEnd('\')
$excl = '\\(\.git|\.claude|sviluppo|node_modules|strumenti|docs)(\\|$)'
$imgExt = 'webp', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'ico', 'avif'
$fileExt = $imgExt + 'mp4', 'webm', 'otf', 'ttf', 'woff', 'woff2', 'pdf'
$extAlt = ($fileExt + 'html', 'css', 'js') -join '|'

# elenchi cartelle per il controllo "maiuscole esatte"
$dirCache = @{}
function Entries([string]$dir) {
  if (-not $dirCache.ContainsKey($dir)) {
    $dirCache[$dir] = @([IO.Directory]::GetFileSystemEntries($dir) | ForEach-Object { [IO.Path]::GetFileName($_) })
  }
  return $dirCache[$dir]
}
function ResolveExact([string]$full) {
  # $full = percorso assoluto già normalizzato. Ritorna: 'ok' | 'case' | 'manca'
  if (-not $full.StartsWith($Root, [StringComparison]::OrdinalIgnoreCase)) { return 'fuori' }
  $rel = $full.Substring($Root.Length).TrimStart('\')
  if (-not $rel) { return 'ok' }
  $cur = $Root; $state = 'ok'
  foreach ($seg in $rel.Split('\')) {
    $names = Entries $cur
    if ($names -ccontains $seg) { $cur = Join-Path $cur $seg; continue }
    if ($names -contains $seg) { $state = 'case'; $real = $names | Where-Object { $_ -ieq $seg } | Select-Object -First 1; $cur = Join-Path $cur $real; continue }
    return 'manca'
  }
  return $state
}

$all = Get-ChildItem -Path $Root -Recurse -File | Where-Object { $_.FullName.Substring($Root.Length) -notmatch $excl -and $_.Name -ne '_audit.js' }
$codice = $all | Where-Object { '.html', '.css', '.js' -contains $_.Extension.ToLower() }

$problemi = New-Object System.Collections.Generic.List[object]
$esterni = @{}
$nRif = 0
function Add-Prob([string]$tipo, [string]$file, [string]$rif, [string]$nota = '') {
  $problemi.Add([pscustomobject]@{ tipo = $tipo; file = $file; rif = $rif; nota = $nota })
}

function Check-Ref([string]$fileRel, [string]$fileDir, [string]$raw, [string]$kind, [string]$rootBase) {
  $script:nRif++
  $r = [Net.WebUtility]::HtmlDecode($raw).Trim()
  if (-not $r) { return }
  if ($r -match '^(?i)(https?:)?//') { $h = ([Uri]($r -replace '^//', 'https://')).Host; if ($esterni.ContainsKey($h)) { $esterni[$h]++ } else { $esterni[$h] = 1 }; return }
  if ($r -match '^(?i)(data:|mailto:|tel:|javascript:|blob:|about:|#)') { return }
  if ($r -match '\$\{|\{\{|\+\s*[A-Za-z]|^\s*$') { return }
  $q = $r -replace '[?#].*$', ''
  if (-not $q) { return }
  $dec = try { [Uri]::UnescapeDataString($q) } catch { $q }
  # il nome nel codice dev'essere pulito: niente spazi, %, maiuscole o simboli
  if ($q -ne $dec -or $dec -notmatch '^[A-Za-z0-9_./-]+$' -or $dec -cmatch '[A-Z]') {
    Add-Prob 'NOME-NON-PULITO' $fileRel $r 'spazi, %, maiuscole o simboli nel riferimento'
  }
  $base = if ($dec.StartsWith('/')) { $Root } else { $fileDir }
  $p = if ($dec.StartsWith('/')) { $dec.TrimStart('/') } else { $dec }
  try { $full = [IO.Path]::GetFullPath((Join-Path $base ($p.Replace('/', '\')))) } catch { Add-Prob 'PERCORSO-NON-VALIDO' $fileRel $r; return }
  $st = ResolveExact $full
  if ($st -eq 'manca') {
    # per i js: prova anche relativo alla radice
    if ($kind -eq 'js') {
      $alt = [IO.Path]::GetFullPath((Join-Path $Root ($p.Replace('/', '\'))))
      if ((ResolveExact $alt) -eq 'ok') { return }
    }
    if ($dec -match 'dama24-(presentazione|linee-guida).pdf$') { Add-Prob 'IN-ATTESA-DAL-CLIENTE' $fileRel $r 'PDF non ancora forniti' } else { Add-Prob 'MANCANTE' $fileRel $r }
  }
  elseif ($st -eq 'case') { Add-Prob 'MAIUSCOLE-DIVERSE' $fileRel $r 'esiste ma con maiuscole diverse: su Linux non si trova' }
  elseif ($st -eq 'fuori') { Add-Prob 'FUORI-DALLA-CARTELLA' $fileRel $r }
  else {
    $ext = [IO.Path]::GetExtension($dec).TrimStart('.').ToLower()
    if ($ext -in 'png', 'jpg', 'jpeg', 'gif', 'avif' -and $dec -notmatch 'favicon|apple-touch-icon') {
      Add-Prob 'IMMAGINE-NON-WEBP' $fileRel $r 'dovrebbe essere webp (salvo favicon/icone app)'
    }
  }
}

foreach ($f in $codice) {
  $fileRel = $f.FullName.Substring($Root.Length + 1).Replace('\', '/')
  $dir = $f.DirectoryName
  $txt = [IO.File]::ReadAllText($f.FullName)
  $ext = $f.Extension.ToLower()

  if ($ext -eq '.html') {
    # attributi con percorso
    foreach ($m in [regex]::Matches($txt, '(?is)\b(?:src|href|poster|data-src|data-href|data-poster|data-bg|data-video|action)\s*=\s*"([^"]*)"')) { Check-Ref $fileRel $dir $m.Groups[1].Value 'html' $Root }
    foreach ($m in [regex]::Matches($txt, "(?is)\b(?:src|href|poster|data-src|data-href|data-poster|data-bg|data-video)\s*=\s*'([^']*)'")) { Check-Ref $fileRel $dir $m.Groups[1].Value 'html' $Root }
    foreach ($m in [regex]::Matches($txt, '(?is)\bcontent\s*=\s*"([^"]*\.(?:webp|png|jpe?g|svg|ico|mp4|webm|pdf)(?:\?[^"]*)?)"')) { Check-Ref $fileRel $dir $m.Groups[1].Value 'html' $Root }
    foreach ($m in [regex]::Matches($txt, '(?is)\bsrcset\s*=\s*"([^"]*)"')) { foreach ($part in $m.Groups[1].Value.Split(',')) { $u = ($part.Trim() -split '\s+')[0]; if ($u) { Check-Ref $fileRel $dir $u 'html' $Root } } }
    # url() in <style> e style=""
    foreach ($m in [regex]::Matches($txt, '(?is)url\(\s*([''"]?)(.*?)\1\s*\)')) { Check-Ref $fileRel $dir $m.Groups[2].Value 'css' $Root }
    # stringhe-percorso nei js inline
    foreach ($sm in [regex]::Matches($txt, '(?is)<script\b[^>]*>(.*?)</script>')) {
      foreach ($m in [regex]::Matches($sm.Groups[1].Value, "(['""``])((?:[A-Za-z0-9_./%@&' -]|\.\./)*?\.(?:$extAlt))\1")) { Check-Ref $fileRel $dir $m.Groups[2].Value 'js' $Root }
    }
    # id duplicati e img senza alt (esclude i <template>/<script>)
    $clean = [regex]::Replace($txt, '(?is)<script\b.*?</script>|<style\b.*?</style>|<!--.*?-->', '')
    $ids = @{}
    foreach ($m in [regex]::Matches($clean, '(?is)<[a-z][^>]*?\sid\s*=\s*"([^"]+)"')) { $id = $m.Groups[1].Value; if ($ids.ContainsKey($id)) { $ids[$id]++ } else { $ids[$id] = 1 } }
    foreach ($k in $ids.Keys) { if ($ids[$k] -gt 1) { Add-Prob 'ID-DUPLICATO' $fileRel $k "compare $($ids[$k]) volte" } }
    foreach ($m in [regex]::Matches($clean, '(?is)<img\b[^>]*>')) { if ($m.Value -notmatch '(?i)\balt\s*=') { Add-Prob 'IMG-SENZA-ALT' $fileRel ($m.Value.Substring(0, [Math]::Min(90, $m.Value.Length))) } }
    # ancore interne #id → id esistente nella stessa pagina
    foreach ($m in [regex]::Matches($clean, '(?is)\shref\s*=\s*"#([^"]+)"')) { $t = $m.Groups[1].Value; if ($t -and -not $ids.ContainsKey($t) -and $t -notmatch '^(top)$') { Add-Prob 'ANCORA-SENZA-DESTINAZIONE' $fileRel "#$t" } }
  }
  elseif ($ext -eq '.css') {
    foreach ($m in [regex]::Matches($txt, '(?is)url\(\s*([''"]?)(.*?)\1\s*\)')) { Check-Ref $fileRel $dir $m.Groups[2].Value 'css' $Root }
    foreach ($m in [regex]::Matches($txt, '(?is)@import\s+(?:url\()?\s*[''"]([^''"]+)[''"]')) { Check-Ref $fileRel $dir $m.Groups[1].Value 'css' $Root }
  }
  elseif ($ext -eq '.js') {
    foreach ($m in [regex]::Matches($txt, "(['""``])((?:[A-Za-z0-9_./%@&' -]|\.\./)*?\.(?:$extAlt))\1")) { Check-Ref $fileRel $dir $m.Groups[2].Value 'js' $Root }
  }
}

# pagine: ogni file referenziato da <link>/<script> deve esistere (già coperto da href/src); riepilogo
$out = New-Object System.Collections.Generic.List[string]
$out.Add("# Verifica collegamenti e file")
$out.Add("")
$out.Add("Cartella: ``$Root``  ")
$out.Add("File di codice controllati: $($codice.Count) · riferimenti analizzati: $nRif")
$out.Add("")
if ($problemi.Count -eq 0) { $out.Add("**Nessun problema trovato.**") }
else {
  $out.Add("**Problemi: $($problemi.Count)**")
  $out.Add("")
  foreach ($g in ($problemi | Group-Object tipo | Sort-Object Name)) {
    $out.Add("## $($g.Name) ($($g.Count))")
    foreach ($p in ($g.Group | Sort-Object file, rif | Select-Object -First 60)) { $out.Add("- ``$($p.file)`` → ``$($p.rif)`` $($p.nota)") }
    if ($g.Count -gt 60) { $out.Add("- … altri $($g.Count - 60)") }
    $out.Add("")
  }
}
$out.Add("## Servizi esterni richiamati (dipendenze)")
foreach ($k in ($esterni.Keys | Sort-Object)) { $out.Add("- $k ($($esterni[$k]) riferimenti)") }
$text = $out -join "`n"
if ($Report) { [IO.File]::WriteAllText($Report, $text, (New-Object Text.UTF8Encoding $false)) }
$problemi | Group-Object tipo | Sort-Object Name | ForEach-Object { "{0,-28} {1,5}" -f $_.Name, $_.Count }
"TOTALE problemi: $($problemi.Count) | riferimenti analizzati: $nRif | file di codice: $($codice.Count)"
