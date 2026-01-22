import { PageHeader } from "@/components/page-header";
import { HealthSuggestionsForm } from "./health-suggestions-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse } from "lucide-react";

export default function HealthSuggestionsPage() {
  return (
    <div>
      <PageHeader
        title="Personalized Health Suggestions"
        description="Get tailored health tips based on your profile and current symptoms."
      />
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <HealthSuggestionsForm />
        </div>
        <div className="hidden lg:block lg:col-span-2">
            <Card className="h-full">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <HeartPulse className="w-6 h-6 text-primary" />
                        <CardTitle>How it works</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <p>
                        Our AI-powered health suggestion tool uses the information you provide to generate personalized, actionable advice to help you maintain and improve your well-being.
                    </p>
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Enter Your Profile:</strong> Briefly describe your relevant medical history, lifestyle (e.g., diet, exercise), and any current medications.</li>
                        <li><strong>Describe Symptoms:</strong> List any symptoms you are currently experiencing.</li>
                        <li><strong>Get Suggestions:</strong> Our AI will analyze your input and provide customized health suggestions.</li>
                    </ol>
                    <p className="font-semibold text-foreground">
                        Disclaimer: This tool provides suggestions and is not a substitute for professional medical advice. Always consult a healthcare provider for any health concerns.
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
