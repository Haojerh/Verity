import * as Tabs from "@radix-ui/react-tabs";
import DebateCard from "../homeDebate/DebateCard";
import { Bookmark, FileText } from "lucide-react";

export default function ProfileTabs({
  activeTab,
  setActiveTab,
  posts = [],
  saved = [],
  hasSaved = true
}) {
  return (
    <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
      {/* Tabs Header */}
      <Tabs.List className="flex border-b mb-6">
        <Tabs.Trigger 
          value="posts" 
          className="flex items-center gap-2 px-4 py-3 border-b-2 transition-colors
          data-[state=active]:border-foreground 
          data-[state=inactive]:border-transparent 
          data-[state=inactive]:text-muted-foreground 
          hover:text-foreground"
        >
          <FileText className="w-4 h-4" />
          Posts
        </Tabs.Trigger>

        {hasSaved && (
          <Tabs.Trigger 
            value="saved" 
            className="flex items-center gap-2 px-4 py-3 border-b-2 transition-colors
            data-[state=active]:border-foreground 
            data-[state=inactive]:border-transparent 
            data-[state=inactive]:text-muted-foreground 
            hover:text-foreground"
          >
            <Bookmark className="w-4 h-4" />
            Saved
          </Tabs.Trigger>
        )}
      </Tabs.List>

      <Tabs.Content value="posts" className="space-y-4">
        {posts.length > 0 ? (
          posts.map((p) => (
            <DebateCard key={p.id} debate={p} />
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center">
            No posts yet.
          </p>
        )}
      </Tabs.Content>

      {hasSaved && (
        <Tabs.Content value="saved" className="space-y-4">
          {saved.length > 0 ? (
            saved.map((p) => (
              <DebateCard key={p.id} debate={p} />
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center">
              No saved posts.
            </p>
          )}
        </Tabs.Content>
      )}
    </Tabs.Root>
  );
}