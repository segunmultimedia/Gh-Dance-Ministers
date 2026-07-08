$port = 8080
$prefix = "http://localhost:$port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()

Write-Host "Listening on $prefix..."

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath
        if ($path -eq "/") {
            $path = "/index.html"
        }
        
        $localPath = Join-Path -Path $PWD -ChildPath $path.Replace('/', '\')
        
        if (Test-Path $localPath -PathType Leaf) {
            $extension = [System.IO.Path]::GetExtension($localPath)
            $contentType = "application/octet-stream"
            
            switch ($extension.ToLower()) {
                ".html" { $contentType = "text/html" }
                ".css"  { $contentType = "text/css" }
                ".js"   { $contentType = "application/javascript" }
                ".jpg"  { $contentType = "image/jpeg" }
                ".png"  { $contentType = "image/png" }
            }
            
            $response.ContentType = $contentType
            $content = [System.IO.File]::ReadAllBytes($localPath)
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
            Write-Host "200 OK - $path"
        } else {
            $response.StatusCode = 404
            Write-Host "404 Not Found - $path"
        }
        
        $response.Close()
    }
}
catch {
    Write-Host "Error: $($_.Exception.Message)"
}
finally {
    $listener.Stop()
}
