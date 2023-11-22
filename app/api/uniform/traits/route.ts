import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export  async function GET(req: NextApiRequest, res: NextApiResponse): Promise<NextResponse> {

  

  try {
    const segmentSpaceId = process.env.SEGMENT_SPACE_ID!;
    const segmentApiKey = process.env.SEGMENT_API_KEY!;
    
    const cookieStore = cookies()
    const ajs_anonymous_id = cookieStore.get('ajs_anonymous_id')?.value || '';

    const url = `https://profiles.segment.com/v1/spaces/${segmentSpaceId}/collections/users/profiles/anonymous_id:${ajs_anonymous_id}/traits`;
    const basicAuth = Buffer.from(segmentApiKey + ':').toString('base64');
    //console.error('url', url);
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${basicAuth}`
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({
      error: error.message || 'Internal Server Error'
    }, {
      status: 500 // Set the status code to 500
    });
  }
}
