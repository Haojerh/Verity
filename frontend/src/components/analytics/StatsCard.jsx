import { Users, FileText, AlertCircle, ActivityIcon } from "lucide-react";

const iconMap = {
  Users,
  FileText,
  AlertCircle,
  ActivityIcon,
};

export default function StatsCards({ statsCards }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsCards.map((stat, index) => {
        const Icon = iconMap[stat.icon];

        return (
          <div key={index} className="bg-card border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-${stat.color} p-3 rounded-lg`}>
                {Icon && <Icon className="w-6 h-6 text-white" />}
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
          </div>
        );
      })}
    </div>
  );
}