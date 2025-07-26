import { NextResponse } from 'next/server'
import { getCloudinaryMedia } from '../../_lib/data-service'

export async function GET() {
  const media = await getCloudinaryMedia('home-media')
  return NextResponse.json(media)
}
