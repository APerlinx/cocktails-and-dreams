'use client'

import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Star,
  User,
} from 'lucide-react'
import Image from 'next/image'
import { Button } from '../_components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../_components/card'
import { Separator } from '../_components/separator'

export default function Cards() {
  const contactInfo = {
    name: 'Cocktails and Dreams',
    phone: '054-493-0095',
    whatsapp: '+972 54-493-0095',
    email: 'cocktails8dreams1@gmail.com',
    instagram: 'cocktail.dreams_',
    facebook: 'We dont have facebook yet but we are on it!',
    businessHours: {
      weekdays: 'Sunday - Thursday: 07:00 AM - 22:00 PM',
      weekends: 'Friday: 07:00 AM - 17:00 PM',
    },
  }

  const handlePhoneClick = () => {
    window.open(`tel:${contactInfo.phone}`, '_self')
  }

  const handleWhatsAppClick = () => {
    const message = "Hello, I'm interested in your services."
    const whatsappNumber = contactInfo.whatsapp.replace(/\D/g, '')
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      '_blank'
    )
  }

  const handleEmailClick = () => {
    window.open(`mailto:${contactInfo.email}`, '_self')
  }

  const handleInstagramClick = () => {
    window.open(`https://instagram.com`, '_blank')
  }

  const handleWebsiteClick = () => {
    window.open(`https://${contactInfo.facebook}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 cursor-default">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-4 mt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <User className="h-8 w-8 text-primary" />
            <h1 className="text-4xl">Contact Us</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get in touch with us today. We&apos;re here to help and answer any
            questions you might have.
          </p>
        </div>

        {/* Business Name Card */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/10 mb-4 shadow-sm">
          <CardContent className="flex flex-col items-center justify-center p-8 space-y-2">
            <Image
              src="/logo-notext.svg"
              height={90}
              width={90}
              alt="logo of cocktails and dreams"
            />
            <h2 className="text-2xl font-bold text-primary tracking-tight">
              Cocktails & Dreams
            </h2>
            <div className="text-muted-foreground text-sm mb-1">
              בר אקטיבי • סדנאות קוקטיילים • אספקת קוקטיילים לברים, מסעדות
              ואירועים
            </div>
            <Separator className="my-2" />
            <div className="flex gap-2 items-center text-yellow-500 text-sm">
              <Star className="h-4 w-4 fill-yellow-500" />
              <span>100+ אירועים • 5 כוכבים</span>
            </div>
          </CardContent>
        </Card>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Phone */}
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-primary" />
                <CardTitle>Phone</CardTitle>
              </div>
              <CardDescription>
                Call us directly for immediate assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{contactInfo.phone}</p>
              <Button onClick={handlePhoneClick} className="w-full ">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </CardContent>
          </Card>

          {/* WhatsApp */}
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <MessageCircle className="h-6 w-6 text-primary" />
                <CardTitle>WhatsApp</CardTitle>
              </div>
              <CardDescription>
                Message us on WhatsApp for quick responses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{contactInfo.whatsapp}</p>
              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-whatsapp-card hover:bg-whatsapp-card-hover "
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Message on WhatsApp
              </Button>
            </CardContent>
          </Card>

          {/* Facebook */}
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Facebook className="h-6 w-6 text-primary" />
                <CardTitle>Facebook</CardTitle>
              </div>
              <CardDescription>Visit our facebook profile</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{contactInfo.facebook}</p>
              <Button
                onClick={handleWebsiteClick}
                className="w-full bg-facebook-card hover:bg-facebook-card-hover"
              >
                <Facebook className="h-4 w-4 mr-2" />
                Visit facebook
              </Button>
            </CardContent>
          </Card>

          {/* Instagram */}
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Instagram className="h-6 w-6 text-primary" />
                <CardTitle>Instagram</CardTitle>
              </div>
              <CardDescription>
                Just follow for updates or DM us
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{contactInfo.instagram}</p>
              <Button
                onClick={handleInstagramClick}
                className="w-full bg-instagram-card hover:bg-instagram-card-hover"
              >
                <Instagram className="h-4 w-4 mr-2" />
                Follow
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-primary" />
                <CardTitle>Email</CardTitle>
              </div>
              <CardDescription>
                Send us an email for detailed inquiries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{contactInfo.email}</p>
              <Button
                onClick={handleEmailClick}
                variant="outline"
                className="w-full"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </CardContent>
          </Card>

          {/* Business Hours */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-primary" />
                <CardTitle>Business Hours</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Weekdays</p>
                <p>{contactInfo.businessHours.weekdays}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Weekends</p>
                <p>{contactInfo.businessHours.weekends}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Message */}
        <Card className="mt-8 bg-gradient-to-r from-primary/5 to-secondary/10">
          <CardContent className="text-center py-8">
            <h3 className="mb-2">Ready to get started?</h3>
            <p className="text-muted-foreground mb-6">
              Choose your preferred method of contact above and we&apos;ll get
              back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handlePhoneClick} size="lg">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
              <Button
                onClick={handleWhatsAppClick}
                size="lg"
                className="bg-whatsapp-card hover:bg-whatsapp-card-hover"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
