'use client'

import { useState, useMemo } from 'react'
import { MediaItem } from '../_components/MediaItem'
import { GalleryFilters } from '../_components/GalleryFilters'
import { Card, CardContent } from '../_components/GalleryUI//card'
import { Badge } from '../_components/GalleryUI//badge'
import { Input } from '../_components/GalleryUI//input'
import { Search, Camera, Video, Calendar, Users, Zap } from 'lucide-react'

type MediaAsset = {
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

type GalleryGridProps = {
  media: MediaAsset[]
}

export default function GalleryGrid({ media }: GalleryGridProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEventType, setSelectedEventType] = useState<string | null>(
    null
  )
  const [selectedMediaType, setSelectedMediaType] = useState<string | null>(
    null
  )
  const [selectedYear, setSelectedYear] = useState<string | null>(null)

  const eventTypes = useMemo(() => {
    return [
      ...new Set(
        media
          .map((item) => item.context?.event_type)
          .filter((eventType): eventType is string => Boolean(eventType))
      ),
    ].sort()
  }, [media])

  const years = useMemo(() => {
    return [
      ...new Set(
        media
          .map((item) => item.context?.year)
          .filter((year): year is string => Boolean(year))
      ),
    ]
      .sort()
      .reverse()
  }, [media])

  const filteredItems = useMemo(() => {
    return media.filter((item) => {
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
  }, [searchQuery, selectedEventType, selectedMediaType, selectedYear, media])

  const stats = {
    totalEvents: eventTypes.length,
    totalPhotos: media.filter((item) => item.resource_type === 'image').length,
    totalVideos: media.filter((item) => item.resource_type === 'video').length,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/10">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Camera className="h-8 w-8 text-primary" />
              <h1 className="text-5xl">Event Gallery</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Relive the best moments from our events. From electrifying
              festivals to intimate cocktail tastings, explore the energy and
              excitement that makes Cocktails&Dreams unforgettable.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center bg-card-1">
              <CardContent className="pt-4">
                <Zap className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-2xl">{stats.totalEvents}</div>
                <p className="text-sm text-muted-foreground">Event Types</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-card-2">
              <CardContent className="pt-4">
                <Camera className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-2xl">{stats.totalPhotos}</div>
                <p className="text-sm text-muted-foreground">Photos</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-card-3 ">
              <CardContent className="pt-4">
                <Video className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-2xl">{stats.totalVideos}</div>
                <p className="text-sm text-muted-foreground">Videos</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-card-4">
              <CardContent className="pt-4">
                <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-2xl">13,602</div>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

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
            totalItems={media.length}
            filteredItems={filteredItems.length}
          />
        </div>

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
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

        {/* Call to Action */}
        <Card className="mt-16 bg-gradient-to-r from-primary/5 to-secondary/10">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl mb-4">Want to be Featured?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Tag us in your photos and videos from your night at Pulse Bar! The
              best content gets featured in our gallery and social media.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge variant="outline" className="text-sm px-4 py-2">
                #Cocktails&Dreams
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-2">
                @cocktail.dreams_
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-2">
                #Cocktails&Dreams
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
