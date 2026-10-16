<#
  ESTRO · costruzione della cartella di sviluppo
  Genera  <Dest>\sito  (il sito pronto da pubblicare) a partire dal progetto di lavoro:
    · copia solo i file davvero usati da html/css/js
    · immagini raster (png/jpg) convertite in webp; svg, favicon, video, font e pdf restano come sono
    · nomi puliti: minuscolo, solo a-z 0-9 e trattino, nessuno spazio o simbolo
    · nomi unici in tutto il sito (prefisso di categoria) e file identici unificati
    · tutti i riferimenti in html/css/js aggiornati ai nuovi nomi e percorsi
  Il progetto di lavoro NON viene modificato. Si può rilanciare quando si vuole.

  Uso:
    powershell -File strumenti\costruisci-sviluppo.ps1 -Mappa        (solo la mappa dei nuovi nomi, senza scrivere)
    powershell -File strumenti\costruisci-sviluppo.ps1 -Costruisci   (genera la cartella; con -Pulisci rifà da zero sito\)
#>
param(
  [string]$Root = (Get-Location).Path,
  [string]$Dest = 'sviluppo',
  [switch]$Mappa,
  [switch]$Costruisci,
  [switch]$Pulisci,
  [string]$CsvMappa = ''
)
$ErrorActionPreference = 'Stop'
$Root = (Resolve-Path $Root).Path.TrimEnd('\')
$DestAbs = if ([IO.Path]::IsPathRooted($Dest)) { $Dest } else { Join-Path $Root $Dest }
$excl = '\\(\.git|\.claude|sviluppo|node_modules|strumenti)(\\|$)'
$rasterConv = 'png', 'jpg', 'jpeg'
$assetExt = '.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.avif', '.mp4', '.webm', '.otf', '.ttf', '.woff', '.woff2', '.pdf'
$textExt = '.html', '.css', '.js'

function Rel([string]$p) { $p.Substring($Root.Length + 1).Replace('\', '/') }
function Slug([string]$s) {
  $n = $s.Normalize([Text.NormalizationForm]::FormD)
  $sb = New-Object Text.StringBuilder
  foreach ($c in $n.ToCharArray()) { if ([Globalization.CharUnicodeInfo]::GetUnicodeCategory($c) -ne 'NonSpacingMark') { [void]$sb.Append($c) } }
  $t = $sb.ToString().ToLowerInvariant()
  $t = $t.Replace('&', ' e ').Replace("'", '').Replace([string][char]0x2019, '').Replace('`', '')
  $t = [regex]::Replace($t, '[^a-z0-9]+', '-')
  return $t.Trim('-')
}

# ───────────────────────── 1. file e riferimenti ─────────────────────────
$files = Get-ChildItem -Path $Root -Recurse -File | Where-Object { $_.FullName -notmatch $excl -and $_.Name -ne '_audit.js' }
$assets = $files | Where-Object { $assetExt -contains $_.Extension.ToLower() }
$texts = $files | Where-Object { ($textExt -contains $_.Extension.ToLower()) -and ((Rel $_.FullName) -notmatch '^css/ghl-form') }
$T = @{}
foreach ($f in $texts) { $T[(Rel $f.FullName)] = [IO.File]::ReadAllText($f.FullName) }

function Variants([string]$relFromDir) {
  $segs = $relFromDir.Split('/')
  $sp = $relFromDir.Replace(' ', '%20')
  $enc = ($segs | ForEach-Object { if ($_ -in '..', '.') { $_ } else { [Uri]::EscapeDataString($_) } }) -join '/'
  $set = New-Object 'System.Collections.Generic.HashSet[string]'
  foreach ($v in @($relFromDir, $sp, $enc)) { [void]$set.Add($v); [void]$set.Add($v.Replace('&', '&amp;')) }
  return , @($set)
}
function RelPath([string]$fromDir, [string]$to) {
  $a = @(if ($fromDir) { $fromDir.Split('/') })
  $b = $to.Split('/')
  $i = 0
  while ($i -lt $a.Count -and $i -lt ($b.Count - 1) -and $a[$i] -ieq $b[$i]) { $i++ }
  $up = @(); for ($k = $i; $k -lt $a.Count; $k++) { $up += '..' }
  return (($up + $b[$i..($b.Count - 1)]) -join '/')
}
function DirOf([string]$p) { if ($p.Contains('/')) { $p.Substring(0, $p.LastIndexOf('/')) } else { '' } }
function Cands([string]$dir, [string]$rp) { $c = @(RelPath $dir $rp); if ($dir) { $c += (((@($dir.Split("/")) | ForEach-Object { ".." }) -join "/") + "/" + $rp) }; return $c }

# quali asset sono richiamati, e da quali file
$usedBy = @{}
foreach ($a in $assets) {
  $rp = Rel $a.FullName
  $baseVars = Variants $a.Name
  $list = New-Object System.Collections.Generic.List[string]
  foreach ($tp in $T.Keys) {
    $txt = $T[$tp]
    $hit = $false
    foreach ($bv in $baseVars) { if ($txt.IndexOf($bv, [StringComparison]::OrdinalIgnoreCase) -ge 0) { $hit = $true; break } }
    if (-not $hit) { continue }
    foreach ($rel in (Cands (DirOf $tp) $rp)) {
    foreach ($v in (Variants $rel)) {
      $re = '(?<![A-Za-z0-9_./%\-])' + [regex]::Escape($v) + '(?![A-Za-z0-9_\-])'
      if ([regex]::IsMatch($txt, $re, 'IgnoreCase')) { $list.Add($tp); break }
    }
    }
  }
  $usedBy[$rp] = $list
}
$usedList = @($assets | Where-Object { $usedBy[(Rel $_.FullName)].Count -gt 0 })

# ───────────────────────── 2. nuovi nomi ─────────────────────────
# (regex sul percorso vecchio, cartella nuova, prefisso)
$regole = @(
  @('^Logoestrofooter\.', 'assets/img/brand', 'logo-estro-'),
  @('^gattoabout\.webm$', 'assets/video', 'gatto-'),
  @('^gattoabout\.', 'assets/img/home', 'gatto-'),
  @('^favicon\.ico$', '', ''),
  @('^assets/favicon/', 'assets/favicon', ''),
  @('^assets/reel/', 'assets/img/reel', ''),
  @('^assets/team/', 'assets/img/team', ''),
  @('^assets/ai/', 'assets/img/ai', 'ai-'),
  @('^assets/[^/]+\.webp$', 'assets/img/home-case-studies', ''),
  @('^case-studies/home/', 'assets/img/home-case-studies', ''),
  @('^case-studies/loghicasestudy/', 'assets/img/case-studies-logos', 'cslogo-'),
  @('^foto case study/', 'assets/img/case-studies-logos', 'cslogo-'),
  @('^case-studies/[^/]+\.mp4$', 'assets/video', ''),
  @('^case-studies/[^/]+\.(png|jpe?g|webp)$', 'assets/img/case-studies', 'cs-'),
  @('^Loghibrand/', 'assets/img/loghi-brand', 'brand-'),
  @('^Loghi partner/', 'assets/img/loghi-partner', 'partner-'),
  @('^Loghi tools/', 'assets/img/loghi-tools', 'tool-'),
  @('^Partnerlogos/', 'assets/img/partner-media', 'media-'),
  @('^SMM/', 'assets/img/smm', 'smm-'),
  @('^Social ads/', 'assets/img/social-ads', ''),
  @('^Foto influencer marketing/', 'assets/img/influencer-marketing', 'influencer-'),
  @('^Foto tips and tricks/', 'assets/img/tips', 'tips-'),
  @('^Joinus/', 'assets/img/joinus', 'joinus-'),
  @('^Dama/', 'assets/img/dama', 'dama-'),
  @('^foto home/.+\.(mp4|webm)$', 'assets/video', 'home-'),
  @('^foto home/', 'assets/img/home', 'home-'),
  @('^video/', 'assets/video', ''),
  @('^css/Vanguard/', 'assets/fonts/vanguard', ''),
  @('\.pdf$', 'assets/docs', '')
)
# nomi brutti → nome scelto a mano (stem, senza estensione)
$override = @{
  'assets/aristonfogliacase_3_11zon.webp' = 'ariston-case'
  'assets/biopaircase.webp'               = 'biorepair-case'
  'assets/bravocase.webp'                 = 'bravo-case'
  'assets/fanuccase.webp'                 = 'fanuc-case'
  'foto home/coda-gatto-oshxjrx6o18ghy7peuh9v296dlx7kj6p8c1c09eiv4-1.webp' = 'home-coda-gatto'
  'foto case study/logo-come-in-una-favola-v5-1.webp' = 'cslogo-come-in-una-favola'
  'Estro-offical-brochure-2023.pdf'       = 'estro-brochure-2023'
  'Logoestrofooter.webp'                  = 'logo-estro'
  'Foto tips and tricks/cover-tips-–-interactive-reels.webp' = 'tips-cover-interactive-reels'
  'Loghi tools/asdasdasd-150x150.png'     = 'tool-google-ads-150x150'
}
function NewPath([string]$old) {
  $ext = [IO.Path]::GetExtension($old).ToLower()
  $stem = [IO.Path]::GetFileNameWithoutExtension($old)
  $dir = $null; $prefix = ''
  foreach ($r in $regole) { if ($old -match ('(?i)' + $r[0])) { $dir = $r[1]; $prefix = $r[2]; break } }
  if ($null -eq $dir) { return $null }
  if ($override.ContainsKey($old)) { $s = $override[$old] }
  else {
    $s = Slug $stem
    if ($old -match '^Foto tips and tricks/' -and $s -match '^tt-(\d+)$') { $s = 'tips-' + $Matches[1] }
    if ($prefix -and -not $s.StartsWith($prefix.TrimEnd('-'))) { $s = $prefix + $s }
  }
  if ($ext -in '.png', '.jpg', '.jpeg' -and $old -notmatch '^assets/favicon/') { $ext = '.webp' }
  $name = $s + $ext
  if ($old -match '^css/Vanguard/') { $name = (Slug $stem) + $ext }
  if ($dir) { return "$dir/$name" } else { return $name }
}

# hash dei contenuti per unificare i file identici
$hash = @{}
foreach ($a in $usedList) { $hash[(Rel $a.FullName)] = (Get-FileHash -Algorithm SHA256 -Path $a.FullName).Hash }
$catPrio = @('assets/img/loghi-brand', 'assets/img/tips', 'assets/img/case-studies')   # in caso di doppioni vince la cartella più in alto
$map = New-Object System.Collections.Generic.List[object]
foreach ($a in ($usedList | Sort-Object { Rel $_.FullName })) {
  $o = Rel $a.FullName
  $n = NewPath $o
  if ($null -eq $n) { throw "nessuna regola per: $o" }
  $map.Add([pscustomobject]@{ vecchio = $o; nuovo = $n; hash = $hash[$o]; kbPrima = [math]::Round($a.Length / 1KB); tipo = $a.Extension.ToLower().TrimStart('.') })
}
# unificazione dei doppioni (stesso contenuto): tutti puntano al primo nome in ordine di priorità
$canon = @{}
foreach ($g in ($map | Group-Object hash)) {
  if ($g.Count -lt 2) { continue }
  $sorted = $g.Group | Sort-Object { $p = $_.nuovo; $i = 0; foreach ($c in $catPrio) { if ($p.StartsWith($c)) { break }; $i++ }; $i }, nuovo
  $keep = $sorted[0].nuovo
  foreach ($x in $g.Group) { if ($x.nuovo -ne $keep) { $canon[$x.vecchio] = $keep } }
}
foreach ($m in $map) { $m | Add-Member -NotePropertyName unificatoCon -NotePropertyValue $(if ($canon.ContainsKey($m.vecchio)) { $canon[$m.vecchio] } else { '' }) }
$final = @{}   # vecchio → nuovo definitivo
foreach ($m in $map) { $final[$m.vecchio] = $(if ($m.unificatoCon) { $m.unificatoCon } else { $m.nuovo }) }

# controlli sui nomi
$err = New-Object System.Collections.Generic.List[string]
$byNew = @{}
foreach ($m in $map) { if (-not $m.unificatoCon) { if (-not $byNew.ContainsKey($m.nuovo)) { $byNew[$m.nuovo] = @() }; $byNew[$m.nuovo] += $m.vecchio } }
foreach ($k in $byNew.Keys) { if ($byNew[$k].Count -gt 1) { $err.Add("COLLISIONE su $k : " + ($byNew[$k] -join ' | ')) } }
$baseCount = @{}
foreach ($k in $byNew.Keys) { $b = ($k.Split('/')[-1]).ToLower(); if (-not $baseCount.ContainsKey($b)) { $baseCount[$b] = @() }; $baseCount[$b] += $k }
foreach ($b in $baseCount.Keys) { if ($baseCount[$b].Count -gt 1) { $err.Add("NOME DOPPIO in cartelle diverse: $b → " + ($baseCount[$b] -join ' | ')) } }
foreach ($k in $byNew.Keys) { if ($k -cnotmatch '^[a-z0-9][a-z0-9/.-]*$' -or $k -match '--') { $err.Add("NOME NON PULITO: $k") } }

if ($CsvMappa) { $map | Select-Object vecchio, nuovo, unificatoCon, tipo, kbPrima | Export-Csv -Path $CsvMappa -NoTypeInformation -Encoding UTF8 -Delimiter ';' }
if ($Mappa -or -not $Costruisci) {
  "asset usati: $($usedList.Count) · nomi unici dopo l'unificazione: $($byNew.Count) · doppioni unificati: $($canon.Count)"
  if ($err.Count) { "PROBLEMI:"; $err } else { "nessuna collisione, nessun nome non pulito" }
  return
}
if ($err.Count) { $err; throw 'Ci sono collisioni o nomi non puliti: correggi le regole e rilancia.' }

# ───────────────────────── 3. costruzione ─────────────────────────
$Site = Join-Path $DestAbs 'sito'
if (Test-Path $Site) {
  if ($Pulisci) { Remove-Item -Recurse -Force $Site } else { throw "$Site esiste già: usa -Pulisci per rifarla da zero" }
}
New-Item -ItemType Directory -Force $Site | Out-Null
$utf8 = New-Object Text.UTF8Encoding $false
$tmp = Join-Path $env:TEMP 'estro-conv'; New-Item -ItemType Directory -Force $tmp | Out-Null

# 3a. asset
$done = @{}; $conv = 0; $copy = 0; $kbTot = 0
foreach ($m in $map) {
  $dst = Join-Path $Site ($final[$m.vecchio].Replace('/', '\'))
  if ($done.ContainsKey($dst)) { continue }
  $done[$dst] = $true
  New-Item -ItemType Directory -Force (Split-Path $dst -Parent) | Out-Null
  $src = Join-Path $Root ($m.vecchio.Replace('/', '\'))
  if ($m.tipo -in $rasterConv -and $m.vecchio -notmatch '^assets/favicon/') {
    $lossless = ($m.tipo -eq 'png' -and $m.kbPrima -le 100)
    $args = @('-y', '-loglevel', 'error', '-i', $src, '-c:v', 'libwebp', '-compression_level', '6')
    if ($lossless) { $args += @('-lossless', '1') } else { $args += @('-quality', '86') }
    $args += $dst
    & ffmpeg @args
    if ($LASTEXITCODE -ne 0 -or -not (Test-Path $dst)) { throw "conversione fallita: $($m.vecchio)" }
    $conv++
  }
  else { Copy-Item -LiteralPath $src -Destination $dst -Force; $copy++ }
  $kbTot += [math]::Round((Get-Item $dst).Length / 1KB)
}
foreach ($m in $map) { $m | Add-Member -NotePropertyName kbDopo -NotePropertyValue ([math]::Round((Get-Item (Join-Path $Site ($final[$m.vecchio].Replace('/', '\')))).Length / 1KB)) -Force }

# 3b. codice (html/css/js) con i riferimenti aggiornati
function Rewrite([string]$txt, [string]$fileRel) {
  $dir = DirOf $fileRel
  foreach ($m in $map) {
    $rp = $m.vecchio
    $bn = $rp.Split('/')[-1]
    $hit = $false
    foreach ($bv in (Variants $bn)) { if ($txt.IndexOf($bv, [StringComparison]::OrdinalIgnoreCase) -ge 0) { $hit = $true; break } }
    if (-not $hit) { continue }
    $new = RelPath $dir $final[$rp]
    foreach ($cand in (Cands $dir $rp)) { foreach ($v in (Variants $cand)) {
      $re = '(?<![A-Za-z0-9_./%\-])' + [regex]::Escape($v) + '(?![A-Za-z0-9_\-])'
      $txt = [regex]::Replace($txt, $re, [Text.RegularExpressions.MatchEvaluator]{ param($x) $new }, 'IgnoreCase')
    } }
  }
  return $txt
}
$nCode = 0
foreach ($tp in ($T.Keys | Sort-Object)) {
  $out = Rewrite $T[$tp] $tp
  # allegati attesi (PDF non ancora forniti)
  $out = [regex]::Replace($out, '(\.\./)?allegati/([a-z0-9-]+\.pdf)', { param($x) $x.Groups[1].Value + 'assets/docs/' + $x.Groups[2].Value })
  $dst = Join-Path $Site ($tp.Replace('/', '\'))
  New-Item -ItemType Directory -Force (Split-Path $dst -Parent) | Out-Null
  [IO.File]::WriteAllText($dst, $out, $utf8)
  $nCode++
}
"costruzione: asset $($done.Count) (convertiti in webp: $conv, copiati: $copy) · file di codice: $nCode · peso asset: $kbTot KB"
$map | Export-Csv -Path (Join-Path $DestAbs 'mappa-completa.csv') -NoTypeInformation -Encoding UTF8 -Delimiter ';'
