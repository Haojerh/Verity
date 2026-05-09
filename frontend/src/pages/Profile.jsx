import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileTabs from "../components/profile/ProfileTabs";
import PostSkeleton from "../components/ui/PostSkeleton";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getUserPosts, getFollowedUsersPosts, getFollowedTopicsPosts } from "../services/PostService";
import useInfinitePostsById from "../hooks/useInfinitePostsById.jsx";
import useFollowers from "../hooks/useFollowers";
import useReputation from "../hooks/useReputation.jsx";

export default function Profile() {
  const { user } = useAuth();
  const followers = useFollowers(user?.userID);
  const [activeTab, setActiveTab] = useState("posts");

  const profilePosts = useInfinitePostsById(getUserPosts, user?.userID);
  const followingUsersPosts = useInfinitePostsById(getFollowedUsersPosts, user?.userID);
  const followingTopicsPosts = useInfinitePostsById(getFollowedTopicsPosts, user?.userID);

  const { reputation } = useReputation(user?.userID);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  if (!user) {
    return (
      <div className="text-center mt-10">
        Loading profile...
      </div>
    );
  }

  var activeFeed;

  if (activeTab === "posts") {
    activeFeed = profilePosts;
  } else if (activeTab === "users") {
    activeFeed = followingUsersPosts;
  } else {
    activeFeed = followingTopicsPosts;
  }

  const { posts, loading } = activeFeed;

  return (
    <div className="max-w-4xl mx-auto">
      <ProfileHeader
        user={user}
        isOwnProfile={true}
        followers={followers}
        reputation={reputation}
      />

      <ProfileTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        posts={posts}
        hasFollowed={true}
      />

      {loading && <PostSkeleton count={2} />}
    </div>
  );
}