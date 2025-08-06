'use client'

import { ArrowDownCircle, Camera, Search } from 'lucide-react'
import { useState } from 'react'
import Masonry from 'react-masonry-css'
import { GalleryFilters } from '../_components/GalleryFilters'
import { Input } from '../_components/GalleryUI//input'
import GalleryFooter from '../_components/GalleryUI/GalleryFooter'
import { GalleryHeader } from '../_components/GalleryUI/GalleryHeader'
import SpinnerMini from '../_components/SpinnerMini'
import { MediaItem } from './MediaItem'
import { useGalleryMedia } from './useGalleryMedia'

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

type Props = {
  stats: {
    totalPhotos: number
    totalVideos: number
    totalEventTypes: number
    eventTypes: string[]
    years: string[]
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

  const { items, hasMore, loading, fetchMore } = useGalleryMedia({
    selectedEventType,
    selectedMediaType,
    selectedYear,
    searchQuery,
  })
  const totalItems = stats.totalPhotos + stats.totalVideos

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
            eventTypes={stats.eventTypes || ''}
            years={stats.years || ''}
            totalItems={totalItems}
            filteredItems={items.length}
          />
        </div>

        {/* Gallery Grid */}
        {items.length > 0 ? (
          <Masonry
            breakpointCols={{ default: 4, 1200: 3, 800: 2, 500: 1 }}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {items.map((item) => {
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
                      context.atendees ? parseInt(context.atendees) : undefined
                    }
                  />
                </div>
              )
            })}
          </Masonry>
        ) : (
          !loading && (
            <div className="text-center py-12">
              <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg mb-2">No media found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )
        )}

        {hasMore && items.length > 0 && (
          <div
            className={`col-span-full flex justify-center py-8 ${
              !loading
                ? 'bg-gradient-to-b from-transparent via-white to-white mt-[-200] relative h-100 w-full'
                : ''
            }`}
          >
            {loading ? (
              <SpinnerMini />
            ) : (
              <button
                onClick={fetchMore}
                className="px-4 py-2 text-primary hover:text-primary/30 transition cursor-pointer flex flex-col justify-center items-center "
              >
                <span>Load More</span> <ArrowDownCircle />
              </button>
            )}
          </div>
        )}

        {/* Call to Action */}
        <GalleryFooter />
      </div>
    </div>
  )
}
