import { Trophy, Users, MessageSquare } from "lucide-react";

export default function StatsRow({ counts, mvp = "you_self12" }) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <div>
            <div className="text-sm text-muted-foreground">MVP</div>
            <div className="text-sm font-bold truncate">
              {mvp ? `@${mvp.toLowerCase().replace(/\s+/g, '_')}` : "No MVP yet"}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-primary" />
          <div>
            <div className="text-sm text-muted-foreground">Total Participants</div>
            <div className="text-lg font-bold">
              {counts.totalParticipants.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-primary" />
          <div>
            <div className="text-sm text-muted-foreground">Total Comments</div>
            <div className="text-lg font-bold">{counts.totalComments.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </section>
  );
}