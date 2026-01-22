import { PageHeader } from "@/components/page-header";
import { SymptomDiagnosisForm } from "./symptom-diagnosis-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope } from "lucide-react";

export default function SymptomDiagnosisPage() {
  return (
    <div>
      <PageHeader
        title="Symptom Diagnosis"
        description="Describe your symptoms to get a list of potential diagnoses."
      />
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <SymptomDiagnosisForm />
        </div>
        <div className="hidden lg:block lg:col-span-2">
            <Card className="h-full">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Stethoscope className="w-6 h-6 text-primary" />
                        <CardTitle>How it works</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <p>
                        This tool uses a large language model to analyze the symptoms you provide and generate a list of potential conditions that might be related.
                    </p>
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Describe Symptoms:</strong> In the text area, provide a clear and detailed description of the symptoms you're experiencing.</li>
                        <li><strong>Submit for Analysis:</strong> Click the "Diagnose" button to send your information to the AI.</li>
                        <li><strong>Review Potential Diagnoses:</strong> The AI will return a list of possible conditions based on your input.</li>
                    </ol>
                    <p className="font-semibold text-foreground">
                        Disclaimer: This is an informational tool and does not provide medical advice. The diagnoses are potential and not definitive. Please consult a healthcare professional for an accurate diagnosis.
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
