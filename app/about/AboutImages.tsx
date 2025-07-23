'use client'

import { CldImage } from 'next-cloudinary'

type MediaItem = {
  public_id: string
  filename: string
}

type AboutImagesProps = {
  media: MediaItem[]
}


function AboutImages({ media } : AboutImagesProps) {
  const founderOne = media.find((item) => item.filename.includes('fssnkx'))
  const founderTwo = media.find(
    (item) => item.filename.includes('evbnub') && item !== founderOne
  )

  return (
    <div className="grid grid-cols-2 grid-rows-2">
      {founderOne && (
        <CldImage
          src={founderOne.public_id}
          alt="Cover"
          width={200}
          height={100}
          className="mx-auto rounded-lg"
        />
      )}

      {founderTwo && (
        <CldImage
          src={founderTwo.public_id}
          alt="Team"
          width={200}
          height={100}
          className="mx-auto  rounded-lg"
        />
      )}
      <div>
        <h2 className="p-2 text-xl font-bold">Idan herman</h2>
        <p className="p-8 ">
          Fusce nisl nisl, cursus sit amet odio in, lobortis pellentesque purus.
          Nam ultrices ultricies tempus. Sed porta magna eu mauris consequat, at
          lacinia odio finibus. Ut in posuere felis. Fusce ultrices, nunc eget
          vestibulum lobortis, sem nisl facilisis ex, vitae elementum leo erat
          ac neque. Cras ac turpis vestibulum, posuere nisl eget, mollis odio.
          Aenean dignissim consequat mattis. Pellentesque tristique diam
          vehicula est laoreet, non pharetra augue dignissim.
        </p>
      </div>
      <div>
        <h2 className="p-2 text-xl font-bold">Ofir lerner</h2>
        <p className="p-8">
          Fusce nisl nisl, cursus sit amet odio in, lobortis pellentesque purus.
          Nam ultrices ultricies tempus. Sed porta magna eu mauris consequat, at
          lacinia odio finibus. Ut in posuere felis. Fusce ultrices, nunc eget
          vestibulum lobortis, sem nisl facilisis ex, vitae elementum leo erat
          ac neque. Cras ac turpis vestibulum, posuere nisl eget, mollis odio.
          Aenean dignissim consequat mattis. Pellentesque tristique diam
          vehicula est laoreet, non pharetra augue dignissim.
        </p>
      </div>
    </div>
  )
}

export default AboutImages
