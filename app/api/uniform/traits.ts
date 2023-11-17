import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const segmentSpaceId = process.env.SEGMENT_SPACE_ID!;
  const segmentApiKey = process.env.SEGMENT_API_KEY!;
  const nextCookies = req.cookies;
  const ajs_anonymous_id = nextCookies.ajs_anonymous_id;
  const url = `https://profiles.segment.com/v1/spaces/${segmentSpaceId}/collections/users/profiles/anonymous_id:${ajs_anonymous_id}/traits`;
  const basicAuth = Buffer.from(segmentApiKey + ':').toString('base64');
  axios
    .get(url, {
      headers: {
        Authorization: `Basic ${basicAuth}`
      },
    })
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      res.status(error.response.status).json({
        error,
      });
    });
}

