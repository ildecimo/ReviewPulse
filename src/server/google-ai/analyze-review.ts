import { TextServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';
import { z } from 'zod';
import { env } from '~/env.mjs';

const MODEL_NAME = 'models/text-bison-001';
const API_KEY = env.GOOGLE_API_KEY;

const analyzeReviewSchema = z.object({
  rating: z.number(),
  title: z.string(),
  text: z.string(),
});

type AnalyzeReviewOptions = z.infer<typeof analyzeReviewSchema>;

const prepareInput = (options: AnalyzeReviewOptions): string => {
  return `
    Title: ${options.title}
    Description: ${options.text}
    Rating: ${options.rating} / 5
  `;
};

export async function analyzeReview(
  options: AnalyzeReviewOptions
): Promise<string> {
  const input = prepareInput(options);

  // @todo: improve prompt
  const prompt = `Act as an e - commerce customer care expert who analyzes product reviews.
    Task: Based on provided input parameters, provide a couple of sentences explaining the sentiment of the review.
    ${input}
    `;

  try {
    const client = new TextServiceClient({
      authClient: new GoogleAuth().fromAPIKey(API_KEY),
    });

    const response = await client.generateText({
      model: MODEL_NAME,
      prompt: { text: prompt },
    });

    if (response && response[0] && response[0].candidates) {
      return response[0].candidates[0]?.output || 'No response from Google AI';
    }
  } catch (error) {
    console.error(error);
  }

  return 'No response from Google AI';
}
