import { NextResponse, type NextRequest } from 'next/server';
import { authorize } from '~/lib/authorize';
import * as db from '~/lib/db';
import { setPendingReview } from '~/server/bigcommerce-api';

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

  const reqBody = (await req.json()) as { productId: number; reviewId: number };

  const review = await setPendingReview({
    ...reqBody,
    accessToken,
    storeHash: authorized.storeHash,
  });

  return NextResponse.json(review);
}
