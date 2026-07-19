import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imagePath = searchParams.get('path');

  if (!imagePath) {
    return new NextResponse('Path is required', { status: 400 });
  }

  try {
    const fileBuffer = fs.readFileSync(imagePath);
    const extension = path.extname(imagePath).toLowerCase();
    
    let contentType = 'image/jpeg';
    if (extension === '.png') contentType = 'image/png';
    else if (extension === '.gif') contentType = 'image/gif';
    else if (extension === '.svg') contentType = 'image/svg+xml';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving image:', error);
    return new NextResponse('Image not found', { status: 404 });
  }
}
