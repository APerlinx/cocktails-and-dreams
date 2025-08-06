import { useMemo } from 'react'
import type { MediaAsset } from './GalleryGrid'

export function useGalleryFilters(
  items: MediaAsset[],
  searchQuery: string,
  selectedEventType: string | null,
  selectedMediaType: string | null,
  selectedYear: string | null
) {
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const context = item.context || {}

      const title = context.title?.toLowerCase() || ''
      const eventType = context.event_type?.toLowerCase() || ''
      const year = context.year || ''

      const matchesSearch =
        searchQuery === '' ||
        title.includes(searchQuery.toLowerCase()) ||
        eventType.includes(searchQuery.toLowerCase())

      const matchesEventType =
        selectedEventType === null || context.event_type === selectedEventType

      const matchesMediaType =
        selectedMediaType === null || item.resource_type === selectedMediaType

      const matchesYear = selectedYear === null || context.year === selectedYear

      return (
        matchesSearch && matchesEventType && matchesMediaType && matchesYear
      )
    })
  }, [items, searchQuery, selectedEventType, selectedMediaType, selectedYear])

  return { filteredItems }
}
