export default function VoteBar({ debate }) {
  const total = debate.prosVotes + debate.consVotes;

  const pros = (debate.prosVotes / total) * 100;
  const cons = (debate.consVotes / total) * 100;

  return (
    <div className="mb-3">
      <div className="h-2 bg-muted rounded-full flex overflow-hidden">
        <div className="bg-green-500" style={{ width: `${pros}%` }} />
        <div className="bg-red-500" style={{ width: `${cons}%` }} />
      </div>

      <div className="flex justify-between text-xs mt-1">
        <span className="text-green-500">
          {debate.prosSide}: {debate.prosVotes}
        </span>
        <span className="text-red-500">
          {debate.consSide}: {debate.consVotes}
        </span>
      </div>
    </div>
  );
}