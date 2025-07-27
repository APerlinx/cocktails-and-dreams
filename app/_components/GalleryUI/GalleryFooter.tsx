import { Badge } from './badge'
import { Card, CardContent } from './card'

export default function GalleryFooter() {
  return (
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
  )
}
