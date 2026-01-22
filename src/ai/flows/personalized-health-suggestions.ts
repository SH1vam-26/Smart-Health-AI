'use server';

/**
 * @fileOverview A flow for providing personalized health suggestions based on user health profile and symptoms.
 *
 * - personalizedHealthSuggestions - A function that generates personalized health suggestions.
 * - PersonalizedHealthSuggestionsInput - The input type for the personalizedHealthSuggestions function.
 * - PersonalizedHealthSuggestionsOutput - The return type for the personalizedHealthSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedHealthSuggestionsInputSchema = z.object({
  healthProfile: z
    .string()
    .describe('The user health profile, including medical history, lifestyle, and current medications.'),
  symptoms: z
    .string()
    .describe('The current symptoms experienced by the user.'),
});
export type PersonalizedHealthSuggestionsInput = z.infer<
  typeof PersonalizedHealthSuggestionsInputSchema
>;

const PersonalizedHealthSuggestionsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('Personalized health suggestions based on the user health profile and symptoms.'),
});
export type PersonalizedHealthSuggestionsOutput = z.infer<
  typeof PersonalizedHealthSuggestionsOutputSchema
>;

export async function personalizedHealthSuggestions(
  input: PersonalizedHealthSuggestionsInput
): Promise<PersonalizedHealthSuggestionsOutput> {
  return personalizedHealthSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedHealthSuggestionsPrompt',
  input: {schema: PersonalizedHealthSuggestionsInputSchema},
  output: {schema: PersonalizedHealthSuggestionsOutputSchema},
  prompt: `You are a health advisor. Based on the user's health profile and symptoms, you will provide personalized health suggestions.

Health profile: {{{healthProfile}}}
Symptoms: {{{symptoms}}}

Suggestions:`,
});

const personalizedHealthSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedHealthSuggestionsFlow',
    inputSchema: PersonalizedHealthSuggestionsInputSchema,
    outputSchema: PersonalizedHealthSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
