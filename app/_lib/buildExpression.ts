import {
  escapeForCloudinary,
  isSingleToken,
  clampString,
} from '../utils/security'

type BuildArgs = {
  folderName: string
  eventType?: string
  mediaType?: 'image' | 'video'
  year?: string
  search?: string
}

export function buildExpression({
  folderName,
  eventType,
  mediaType,
  year,
  search,
}: BuildArgs) {
  let clauses: string[] = [`folder="${folderName}"`]

  if (mediaType) clauses.unshift(`resource_type:${mediaType}`) // put first

  if (eventType) {
    const safe = clampString(escapeForCloudinary(eventType), 48)
    clauses.push(
      isSingleToken(safe)
        ? `context.event_type:${safe}*`
        : `context.event_type="${safe}"`
    )
  }

  if (year) {
    const safe = clampString(escapeForCloudinary(year), 8)
    clauses.push(`context.year="${safe}"`)
  }

  if (search) {
    const safe = clampString(escapeForCloudinary(search))
    clauses.push(
      isSingleToken(safe)
        ? `(context.title:${safe}* OR filename:${safe}*)`
        : `(context.title="${safe}" OR filename="${safe}")`
    )
  }

  return clauses.join(' AND ')
}
