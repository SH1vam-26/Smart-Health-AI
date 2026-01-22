import { PageHeader } from "@/components/page-header";
import { ReportAnalysisForm } from "./report-analysis-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function ReportAnalysisPage() {
  return (
    <div>
      <PageHeader
        title="Medical Report Analysis"
        description="Upload a medical report to identify potential issues."
      />
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
            <ReportAnalysisForm />
        </div>
        <div className="hidden lg:block lg:col-span-2">
            <Card className="h-full">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <FileText className="w-6 h-6 text-primary" />
                        <CardTitle>How it works</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <p>
                        This tool leverages AI to scan your medical report (e.g., blood test results, imaging reports) and highlight potential areas of concern that you may want to discuss with your healthcare provider.
                    </p>
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Choose File:</strong> Select a supported document from your device (e.g., PDF, JPG, PNG).</li>
                        <li><strong>Upload & Analyze:</strong> The file will be securely uploaded and analyzed by our AI model.</li>
                        <li><strong>Review Issues:</strong> The AI will provide a summary of potential issues identified in the report.</li>
                    </ol>
                    <p className="font-semibold text-foreground">
                        Disclaimer: The analysis is AI-generated and for informational purposes only. It is not a medical diagnosis. Always consult with a qualified healthcare professional for medical advice and interpretation of your reports.
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
