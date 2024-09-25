import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import db from '@/lib/db';


export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const shortCode = nanoid(8);

    const shortenedUrl = await db.url.create({
      data: {
        originalUrl: url,
        shortCode
      }
    })

    return NextResponse.json({ shortCode: shortenedUrl.shortCode }, { status: 201 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
