import { AlertTriangle } from "lucide-react";

export default function ImportantNotice({ children }) {
  return (
    <div className="bg-destructive/10 border border-destructive/80 rounded-lg p-4 mb-8">
        <div className="flex gap-3">
        <AlertTriangle className="w-3 h-3 text-destructive shrink-0 mt-2" />
        <div>
            <h3 className="text-foreground mb-1">Important Notice</h3>
            <p className="text-sm text-muted-foreground">
            {children}
            </p>
        </div>
        </div>
    </div>
  )
}