interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="grid gap-1">
        <h1 className="font-semibold text-3xl md:text-4xl">{title}</h1>
        {description && <p className="text-lg text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
}
