import { NextResponse } from 'next/server'
import { getCloudinaryMedia } from '../../_lib/data-service'

export async function GET() {
  const media = await getCloudinaryMedia('about-media')
  return NextResponse.json(media)
}
