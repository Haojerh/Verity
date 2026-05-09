import { Clock, MessageSquare, Plus, ThumbsUp, Users } from "lucide-react";


const iconMap = {
  Users,
  Clock,
  MessageSquare,
  ThumbsUp,
  Plus
};

export default function AverageStats({ averageStats }) {
  return (
    <div className="bg-card border rounded-lg p-6">
      <h2 className="mb-4">Average Metrics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {averageStats.map((stat, index) => {
          const Icon = iconMap[stat.icon];

          return (
            <div key={index} className="flex items-center gap-4">
              <div className="bg-muted p-3 rounded-lg">
                {Icon && <Icon className="w-5 h-5 text-muted-foreground" />}
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}