export default function PostSkeleton({ count = 3 }) {
  return (
    <div className="space-y-4 py-4">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-border shadow-sm p-4 bg-background"
        >
          {/* header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-muted/20 rounded-full" />

            <div className="flex-1">
              <div className="h-3 bg-muted/40 rounded w-1/3 mb-2" />
              <div className="h-2 bg-muted/40 rounded w-1/4" />
            </div>
          </div>

          {/* title */}
          <div className="h-4 bg-muted/40 rounded w-3/4 mb-3" />

          {/* content */}
          <div className="h-3 bg-muted/40 rounded w-full mb-2" />
          <div className="h-3 bg-muted/40 rounded w-5/6 mb-2" />
          <div className="h-3 bg-muted/40 rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}
