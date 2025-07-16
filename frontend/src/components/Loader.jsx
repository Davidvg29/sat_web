import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function Loader({text, className, ...props}) {
  return (
    <div className={cn("rounded-3xl fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm", className)} {...props}>
        <Loader2 className="h-12 w-12 animate-spin text-muted-foreground mb-4" />
        <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
