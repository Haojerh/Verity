import { TrendingDown, TrendingUp, Users } from "lucide-react";

export default function ActionBar({ debate }) {
  const totalVotes = debate.statistics.prosVotes + debate.statistics.consVotes;

  return (
    <div className="flex gap-4 text-sm text-muted-foreground mt-3">

      <div className="flex items-center gap-1">
        <Users className="w-4 h-4" />
        <span>{debate.statistics.totalParticipants}</span>
      </div>
      
      <div className="flex items-center gap-1">
        <TrendingUp className="w-4 h-4" />
        <span>{debate.statistics.prosVotes}</span>
      </div>

      <div className="flex items-center gap-1">
        <TrendingDown className="w-4 h-4" />
        <span>{debate.statistics.consVotes}</span>
      </div>
      
    </div>
  );
}