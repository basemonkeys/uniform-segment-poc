import {  NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function GET(): Promise<NextResponse> {
  try {
    const segmentSpaceId = process.env.SEGMENT_SPACE_ID!;
    const segmentApiKey = process.env.SEGMENT_API_KEY!;
    
    const cookieStore = cookies();
    const ajs_anonymous_id = cookieStore.get('ajs_anonymous_id')?.value || '';

    const url = `https://profiles.segment.com/v1/spaces/${segmentSpaceId}/collections/users/profiles/anonymous_id:${ajs_anonymous_id}/traits`;
    const basicAuth = Buffer.from(segmentApiKey + ':').toString('base64');

    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${basicAuth}`
      },
    });

    return NextResponse.json(response.data, {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Internal Server Error'
    }, {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
