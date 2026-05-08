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

  const normalizedPro = proLabel?.toUpperCase();
  const normalizedCon = conLabel?.toUpperCase();


  const isMatch = (commentSide, targetTab) => {
    if (!commentSide) return false;
    const side = commentSide.toUpperCase();
    
    if (targetTab === "pros") {
      return side === "PROS" || side === normalizedPro;
    }
    if (targetTab === "cons") {
      return side === "CONS" || side === normalizedCon;
    }
    return false;
  };

  const filteredComments = comments.filter((c) => isMatch(c.side, activeTab));

  return (
    <section className="bg-card border border-border rounded-lg overflow-hidden shadow-dark-sm">
      <div className="border-b border-border flex">
        {/* Team Pros Tab */}
        <button
          onClick={() => setActiveTab("pros")}
          className={`flex-1 px-6 py-4 transition-colors ${
            activeTab === "pros" ? "bg-primary/10 border-b-2 border-primary" : "hover:bg-muted"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="font-semibold text-sm">Team {proLabel}</span>
            <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-bold">
              {comments.filter((c) => isMatch(c.side, "pros")).length}
            </span>
          </div>
        </button>

        {/* Team Cons Tab */}
        <button
          onClick={() => setActiveTab("cons")}
          className={`flex-1 px-6 py-4 transition-colors ${
            activeTab === "cons" ? "bg-destructive/10 border-b-2 border-destructive" : "hover:bg-muted"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="font-semibold text-sm">Team {conLabel}</span>
            <span className="px-2 py-0.5 rounded-full bg-destructive/20 text-destructive text-xs font-bold">
              {comments.filter((c) => isMatch(c.side, "cons")).length}
            </span>
          </div>
        </button>
      </div>

      <div className="p-6">
        {/* Comment Input Logic */}
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
          <div className="p-4 bg-muted/20 rounded-xl text-center border border-border mb-6">
            <p className="text-sm text-muted-foreground font-medium">
              You joined Team {userSide === "pros" ? proLabel : conLabel}. 
              You can only contribute to your own team's side.
            </p>
          </div>
        )}

        {/* Thread List */}
        <div className="space-y-4">
          {filteredComments.length > 0 ? (
            filteredComments.map((comment) => (
              <ThreadItem 
                key={comment.id} 
                comment={comment} 
                openModal={openModal} 
                proLabel={proLabel}
                conLabel={conLabel}
                onSubmitReply={onSubmitReply}
              />
            ))
          ) : (
            <div className="py-12 text-center text-muted-foreground border-2 border-dashed border-border rounded-xl bg-muted/5">
              <p className="text-sm">No comments found for Team {activeTab === "pros" ? proLabel : conLabel}.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}