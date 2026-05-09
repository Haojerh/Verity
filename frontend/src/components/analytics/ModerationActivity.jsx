import { AlertCircle } from "lucide-react";

export default function ModerationActivity({ data }) {
  return (
    <div className="bg-card border rounded-lg p-6">
      <h2 className="mb-4 flex items-center gap-2">
        <AlertCircle className="w-5 h-5" />
        Moderation Activity (Last 30 Days)
      </h2>

      <div className="space-y-4">
        {data.map((stat, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {stat.action}
              </span>
              <span className="font-medium">{stat.count}</span>
            </div>

            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${(stat.count / 187) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}