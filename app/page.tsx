import Image from 'next/image'
import Footer from './_components/Footer'
import NavigateButton from './_components/NavigationButton'
import { getStaticMedia } from './_lib/data-service'
import HomeCard from './_components/HomeCard'

export default async function Home() {
  const videoBg = await getStaticMedia('home-media')
  return (
    <div className="grid grid-rows-[1fr_auto] sm:min-h-screen sm:pb-2">
      <div className="font-sans overflow-hidden items-center justify-items-center p-8 pb-36 sm:p-24 ">
        <main className="flex flex-col gap-[32px] row-start-2 items-center ">
          {videoBg[0].url ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-[-1]"
              controls={false}
              disablePictureInPicture
              preload="metadata"
              crossOrigin="anonymous"
            >
              <source src={videoBg[0].url} type="video/mp4" />
            </video>
          ) : (
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-secondary/10d via-primary/10 to-muted-foreground z-[-1]" />
          )}

          <Image
            className="self-center"
            src="https://res.cloudinary.com/dlvlvj00u/image/upload/v1754993623/logo_pgorvi.svg"
            alt="Cocktails&dream logo"
            width={200}
            height={200}
            fetchPriority="high"
            crossOrigin="anonymous"
          />

          <div className="flex gap-4 items-center flex-row">
            <NavigateButton
              href="/gallery"
              className=" bg-foreground/80 text-background hover:bg-[#383838] px-5 w-full h-12"
            >
              <Image
                className="text-background"
                src="/triangle.svg"
                alt="triangle"
                width={20}
                height={20}
              />
              Gallery
            </NavigateButton>

            <NavigateButton
              href="/contact"
              className="bg-background/80 border-black/[.08]  transition-colors  hover:bg-[#f2f2f2] hover:border-transparent h-12 px-5 w-full sm:w-auto md:w-[158px]"
            >
              Contact us
            </NavigateButton>
          </div>
          <HomeCard />
        </main>
      </div>
      <Footer />
    </div>
  )
}
