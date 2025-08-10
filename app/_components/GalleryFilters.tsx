/* eslint-disable jsx-a11y/alt-text */
import { Button } from './button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './GalleryUI/select'
import { Badge } from './badge'
import { X, Image, Video, Calendar } from 'lucide-react'

interface GalleryFiltersProps {
  selectedEventType: string | null
  selectedMediaType: string | null
  selectedYear: string | null
  onEventTypeChange: (type: string | null) => void
  onMediaTypeChange: (type: string | null) => void
  onYearChange: (year: string | null) => void
  eventTypes: string[]
  years: string[]
  totalItems: number
  filteredItems: number
  loading?: boolean
}

export function GalleryFilters({
  selectedEventType,
  selectedMediaType,
  selectedYear,
  onEventTypeChange,
  onMediaTypeChange,
  onYearChange,
  eventTypes,
  years,
  totalItems,
  filteredItems,
  loading = false,
}: GalleryFiltersProps) {
  const hasActiveFilters =
    selectedEventType || selectedMediaType || selectedYear

  const clearFilters = () => {
    onEventTypeChange(null)
    onMediaTypeChange(null)
    onYearChange(null)
  }

  const handleEventTypeChange = (value: string) => {
    onEventTypeChange(value === 'all' ? null : value)
  }

  const handleMediaTypeChange = (value: string) => {
    onMediaTypeChange(value === 'all' ? null : value)
  }

  const handleYearChange = (value: string) => {
    onYearChange(value === 'all' ? null : value)
  }

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="space-y-2">
            <label className="text-sm">Event Type:</label>
            <Select
              value={selectedEventType || 'all'}
              onValueChange={handleEventTypeChange}
              disabled={loading}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All events" />
              </SelectTrigger>
              <SelectContent dir="rtl">
                <SelectItem value="all">All events</SelectItem>
                {eventTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm">Media Type:</label>
            <Select
              value={selectedMediaType || 'all'}
              onValueChange={handleMediaTypeChange}
              disabled={loading}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All media" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All media</SelectItem>
                <SelectItem value="image">
                  <span className="flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    Photos
                  </span>
                </SelectItem>
                <SelectItem value="video">
                  <span className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Videos
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm">Year:</label>
            <Select
              value={selectedYear || 'all'}
              onValueChange={handleYearChange}
              disabled={loading}
            >
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="All years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filters and Results */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {selectedEventType && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {selectedEventType}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => onEventTypeChange(null)}
              />
            </Badge>
          )}
          {selectedMediaType && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {selectedMediaType === 'image' ? (
                <Image className="h-3 w-3" />
              ) : (
                <Video className="h-3 w-3" />
              )}
              {selectedMediaType === 'image' ? 'Photos' : 'Videos'}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => onMediaTypeChange(null)}
              />
            </Badge>
          )}
          {selectedYear && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {selectedYear}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => onYearChange(null)}
              />
            </Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          Showing {filteredItems} of {totalItems} items
        </p>
      </div>
    </div>
  )
}
