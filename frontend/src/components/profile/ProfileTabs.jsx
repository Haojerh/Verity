import * as Tabs from "@radix-ui/react-tabs";
import DebateCard from "../homeDebate/DebateCard";
import { ChartBarStacked, FileText, UserPlus } from "lucide-react";

export default function ProfileTabs({
  activeTab,
  setActiveTab,
  posts,
  hasFollowed
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

        {hasFollowed && (
          <Tabs.Trigger 
            value="topics" 
            className="flex items-center gap-2 px-4 py-3 border-b-2 transition-colors
            data-[state=active]:border-foreground 
            data-[state=inactive]:border-transparent 
            data-[state=inactive]:text-muted-foreground 
            hover:text-foreground"
          >
            <ChartBarStacked className="w-4 h-4" />
            Followed Topics
          </Tabs.Trigger>
        )}

        {hasFollowed && (
          <Tabs.Trigger 
            value="users" 
            className="flex items-center gap-2 px-4 py-3 border-b-2 transition-colors
            data-[state=active]:border-foreground 
            data-[state=inactive]:border-transparent 
            data-[state=inactive]:text-muted-foreground 
            hover:text-foreground"
          >
            <UserPlus className="w-4 h-4" />
            Followed Users
          </Tabs.Trigger>
        )}
      </Tabs.List>

      <Tabs.Content value="posts" className="space-y-4">
        {posts.length > 0 ? (
          posts.map((p) => (
            <DebateCard key={p.postID} debate={p} />
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center">
            No posts yet.
          </p>
        )}
      </Tabs.Content>

      {hasFollowed && (
        <Tabs.Content value="topics" className="space-y-4">
          {posts.length > 0 ? (
            posts.map((p) => (
              <DebateCard key={p.postID} debate={p} />
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center">
              No followed topic post yet.
            </p>
          )}
        </Tabs.Content>
      )}

      {hasFollowed && (
        <Tabs.Content value="users" className="space-y-4">
          {posts.length > 0 ? (
            posts.map((p) => (
              <DebateCard key={p.postID} debate={p} />
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center">
              No followed user post yet.
            </p>
          )}
        </Tabs.Content>
      )}
    </Tabs.Root>
  );
}