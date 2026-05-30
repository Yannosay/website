param(
  [string]$file,
  [string]$delete
)

function Get-ListFromKV {
  $raw = npx wrangler kv key get --binding=NEWS_KV "news:list" --remote --preview false
  $raw = $raw.Trim()
  if (-not $raw -or $raw -eq 'null' -or $raw -eq '{}' -or $raw -eq '[]') {
    return @()
  }
  try {
    $parsed = $raw | ConvertFrom-Json
    if ($parsed -is [array]) { return $parsed }
    return @($parsed)
  } catch {
    return @()
  }
}

function Build-ListJson($items) {
  if ($items.Count -eq 0) { return '[]' }
  $parts = $items | ForEach-Object {
    $slug = $_.slug
    $title = $_.title
    $date = $_.date
    $excerpt = $_.excerpt -replace '\\', '\\\\' -replace '"', '\"' -replace '&', '&amp;' -replace '<', '\u003c' -replace '>', '\u003e'
    "{`"slug`":`"$slug`",`"title`":`"$title`",`"date`":`"$date`",`"excerpt`":`"$excerpt`"}"
  }
  return '[' + ($parts -join ',') + ']'
}

if ($delete) {
  npx wrangler kv key delete --binding=NEWS_KV "news:article:$delete" --remote --preview false

  $list = Get-ListFromKV
  $list = @($list | Where-Object { $_.slug -ne $delete })
  $listJson = Build-ListJson $list
  Set-Content -Path list.json -Value $listJson
  npx wrangler kv key put --binding=NEWS_KV "news:list" --path list.json --remote --preview false
  Remove-Item list.json -ErrorAction SilentlyContinue
  Write-Host "Article '$delete' deleted."
  exit
}

if (-not $file) {
  Write-Host "Usage:"
  Write-Host "  Add:    .\add-news.ps1 -file article.md"
  Write-Host "  Delete: .\add-news.ps1 -delete slug-name"
  exit
}

$contentString = "$(Get-Content $file -Raw)"
$bodyOnly = $contentString -replace '^#\s+.+\r?\n\r?\n', ''

$titleMatch = [regex]::Match($contentString, '^#\s+(.+)$', [System.Text.RegularExpressions.RegexOptions]::Multiline)
if ($titleMatch.Success) {
  $title = $titleMatch.Groups[1].Value.Trim()
  $slug = $title.ToLower() -replace '[^a-z0-9\s]', '' -replace '\s+', '-' -replace '^-|-$', ''
} else {
  $title = $file -replace '\.md$', ''
  $slug = $title.ToLower() -replace '[^a-z0-9\s]', '' -replace '\s+', '-' -replace '^-|-$', ''
}

$paragraphs = $bodyOnly -split '\r?\n\r?\n'
$excerpt = ''
if ($paragraphs.Length -gt 0) {
  $firstPara = $paragraphs[0] -replace '\r?\n', ' '
  $firstPara = $firstPara -replace '<[^>]+>', ''
  if ($firstPara.Length -gt 60) {
    $excerpt = $firstPara.Substring(0, 60) + '...'
  } else {
    $excerpt = $firstPara
  }
}

$article = [ordered]@{
  slug = $slug
  title = $title
  excerpt = $excerpt
  content = $bodyOnly
} | ConvertTo-Json -Compress

Set-Content -Path article.json -Value $article
npx wrangler kv key put --binding=NEWS_KV "news:article:$slug" --path article.json --remote --preview false

$list = Get-ListFromKV
$existingEntry = $list | Where-Object { $_.slug -eq $slug }
$date = if ($existingEntry) { $existingEntry.date } else { Get-Date -Format "yyyy-MM-dd" }
$newEntry = [PSCustomObject]@{slug=$slug; title=$title; date=$date; excerpt=$excerpt}
$list = @($newEntry) + ($list | Where-Object { $_.slug -ne $slug })
$listJson = Build-ListJson $list
Set-Content -Path list.json -Value $listJson
npx wrangler kv key put --binding=NEWS_KV "news:list" --path list.json --remote --preview false

Remove-Item article.json, list.json -ErrorAction SilentlyContinue
Write-Host "Article '$title' published as /news/$slug"