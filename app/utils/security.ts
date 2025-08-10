export const MEDIA_TYPES = new Set(['image', 'video'] as const)
export type MediaType = 'image' | 'video'

export function normalizeAndTrim(input: string) {
  return input.normalize('NFKC').trim()
}

// Remove bidi/zero-width + escape Cloudinary operators
export function escapeForCloudinary(input: string) {
  const noBidi = normalizeAndTrim(input).replace(
    /[\u200B-\u200F\u202A-\u202E\u2066-\u2069]/g,
    ''
  )
  return noBidi.replace(/([!(){}\[\]^~?:\\=&><*"'])/g, '\\$1')
}

export function isSingleToken(str: string) {
  return !/\s/.test(str)
}

// Basic length clamps
export function clampString(input: string, max = 64) {
  return input.length > max ? input.slice(0, max) : input
}
