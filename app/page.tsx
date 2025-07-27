import Image from 'next/image'
import Footer from './_components/Footer'
import NavigateButton from './_components/NavigationButton'
import { getStaticMedia } from './_lib/data-service'

export default async function Home() {
  const videoBg = await getStaticMedia('home-media')
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {videoBg ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
          >
            <source src={videoBg[0].url} type="video/mp4" />
          </video>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-secondary/10d via-primary/10 to-muted-foreground z-[-1]" />
        )}

        <Image
          className="self-center"
          src="/logo.svg"
          alt="Cocktails&dream logo"
          width={200}
          height={200}
          priority
        />

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <NavigateButton
            href="/gallery"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground/80 text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          >
            <Image
              className="dark:invert"
              src="/triangle.svg"
              alt="triangle"
              width={20}
              height={20}
            />
            Gallery
          </NavigateButton>

          <NavigateButton
            href="/contact"
            className="rounded-full border border-solid bg-background/80 border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
          >
            Contact us
          </NavigateButton>
        </div>
      </main>
      <Footer />
    </div>
  )
}
