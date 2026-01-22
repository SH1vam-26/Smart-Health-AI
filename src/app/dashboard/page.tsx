import Link from "next/link";
import {
  ArrowRight,
  HeartPulse,
  Stethoscope,
  FileText,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Symptom Diagnosis",
    description: "Enter your symptoms to get potential diagnoses and insights.",
    href: "/dashboard/symptom-diagnosis",
    icon: Stethoscope,
    cta: "Start Diagnosis",
  },
  {
    title: "Personalized Health Suggestions",
    description: "Receive tailored health advice based on your profile and needs.",
    href: "/dashboard/health-suggestions",
    icon: HeartPulse,
    cta: "Get Suggestions",
  },
  {
    title: "Medical Report Analysis",
    description: "Upload a medical report for an AI-powered analysis of key findings.",
    href: "/dashboard/report-analysis",
    icon: FileText,
    cta: "Analyze Report",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome to HealthAssist AI</h1>
        <p className="text-muted-foreground">Your intelligent partner for better health.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                 <feature.icon className="w-8 h-8 text-primary" />
                 <CardTitle>{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="secondary">
                <Link href={feature.href}>
                  {feature.cta} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
