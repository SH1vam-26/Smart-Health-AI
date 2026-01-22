"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import {
  symptomDiagnosis,
  type SymptomDiagnosisOutput,
} from "@/ai/flows/symptom-diagnosis";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  symptoms: z
    .string()
    .min(10, "Please provide a more detailed description of your symptoms."),
});

type FormValues = z.infer<typeof formSchema>;

export function SymptomDiagnosisForm() {
  const [result, setResult] = useState<SymptomDiagnosisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    try {
      const diagnosisResult = await symptomDiagnosis(values);
      setResult(diagnosisResult);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An error occurred.",
        description: "Failed to get diagnosis. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Symptom Checker</CardTitle>
            <CardDescription>
              Describe your symptoms in detail below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="symptoms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Symptoms</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., I have a persistent dry cough, a slight fever, and body aches..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent/90">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Diagnose
            </Button>
          </CardFooter>
        </form>
      </Form>
      {result && (
        <CardContent className="space-y-4">
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>Potential Diagnoses</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                {result.potentialDiagnoses.split(', ').map((diag) => (
                    <li key={diag}>{diag}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Alert variant="destructive">
            <AlertTitle>Disclaimer</AlertTitle>
            <AlertDescription>{result.disclaimer}</AlertDescription>
          </Alert>
        </CardContent>
      )}
    </Card>
  );
}
