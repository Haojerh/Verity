import CommentInput from "./CommentInput";
import ThreadItem from "./ThreadItem";

export default function CommentSection({ 
  topic, 
  userSide, 
  activeTab, 
  setActiveTab, 
  discussionData 
}) {
  return (
    <section className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="border-b border-border flex">
        <button
          onClick={() => setActiveTab("pros")}
          className={`flex-1 px-6 py-4 transition-colors ${
            activeTab === "pros" ? "bg-primary/10 border-b-2 border-primary" : "hover:bg-muted"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <span>Team {topic.prosLabel}</span>
            <span className="px-2 rounded-full bg-primary/20 text-primary text-sm">
              {discussionData.filter((c) => c.side === "pros").length}
            </span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab("cons")}
          className={`flex-1 px-6 py-4 transition-colors ${
            activeTab === "cons" ? "bg-destructive/10 border-b-2 border-destructive" : "hover:bg-muted"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <span>Team {topic.consLabel}</span>
            <span className="px-2 rounded-full bg-destructive/20 text-destructive text-sm">
              {discussionData.filter((c) => c.side === "cons").length}
            </span>
          </div>
        </button>
      </div>

      <div className="p-6">
        {!userSide && <CommentInput userSide={null} />}
        {userSide && activeTab === userSide && <CommentInput userSide={userSide} />}

        {userSide && activeTab !== userSide && (
          <div className="p-4 bg-muted/20 rounded-2xl text-center border border-border mb-6">
            <p className="text-sm text-muted-foreground">
              You can only contribute arguments on Team{" "}
              {userSide === "pros" ? topic.prosLabel : topic.consLabel}.
            </p>
          </div>
        )}

        <div className="space-y-4">
          {discussionData
            .filter((comment) => comment.side === activeTab)
            .map((comment) => (
              <ThreadItem key={comment.id} {...comment} />
            ))}
        </div>
      </div>
    </section>
  );
}