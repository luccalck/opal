param([string]$Destination)
$ErrorActionPreference = 'Stop'
$taskRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
if (-not $Destination) { $Destination = Join-Path (Split-Path $taskRoot -Parent) 'ENTREGAVEIS\DevOps_Aula07_Opal_Lucca_Castilho_Costa_PREPARACAO.zip' }
$taskStage = Join-Path ([IO.Path]::GetTempPath()) ('carparts-package-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $taskStage | Out-Null
try {
    foreach ($taskDirectory in @('src','scripts','tests','eval','prompts','docs','.github')) {
        $taskOrigin = Join-Path $taskRoot $taskDirectory
        if (Test-Path -LiteralPath $taskOrigin) { Copy-Item -LiteralPath $taskOrigin -Destination $taskStage -Recurse }
    }
    foreach ($taskName in @('package.json','package-lock.json','eslint.config.mjs','.gitignore')) {
        Copy-Item -LiteralPath (Join-Path $taskRoot $taskName) -Destination $taskStage
    }
    $taskUnsafe = Get-ChildItem -LiteralPath $taskStage -Recurse -Force | Where-Object { $_.Name -match '^\.env($|\.)|\.(pem|key)$|^(node_modules|\.git|coverage)$' }
    if ($taskUnsafe) { throw 'Conteúdo proibido no pacote. Revise antes de compactar.' }
    # ZipFile inclui .github e .gitignore também em Linux/macOS, ao contrário de alguns compactadores.
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    if (Test-Path -LiteralPath $Destination) { throw 'Destino já existe. Use um nome novo para preservar o pacote anterior.' }
    [IO.Compression.ZipFile]::CreateFromDirectory($taskStage, [IO.Path]::GetFullPath($Destination))
    Write-Output "Pacote criado: $Destination"
    Write-Output 'Não inclui node_modules, .git ou outputs. Confira as evidências e o scan antes de enviar.'
} finally {
    $taskChecked = (Resolve-Path -LiteralPath $taskStage).Path
    if ($taskChecked -eq $taskStage -and $taskChecked.StartsWith([IO.Path]::GetTempPath(), [StringComparison]::OrdinalIgnoreCase)) {
        Remove-Item -LiteralPath $taskChecked -Recurse -Force
    }
}
