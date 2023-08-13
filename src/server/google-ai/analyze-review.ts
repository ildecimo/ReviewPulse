import { TextServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';
import { z } from 'zod';
import { env } from '~/env.mjs';

const MODEL_NAME = 'models/text-bison-001';
const API_KEY = env.GOOGLE_API_KEY;

const analyzeReviewInputSchema = z.object({
  rating: z.number(),
  title: z.string(),
  text: z.string(),
});

type AnalyzeReviewInputOptions = z.infer<typeof analyzeReviewInputSchema>;

export const analyzeReviewOutputSchema = z.object({
  description: z.string(),
  issueCategories: z.array(z.string()),
  complimentCategories: z.array(z.string()),
  keywords: z.array(z.string()),
  score: z.number(),
});

export type AnalyzeReviewOutputValues = Zod.infer<
  typeof analyzeReviewOutputSchema
>;

export async function analyzeReview(options: AnalyzeReviewInputOptions) {
  // @todo: store results in firestore to avoid recalling the API for already-analysed reviews.

  const prompt = `Role: E-commerce customer care expert analyzing product reviews and outputting results in JSON format.

Task: Infer the customer's feelings from the provided product review and describe them. Avoid excessive quoting from the review. Make your assumptions using 25% of the provided review rating, and the other 75% based on the sentiment of the provided review title and review description.

Input Format:

- "Title": The review title.
- "Body": The review body text.
- "Rating": The review rating, out of 5.

Output Format:

{
   "description": string,
   "issueCategories": Array<"shipping" | "product quality" | "product packaging" | "customer service" | "payment process" | "price" | "return and refund" | "sales and promotions" | "website experience" | "customer expectations">,
   "complimentCategories": Array<"shipping" | "product quality" | "product packaging" | "customer service" | "payment process" | "price" | "return and refund" | "sales and promotions" | "website experience" | "customer expectations">,
   "keywords": Array<string>,
   "score": number
}

(Remember, the output must be in valid JSON format)

Output Format details:

- "description:" A text description of 40 to 50 words explaining the customer's feelings based on their review.
- "issueCategories": Based on provided review, if there are issues, provide categories of the issue from the specified union type. If there are no issues provide an empty array.
- "complimentCategories": Based on provided review, if there are compliments, provide categories of the compliment from the specified union type. If there are no compliments provide an empty array.
- "keywords": The main words or phrases from the review that most influenced the determined sentiment.
- "score": The sentiment score evaluated from the customer's review. This must be a number from 0 to 100, where 0 - 32 is the negative range, 33 - 65 is the neutral range, and 66 - 100 is the positive range.

The review to analyze:

- "Title": ${options.title}
- "Description": ${options.text}
- "Rating": ${options.rating} / 5
`;

  try {
    const client = new TextServiceClient({
      authClient: new GoogleAuth().fromAPIKey(API_KEY),
    });

    const response = await client.generateText({
      model: MODEL_NAME,
      prompt: { text: prompt },
    });

    if (response?.[0]?.candidates) {
      const output = response[0].candidates[0]?.output;

      if (env.NODE_ENV === 'development') {
        console.log('*** [Vertex Review Analysis Output] ::', output);
      }

      if (output) {
        const parsedOutput = analyzeReviewOutputSchema.safeParse(
          JSON.parse(output)
        );

        if (!parsedOutput.success) {
          return 'Error parsing output';
        }

        return parsedOutput.data;
      }
    }
  } catch (error) {
    console.error(error);
  }

  return 'No response from Google AI';
}


