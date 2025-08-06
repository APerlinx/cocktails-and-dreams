'use client'

import {
  Award,
  CalendarHeart,
  Clock,
  Heart,
  Martini,
  Star,
  Users,
  Zap,
} from 'lucide-react'
import { CldImage } from 'next-cloudinary'
import { Badge } from '../_components/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../_components/card'
import Image from 'next/image'

type MediaItem = {
  public_id: string
  filename: string
}

type AboutImagesProps = {
  media: MediaItem[]
}

export default function Content({ media }: AboutImagesProps) {
  const founderOne = media.find((item) => item.filename.includes('idan'))
  const founderTwo = media.find((item) => item.filename.includes('ofir'))
  const mainImage = media.find((item) => item.filename.includes('main'))

  const stats = [
    { label: 'Years in Business', value: '5+', icon: Clock },
    { label: 'Happy Customers', value: '10K+', icon: Users },
    { label: 'Signature Cocktails', value: '100+', icon: Martini },
    { label: 'Events Hosted', value: '100+', icon: CalendarHeart },
  ]

  const values = [
    {
      icon: Heart,
      title: 'Passion for Excellence',
      description:
        'Every drink is crafted with dedication and attention to detail that shows in every sip.',
      color: 'bg-card-1',
    },
    {
      icon: Users,
      title: 'Community First',
      description:
        'We believe in creating connections and bringing people together in a welcoming atmosphere.',
      color: 'bg-card-2',
    },
    {
      icon: Zap,
      title: 'Innovation & Tradition',
      description:
        'We blend classic techniques with modern creativity to deliver unique experiences.',
      color: 'bg-card-3',
    },
    {
      icon: Award,
      title: 'Quality Standards',
      description:
        'From ingredients to service, we maintain the highest standards in everything we do.',
      color: 'bg-card-4',
    },
  ]

  return (
    <div className="min-h-screen bg-background cursor-default">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/10">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Our Story
            </Badge>
            <h1 className="text-5xl mb-6">About Cocktails&Dreams</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Serving vibes. Shaking dreams. Anywhere you need us.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl ">
        {/* Stats Section */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 ">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="marble-bg-2 text-center hover:shadow-lg transition-all duration-200 relative overflow-hidden"
            >
              <CardContent className="relative pt-6">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl mb-1">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Our Story Section */}
        <div className="mb-16">
          <Card className="overflow-hidden marble-bg-2">
            <div className="grid md:grid-cols-2">
              <div className="relative w-full h-full min-h-[400px]">
                {mainImage && (
                  <CldImage
                    src={mainImage.public_id}
                    alt="Cover"
                    fill
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <h2 className="text-3xl mb-4">Our Journey</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed ">
                  Cocktails&Dreams was born from a shared passion for mixology
                  and unforgettable nights. What began as a simple idea between
                  two friends is now a fully mobile bar experience that brings
                  handcrafted cocktails, energy, and flair directly to your
                  event — wherever it is.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Whether it&apos;s a yacht party, a backyard birthday, a
                  bachelorette celebration, or a corporate event, we come
                  prepared with a custom menu, professional mixologists, and a
                  vibe that transforms any space. No venue? No problem.
                  Cocktails&Dreams is the bar that comes to you.
                </p>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Founders Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl mb-4">Meet Our Founders</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The visionaries behind Cocktails&Dreams who turned their passion
              for cocktails into an unforgettable experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Founder 1 Placeholder */}
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-8 text-center">
                <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/10">
                  {founderOne && (
                    <CldImage
                      src={founderOne.public_id}
                      alt="Cover"
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <h3 className="text-xl mb-2">Idan herman</h3>
                <Badge variant="outline" className="mb-4">
                  Co-Founder & Head Mixologist
                </Badge>
                <p className="text-muted-foreground leading-relaxed">
                  With a genuine passion for hospitality and a knack for
                  creativity, Idan is the driving force behind every
                  unforgettable event. Known for his signature cocktails and
                  personal touch, he brings energy, expertise, and good vibes
                  wherever he goes. From crafting unique drinks to making sure
                  every guest feels special, Idan turns every gathering into a
                  celebration.
                </p>
              </CardContent>
            </Card>

            {/* Founder 2 Placeholder */}
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-8 text-center">
                <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/10">
                  {founderTwo && (
                    <CldImage
                      src={founderTwo.public_id}
                      alt="Cover"
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <h3 className="text-xl mb-2">Ofir lerner</h3>
                <Badge variant="outline" className="mb-4">
                  Co-Founder & Operations Director
                </Badge>
                <p className="text-muted-foreground leading-relaxed">
                  Ofir is both a skilled mixologist and the person who keeps
                  things running smoothly behind the scenes. He enjoys creating
                  fresh cocktails for every event and making sure all the
                  details come together as planned. With a relaxed attitude and
                  a practical approach, Ofir helps make every experience easy
                  and enjoyable for everyone involved
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl mb-4">What Drives Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our core values shape every decision we make and every experience
              we create.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className={`hover:shadow-lg transition-shadow duration-200 ${value.color}`}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <value.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/10">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl mb-4">Ready to Experience our drinks?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Invite us for an unforgettable event where great drinks, amazing
              music, and incredible energy come together. Every drink is a new
              adventure waiting to happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Any hour</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Any event</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Star className="h-4 w-4" />
                <span>Amazing drinks</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
