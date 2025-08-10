'use client'

import { Camera, Zap, Video, Users } from 'lucide-react'
import { Card, CardContent } from './card'

interface GalleryHeaderProps {
  totalEventTypes: number
  totalPhotos: number
  totalVideos: number
}

const statsData = [
  {
    label: 'Event Types',
    icon: Zap,
    getValue: (props: GalleryHeaderProps) => props.totalEventTypes,
  },
  {
    label: 'Photos',
    icon: Camera,
    getValue: (props: GalleryHeaderProps) => props.totalPhotos,
  },
  {
    label: 'Videos',
    icon: Video,
    getValue: (props: GalleryHeaderProps) => props.totalVideos,
  },
  {
    label: 'Total Views',
    icon: Users,
    getValue: (props: GalleryHeaderProps) => props.totalPhotos * 103,
  },
]

export function GalleryHeader(props: GalleryHeaderProps) {
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
          {statsData.map(({ label, icon: Icon, getValue }) => (
            <Card className="text-center marble-bg-2" key={label}>
              <CardContent className="pt-4">
                <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-2xl">{getValue(props)}</div>
                <p className="text-sm text-muted-foreground">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
