'use server';

/**
 * @fileOverview An AI agent to analyze medical reports and identify potential issues.
 *
 * - analyzeMedicalReport - A function that handles the medical report analysis process.
 * - MedicalReportAnalysisInput - The input type for the analyzeMedicalReport function.
 * - MedicalReportAnalysisOutput - The return type for the analyzeMedicalReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MedicalReportAnalysisInputSchema = z.object({
  reportDataUri: z
    .string()
    .describe(
      "The medical report as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type MedicalReportAnalysisInput = z.infer<typeof MedicalReportAnalysisInputSchema>;

const MedicalReportAnalysisOutputSchema = z.object({
  identifiedIssues: z.string().describe('A summary of potential issues identified in the medical report.'),
});
export type MedicalReportAnalysisOutput = z.infer<typeof MedicalReportAnalysisOutputSchema>;

export async function analyzeMedicalReport(input: MedicalReportAnalysisInput): Promise<MedicalReportAnalysisOutput> {
  return analyzeMedicalReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'medicalReportAnalysisPrompt',
  input: {schema: MedicalReportAnalysisInputSchema},
  output: {schema: MedicalReportAnalysisOutputSchema},
  prompt: `You are an expert medical analyst. Please analyze the following medical report and identify potential issues that the user should discuss with their doctor.\n\nMedical Report: {{media url=reportDataUri}}`,
});

const analyzeMedicalReportFlow = ai.defineFlow(
  {
    name: 'analyzeMedicalReportFlow',
    inputSchema: MedicalReportAnalysisInputSchema,
    outputSchema: MedicalReportAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
