'use client'

import { Camera, Search } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { GalleryFilters } from '../_components/GalleryFilters'
import { Input } from '../_components/GalleryUI//input'
import GalleryFooter from '../_components/GalleryUI/GalleryFooter'
import { GalleryHeader } from '../_components/GalleryUI/GalleryHeader'
import { MediaItem } from '../_components/MediaItem'
import SpinnerMini from '../_components/SpinnerMini'
import { useGalleryFilters } from './useGalleryFilters'

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
    attendees?: string
  }
}

type Props = {
  stats: {
    totalPhotos: number
    totalVideos: number
    totalEventTypes: number
  }
}

export default function GalleryGrid({ stats }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEventType, setSelectedEventType] = useState<string | null>(
    null
  )
  const [selectedMediaType, setSelectedMediaType] = useState<string | null>(
    null
  )
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [items, setItems] = useState<MediaAsset[]>([])
  const [cursor, setCursor] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const { filteredItems, eventTypes, years } = useGalleryFilters(
    items,
    searchQuery,
    selectedEventType,
    selectedMediaType,
    selectedYear
  )

  const fetchMore = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const res = await fetch(
        `/api/cloudinary?folder=gallery&max=20${
          cursor ? `&nextCursor=${cursor}` : ''
        }`
      )
      const data = await res.json()

      setItems((prev) => [...prev, ...data.items])
      setCursor(data.nextCursor)
      setHasMore(data.hasMore)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
      setHasTriggered(false)
    }
  }, [cursor, hasMore, loading])

  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!observerRef.current || !hasMore || loading || hasTriggered) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setHasTriggered(true)
          fetchMore()
        }
      },
      { rootMargin: '200px' }
    )

    const target = observerRef.current

    if (target) observer.observe(target)

    return () => {
      if (target) observer.unobserve(target)
    }
  }, [loading, hasMore, fetchMore, hasTriggered])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <GalleryHeader
        totalEventTypes={stats.totalEventTypes}
        totalPhotos={stats.totalPhotos}
        totalVideos={stats.totalVideos}
      />

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Search */}
        <div className="relative mb-8 max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search events, photos, videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <GalleryFilters
            selectedEventType={selectedEventType}
            selectedMediaType={selectedMediaType}
            selectedYear={selectedYear}
            onEventTypeChange={setSelectedEventType}
            onMediaTypeChange={setSelectedMediaType}
            onYearChange={setSelectedYear}
            eventTypes={eventTypes || ''}
            years={years || ''}
            totalItems={items.length}
            filteredItems={filteredItems.length}
          />
        </div>

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-1 space-y-1">
            {filteredItems.map((item) => {
              const context = item.context || {}

              return (
                <div key={item.public_id} className="break-inside-avoid">
                  <MediaItem
                    id={item.public_id}
                    type={item.resource_type}
                    src={item.public_id}
                    videoSrc={(item.url || '') as string}
                    title={context.title || item.filename}
                    eventType={context.event_type || ''}
                    date={context.date || ''}
                    attendees={
                      context.attendees
                        ? parseInt(context.attendees)
                        : undefined
                    }
                  />
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg mb-2">No media found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {hasMore && (
          <div
            ref={observerRef}
            className="col-span-full flex justify-center py-8"
          >
            {loading ? <SpinnerMini /> : <span>Scroll to load more</span>}
          </div>
        )}

        {/* Call to Action */}
        <GalleryFooter />
      </div>
    </div>
  )
}
