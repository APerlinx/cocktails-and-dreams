'use client'

import { Camera, Zap, Video, Users } from 'lucide-react'
import { Card, CardContent } from './card'

interface GalleryHeaderProps {
  totalEventTypes: number
  totalPhotos: number
  totalVideos: number
}

export function GalleryHeader({
  totalEventTypes,
  totalPhotos,
  totalVideos,
}: GalleryHeaderProps) {
  return (
    <div className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="h-8 w-8 text-primary" />
            <h1 className="text-5xl">Event Gallery</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Relive the best moments from our events. From electrifying festivals
            to intimate cocktail tastings, explore the energy and excitement
            that makes Cocktails&Dreams unforgettable.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center bg-card-1">
            <CardContent className="pt-4">
              <Zap className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-2xl">{totalEventTypes}</div>
              <p className="text-sm text-muted-foreground">Event Types</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-card-2">
            <CardContent className="pt-4">
              <Camera className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-2xl">{totalPhotos}</div>
              <p className="text-sm text-muted-foreground">Photos</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-card-3">
            <CardContent className="pt-4">
              <Video className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-2xl">{totalVideos}</div>
              <p className="text-sm text-muted-foreground">Videos</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-card-4">
            <CardContent className="pt-4">
              <Users className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-2xl">{totalPhotos * 100}</div>
              <p className="text-sm text-muted-foreground">Total Views</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
