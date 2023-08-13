import { NextResponse, type NextRequest } from 'next/server';
import { type Review } from 'types';

import { authorize } from '~/lib/authorize';
import * as db from '~/lib/db';

import { generateAISuggestedEmail } from '~/server/google-ai/generate-email';

export async function POST(req: NextRequest) {
  const authorized = authorize();

  if (!authorized) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const accessToken = await db.getStoreToken(authorized.storeHash);

  if (!accessToken) {
    return new NextResponse(
      'Access token not found. Try to re-install the app.',
      { status: 401 }
    );
  }

  const reqBody = (await req.json()) as { review: Review; emailType: string };

  const email = await generateAISuggestedEmail({
    rating: reqBody.review.rating,
    title: reqBody.review.title,
    text: reqBody.review.text,
    customer: reqBody.review.name,
    emailType:
      reqBody.emailType === 'thank-you' ? 'Thank you email' : 'Follow-up email',
  });

  return NextResponse.json(email);
}
