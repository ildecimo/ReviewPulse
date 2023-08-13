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
  customer: z.string(),
  emailType: z.string(),
});

type AnalyzeReviewInputOptions = z.infer<typeof analyzeReviewInputSchema>;

const analyzeEmailOutputSchema = z.object({
  subject: z.string(),
  body: z.string(),
});

export type AnalyzeEmailOutputOptions = z.infer<
  typeof analyzeEmailOutputSchema
>;

export async function generateAISuggestedEmail(
  options: AnalyzeReviewInputOptions
) {
  const promptEmailBody = `Role: E-commerce customer care expert analyzing product reviews and outputting a result as a string.
    
    Task: Based on the input provided, generate a suggested email body response to the customer.

    Input Format:

    - "Title": The review title.
    - "Body": The review body text.
    - "Rating": The review rating, out of 5.
    - "Customer": The customer's name.
    - "Email Type": The type of email to send to the customer. This can be one of the following: "Thank you email" or "Follow-up email".

    Output Format: string

    Input Data:
    - "Review Title:" ${options.title},
    - "Review Description": ${options.text},
    - "Review Rating": ${options.rating},
    - "Customer Name": ${options.customer},
    - "Email Type": ${options.emailType}
  `;

  const promptEmailSubject = (
    emailBody: string
  ) => `Role: E-commerce customer care expert analyzing product reviews and outputting a result as a string.

  Task: Based on the input provided, generate a suggested email subject for the provided email body.

  Input Format:

  - "Email body": The text of the customer care email.

  Output Format: string

  Input Data:
  - "Email body": ${emailBody}
`;

  try {
    const client = new TextServiceClient({
      authClient: new GoogleAuth().fromAPIKey(API_KEY),
    });

    const responseEmailBody = await client.generateText({
      model: MODEL_NAME,
      prompt: { text: promptEmailBody },
    });

    if (responseEmailBody?.[0]?.candidates) {
      const outputEmailBody = responseEmailBody[0].candidates[0]?.output;

      const responseEmailSubject = await client.generateText({
        model: MODEL_NAME,
        prompt: {
          text: promptEmailSubject(outputEmailBody || ''),
        },
      });

      const outputEmailSubject =
        responseEmailSubject?.[0]?.candidates &&
        responseEmailSubject?.[0]?.candidates[0]?.output;

      if (env.NODE_ENV === 'development') {
        console.log(
          '*** [Vertex Review Analysis Output Subject] ::',
          outputEmailSubject
        );
        console.log(
          '*** [Vertex Review Analysis Output Body] ::',
          outputEmailBody
        );
      }

      if (outputEmailBody) {
        const parsedOutput = analyzeEmailOutputSchema.safeParse({
          subject: outputEmailSubject,
          body: outputEmailBody,
        });

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
