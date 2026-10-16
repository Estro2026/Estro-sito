<#
  ESTRO · inventario degli asset
  Elenca tutti i file del sito (immagini, video, font, pdf), dice quali sono usati da html/css/js
  e quali no, e segnala i nomi fuori norma (spazi, maiuscole, simboli) e i nomi doppi.
  Non modifica nulla. Uso:  powershell -File strumenti\inventario.ps1 -Root <cartella progetto> -Csv <file.csv>
#>
param(
  [string]$Root = (Get-Location).Path,
  [string]$Csv = ''
)
$ErrorActionPreference = 'Stop'
$Root = (Resolve-Path $Root).Path.TrimEnd('\')
$excl = '\\(\.git|\.claude|sviluppo|node_modules|strumenti)(\\|$)'
$assetExt = '.webp','.png','.jpg','.jpeg','.gif','.svg','.ico','.avif','.mp4','.webm','.otf','.ttf','.woff','.woff2','.pdf'
$textExt  = '.html','.css','.js'

function Rel([string]$p) { $p.Substring($Root.Length + 1).Replace('\', '/') }

$files = Get-ChildItem -Path $Root -Recurse -File | Where-Object { $_.FullName -notmatch $excl }
$assets = $files | Where-Object { $assetExt -contains $_.Extension.ToLower() }
$texts  = $files | Where-Object { ($textExt -contains $_.Extension.ToLower()) -and $_.Name -notin '_audit.js' }

# testo di ogni file di codice (una volta sola)
$T = @{}
foreach ($f in $texts) { $T[(Rel $f.FullName)] = [IO.File]::ReadAllText($f.FullName) }

function Variants([string]$relFromDir) {
  # forme in cui un percorso può comparire nel codice
  $segs = $relFromDir.Split('/')
  $raw = $relFromDir
  $sp  = $relFromDir.Replace(' ', '%20')
  $enc = ($segs | ForEach-Object { if ($_ -in '..', '.') { $_ } else { [Uri]::EscapeDataString($_) } }) -join '/'
  $set = New-Object 'System.Collections.Generic.HashSet[string]'
  foreach ($v in @($raw, $sp, $enc)) { [void]$set.Add($v); [void]$set.Add($v.Replace('&', '&amp;')) }
  return $set
}
function RelPath([string]$fromDir, [string]$to) {
  # percorso relativo (con /) da una cartella a un file, entrambi relativi alla radice
  $a = @(if ($fromDir) { $fromDir.Split('/') })
  $b = $to.Split('/')
  $i = 0
  while ($i -lt $a.Count -and $i -lt ($b.Count - 1) -and $a[$i] -ieq $b[$i]) { $i++ }
  $up = @(); for ($k = $i; $k -lt $a.Count; $k++) { $up += '..' }
  return (($up + $b[$i..($b.Count - 1)]) -join '/')
}

$rows = New-Object System.Collections.Generic.List[object]
foreach ($a in $assets) {
  $rp = Rel $a.FullName
  $base = $a.Name
  $baseVars = Variants $base
  $usedBy = New-Object System.Collections.Generic.List[string]
  foreach ($tp in $T.Keys) {
    $txt = $T[$tp]
    $hit = $false
    foreach ($bv in $baseVars) { if ($txt.IndexOf($bv, [StringComparison]::Ordinal) -ge 0) { $hit = $true; break } }
    if (-not $hit) { continue }
    $dir = if ($tp.Contains('/')) { $tp.Substring(0, $tp.LastIndexOf('/')) } else { '' }
    $rel = RelPath $dir $rp
    foreach ($v in (Variants $rel)) {
      $re = '(?<![A-Za-z0-9_./%\-])' + [regex]::Escape($v) + '(?![A-Za-z0-9_\-])'
      if ([regex]::IsMatch($txt, $re)) { $usedBy.Add($tp); break }
    }
    # radice assoluta: /percorso
    if (-not $usedBy.Contains($tp)) {
      foreach ($v in (Variants $rp)) { if ($txt.Contains('/' + $v)) { $usedBy.Add($tp); break } }
    }
  }
  $rows.Add([pscustomobject]@{
    percorso = $rp
    kb       = [math]::Round($a.Length / 1KB)
    ext      = $a.Extension.ToLower().TrimStart('.')
    usato    = [int]($usedBy.Count -gt 0)
    pagine   = ($usedBy -join ' ')
    nomeok   = [int]($rp -cmatch '^[a-z0-9][a-z0-9/._-]*$')
  })
}
if ($Csv) { $rows | Export-Csv -Path $Csv -NoTypeInformation -Encoding UTF8 -Delimiter ';' }
$rows
