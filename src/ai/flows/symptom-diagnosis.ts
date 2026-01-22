'use server';

/**
 * @fileOverview A symptom diagnosis AI agent.
 *
 * - symptomDiagnosis - A function that handles the symptom diagnosis process.
 * - SymptomDiagnosisInput - The input type for the symptomDiagnosis function.
 * - SymptomDiagnosisOutput - The return type for the symptomDiagnosis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomDiagnosisInputSchema = z.object({
  symptoms: z
    .string()
    .describe("The user's symptoms, described in a single string."),
});
export type SymptomDiagnosisInput = z.infer<typeof SymptomDiagnosisInputSchema>;

const SymptomDiagnosisOutputSchema = z.object({
  potentialDiagnoses: z
    .string()
    .describe('A list of potential diagnoses based on the symptoms.'),
  disclaimer: z
    .string()
    .describe(
      'A disclaimer that the diagnoses are potential and not definitive medical advice.'
    ),
});
export type SymptomDiagnosisOutput = z.infer<typeof SymptomDiagnosisOutputSchema>;

export async function symptomDiagnosis(input: SymptomDiagnosisInput): Promise<SymptomDiagnosisOutput> {
  return symptomDiagnosisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'symptomDiagnosisPrompt',
  input: {schema: SymptomDiagnosisInputSchema},
  output: {schema: SymptomDiagnosisOutputSchema},
  prompt: `You are an AI assistant specializing in providing potential diagnoses based on user-provided symptoms.

  Given the following symptoms: {{{symptoms}}}

  Provide a list of potential diagnoses. Also, include a disclaimer that these diagnoses are potential and not definitive medical advice.
  The potentialDiagnoses field should be a comma separated list.
  Here's an example of a well-formatted response:
  \\\`\`\`json
  {
    "potentialDiagnoses": "Common cold, Flu, Bronchitis",
    "disclaimer": "These diagnoses are potential and not definitive medical advice. Consult a healthcare professional for accurate diagnosis and treatment."
  }
  \\\`\`\``,
});

const symptomDiagnosisFlow = ai.defineFlow(
  {
    name: 'symptomDiagnosisFlow',
    inputSchema: SymptomDiagnosisInputSchema,
    outputSchema: SymptomDiagnosisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
