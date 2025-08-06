// useGalleryMedia.ts
import { useState, useEffect, useCallback } from 'react'

export type MediaAsset = {
  public_id: string
  resource_type: 'image' | 'video'
  filename: string
  url?: string
  context?: {
    title?: string
    event_type?: string
    date?: string
    year?: string
    atendees?: string
  }
}

export function useGalleryMedia({
  selectedEventType,
  selectedMediaType,
  selectedYear,
  searchQuery,
}: {
  selectedEventType: string | null
  selectedMediaType: string | null
  selectedYear: string | null
  searchQuery: string
}) {
  const [items, setItems] = useState<MediaAsset[]>([])
  const [cursor, setCursor] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  // Debounce search
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchQuery), 500)
    return () => clearTimeout(handler)
  }, [searchQuery])

  // Fetch data when filters/search change
  useEffect(() => {
    let ignore = false
    const fetchData = async () => {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedEventType) params.append('eventType', selectedEventType)
      if (selectedMediaType) params.append('mediaType', selectedMediaType)
      if (selectedYear) params.append('year', selectedYear)
      if (debouncedSearch) params.append('search', debouncedSearch)
      params.append('max', '20')

      const res = await fetch(`/api/cloudinary?${params.toString()}`)
      const data = await res.json()
      if (!ignore) {
        setItems(data.items)
        setCursor(data.nextCursor)
        setHasMore(data.hasMore)
        setLoading(false)
      }
    }

    fetchData()
    return () => {
      ignore = true
    }
  }, [selectedEventType, selectedMediaType, selectedYear, debouncedSearch])

  // Load more function
  const fetchMore = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    const params = new URLSearchParams()
    if (selectedEventType) params.append('eventType', selectedEventType)
    if (selectedMediaType) params.append('mediaType', selectedMediaType)
    if (selectedYear) params.append('year', selectedYear)
    if (debouncedSearch) params.append('search', debouncedSearch)
    if (cursor) params.append('nextCursor', cursor)
    params.append('max', '20')

    const res = await fetch(`/api/cloudinary?${params.toString()}`)
    const data = await res.json()

    setItems((prev) => [...prev, ...data.items])
    setCursor(data.nextCursor)
    setHasMore(data.hasMore)
    setLoading(false)
  }, [
    selectedEventType,
    selectedMediaType,
    selectedYear,
    debouncedSearch,
    cursor,
    hasMore,
    loading,
  ])

  return { items, hasMore, loading, fetchMore }
}
