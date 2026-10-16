param([int]$Port = 8765)
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving at http://localhost:$Port/"
$root = Split-Path $MyInvocation.MyCommand.Path -Parent | Split-Path -Parent
$CHUNK = 2MB   # i video si servono a blocchi (Range), così un download interrotto non blocca il server
while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $req = $ctx.Request
    $res = $ctx.Response
    $fs = $null
    try {
        $path = [System.Uri]::UnescapeDataString($req.Url.LocalPath.TrimStart('/'))
        if ($path -eq '') { $path = 'index.html' }
        $file = Join-Path $root $path
        if (Test-Path -LiteralPath $file -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($file).ToLower()
            $mime = switch ($ext) {
                '.html' { 'text/html; charset=utf-8' }
                '.css'  { 'text/css' }
                '.js'   { 'application/javascript' }
                '.json' { 'application/json' }
                '.webp' { 'image/webp' }
                '.png'  { 'image/png' }
                '.jpg'  { 'image/jpeg' }
                '.jpeg' { 'image/jpeg' }
                '.gif'  { 'image/gif' }
                '.svg'  { 'image/svg+xml' }
                '.mp4'  { 'video/mp4' }
                '.webm' { 'video/webm' }
                '.pdf'  { 'application/pdf' }
                '.woff2' { 'font/woff2' }
                default { 'application/octet-stream' }
            }
            $fs = [System.IO.File]::Open($file, 'Open', 'Read', 'ReadWrite')
            $len = $fs.Length
            $start = 0; $end = $len - 1
            $range = $req.Headers['Range']
            $res.ContentType = $mime
            $res.AddHeader('Accept-Ranges', 'bytes')
            if ($range -and $range -match 'bytes=(\d*)-(\d*)') {
                if ($matches[1] -ne '') { $start = [int64]$matches[1] }
                if ($matches[2] -ne '') { $end = [int64]$matches[2] } else { $end = [Math]::Min($len - 1, $start + $CHUNK - 1) }
                if ($end -ge $len) { $end = $len - 1 }
                $res.StatusCode = 206
                $res.AddHeader('Content-Range', "bytes $start-$end/$len")
            }
            $count = $end - $start + 1
            $res.ContentLength64 = $count
            if ($req.HttpMethod -ne 'HEAD') {
                $fs.Seek($start, 'Begin') | Out-Null
                $buf = New-Object byte[] 65536
                $left = $count
                while ($left -gt 0) {
                    $n = $fs.Read($buf, 0, [int][Math]::Min($buf.Length, $left))
                    if ($n -le 0) { break }
                    $res.OutputStream.Write($buf, 0, $n)
                    $left -= $n
                }
            }
        } else {
            $res.StatusCode = 404
        }
    } catch {
        # client che interrompe il download: si passa alla richiesta successiva
    } finally {
        if ($fs) { $fs.Dispose() }
        try { $res.Close() } catch { }
    }
}
