import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImpactCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  color?: "green" | "blue" | "yellow" | "coral";
}

export function ImpactCard({ title, description, icon: Icon, className, color = "green" }: ImpactCardProps) {
  const colorStyles = {
    green: "bg-green-50 text-terra-green border-terra-green/20",
    blue: "bg-blue-50 text-terra-blue border-terra-blue/20",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
    coral: "bg-orange-50 text-terra-coral border-terra-coral/20",
  };

  return (
    <div className={cn("p-6 rounded-xl border transition-all hover:shadow-md", colorStyles[color], className)}>
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
