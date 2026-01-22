"use client";

import { useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { analyzeMedicalReport } from "@/ai/flows/medical-report-analysis";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function ReportAnalysisForm() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      toast({
        variant: "destructive",
        title: "No file selected.",
        description: "Please select a medical report to analyze.",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const reportDataUri = reader.result as string;
      try {
        const { identifiedIssues } = await analyzeMedicalReport({ reportDataUri });
        setResult(identifiedIssues);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Analysis Failed.",
          description: "Could not analyze the medical report. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = (error) => {
        console.error("FileReader error:", error);
        toast({
            variant: "destructive",
            title: "File Read Error.",
            description: "Could not read the selected file. Please try again with a different file.",
        });
        setIsLoading(false);
    };
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Upload Report</CardTitle>
          <CardDescription>
            Select a document file (e.g., PDF, image) to begin analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="report-file">Medical Report</Label>
            <Input id="report-file" type="file" onChange={handleFileChange} accept="image/*,application/pdf" />
             {file && <p className="text-sm text-muted-foreground">Selected: {file.name}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading || !file} className="bg-accent hover:bg-accent/90">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            Analyze Report
          </Button>
        </CardFooter>
      </form>

      {result && (
        <CardContent>
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>The following potential issues were identified.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{result}</p>
            </CardContent>
          </Card>
        </CardContent>
      )}
    </Card>
  );
}
