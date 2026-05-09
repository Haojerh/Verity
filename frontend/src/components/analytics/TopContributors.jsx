import { TrendingUp } from "lucide-react";

export default function TopContributors({ data }) {
  return (
    <div className="bg-card border rounded-lg p-6">
      <h2 className="mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5" />
        Top Contributors
      </h2>

      <div className="space-y-3">
        {data.map((c, index) => (
          <div key={index + 1} className="flex justify-between p-3 bg-muted rounded-lg">
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <div className="font-medium">{c.name}</div>
            </div>

            <div className="text-right">
              <div className="font-medium text-primary">
                {c.reputation.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">reputation</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}