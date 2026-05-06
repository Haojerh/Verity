export default function VoteBar({ debate }) {
  const total = debate.statistics.prosVotes + debate.statistics.consVotes;

  const pros = (debate.statistics.prosVotes / total) * 100;
  const cons = (debate.statistics.consVotes / total) * 100;

  return (
    <div className="mb-5">
      <div className="h-2 bg-muted rounded-full flex overflow-hidden">
        <div className="bg-primary" style={{ width: `${pros}%` }} />
        <div className="bg-destructive" style={{ width: `${cons}%` }} />
      </div>

      <div className="flex justify-between text-xs mt-1">
        <span className="text-primary">
          {debate.proLabel}: {debate.statistics.prosVotes}
        </span>
        <span className="text-destructive">
          {debate.conLabel}: {debate.statistics.consVotes}
        </span>
      </div>
    </div>
  );
}