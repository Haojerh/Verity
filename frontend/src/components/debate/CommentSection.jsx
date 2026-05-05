import CommentInput from "./CommentInput";
import ThreadItem from "./ThreadItem";

export default function CommentSection({ 
  post, 
  userSide, 
  activeTab, 
  setActiveTab, 
  comments,
  commentText,
  setCommentText,
  onSubmitComment,
  onSubmitReply,
  openModal,
}) {

  const { proLabel, conLabel } = post;

  return (
    <section className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="border-b border-border flex">
        {/* Team Pros */}
        <button
          onClick={() => setActiveTab("pros")}
          className={`flex-1 px-6 py-4 transition-colors ${
            activeTab === "pros" ? "bg-primary/10 border-b-2 border-primary" : "hover:bg-muted"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <span>Team {proLabel}</span>
            <span className="px-2 rounded-full bg-primary/20 text-primary text-sm">
              {comments.filter((c) => c.side === "pros").length}
            </span>
          </div>
        </button>

        {/* Team Cons */}
        <button
          onClick={() => setActiveTab("cons")}
          className={`flex-1 px-6 py-4 transition-colors ${
            activeTab === "cons" ? "bg-destructive/10 border-b-2 border-destructive" : "hover:bg-muted"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <span>Team {conLabel}</span>
            <span className="px-2 rounded-full bg-destructive/20 text-destructive text-sm">
              {comments.filter((c) => c.side === "cons").length}
            </span>
          </div>
        </button>
      </div>

      <div className="p-6">
        {!userSide && <CommentInput userSide={null} />}
        {userSide && activeTab === userSide && (
          <CommentInput
            userSide={userSide}
            value={commentText}
            onChange={setCommentText}
            onSubmit={onSubmitComment}
          />
        )}

        {userSide && activeTab !== userSide && (
          <div className="p-4 bg-muted/20 rounded-2xl text-center border border-border mb-6">
            <p className="text-sm text-muted-foreground">
              You can only reply on Team {" "}
              {activeTab === "pros" ? proLabel : conLabel}.
            </p>
          </div>
        )}

        <div className="space-y-4">
          {comments
            .filter((comment) => comment.side === activeTab)
            .map((comment) => (
              <ThreadItem 
                key={comment.id} 
                comment={comment} 
                openModal={openModal} 
                proLabel={proLabel}
                conLabel={conLabel}
                onSubmitReply={onSubmitReply}
              />
            ))}
        </div>
      </div>
    </section>
  );
}