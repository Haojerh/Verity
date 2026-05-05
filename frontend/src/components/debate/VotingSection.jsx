export default function VotingSection({ post, userSide, handleSelectSide }) {
  const { statistics, proLabel, conLabel } = post; // Destructure normalized properties
  const { prosVotes, consVotes } = statistics;

  const totalVotes = prosVotes + consVotes;

  const prosPercentage = totalVotes > 0 
    ? ((prosVotes / totalVotes) * 100).toFixed(1) 
    : "50.0";

  const consPercentage = totalVotes > 0 
    ? ((consVotes / totalVotes) * 100).toFixed(1) 
    : "50.0";

  // const prosPercentage = (
  //   (post.statistics.prosVotes /
  //     (post.statistics.prosVotes + post.statistics.consVotes)) *
  //   100
  // ).toFixed(1);

  // const consPercentage = (
  //   (post.statistics.consVotes /
  //     (post.statistics.prosVotes + post.statistics.consVotes)) *
  //   100
  // ).toFixed(1);

  return (
    <section className="bg-card border border-border rounded-lg p-6 mb-6">
      <h3 className="mb-4">Choose Your Side</h3>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <button
          onClick={() => handleSelectSide("pros")}
          disabled={userSide !== null}
          className={`p-4 rounded-lg border-2 transition-all ${
            userSide === "pros"
              ? "border-primary bg-primary/5 cursor-default"
              : userSide !== null
              ? "border-border opacity-50 cursor-not-allowed"
              : "border-border hover:border-primary"
          }`}
        >
          <div className="text-center space-y-1">
            <div className="text-xs text-muted-foreground">Choose Side:</div>
            <div className="mb-1">Team {proLabel}</div>
          </div>
        </button>

        <button
          onClick={() => handleSelectSide("cons")}
          disabled={userSide !== null}
          className={`p-4 rounded-lg border-2 transition-all ${
            userSide === "cons"
              ? "border-destructive bg-destructive/5 cursor-default"
              : userSide !== null
              ? "border-border opacity-50 cursor-not-allowed"
              : "border-border hover:border-destructive"
          }`}
        >
          <div className="text-center space-y-1">
            <div className="text-xs text-muted-foreground">Choose Side:</div>
            <div className="mb-1">Team {conLabel}</div>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden flex">
          <div
            className="bg-primary flex items-center justify-end px-2 transition-all"
            style={{ width: `${prosPercentage}%` }}
          >
            <span className="text-xs text-white">{prosPercentage}%</span>
          </div>
          <div
            className="bg-destructive flex items-center justify-start px-2 transition-all"
            style={{ width: `${consPercentage}%` }}
          >
            <span className="text-xs text-white">{consPercentage}%</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Team {proLabel}: {post.statistics.prosVotes} votes</span>
        <span>Team {conLabel}: {post.statistics.consVotes} votes</span>
      </div>
    </section>
  );
}