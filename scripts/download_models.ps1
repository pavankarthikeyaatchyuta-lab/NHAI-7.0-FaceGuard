param(
  [string]$OutputDir = "models"
)

New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null
Write-Host "Download verified open-source ONNX models into $OutputDir."
Write-Host "Suggested: MobileFaceNet and SCRFD lightweight variants after checking licenses."
Write-Host "This script does not fetch unverified binaries automatically."
