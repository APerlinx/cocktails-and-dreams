export function cldWith(url: string, transform: string) {
  return url.replace('/upload/', `/upload/${transform}/`)
}
