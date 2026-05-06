import { useState, useEffect } from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileTabs from "../components/profile/ProfileTabs";
import { useAuth } from "../context/AuthContext";
import { getFollowerCount } from "../services/FollowService.js";
import { getUserPosts } from "../services/PostService.js";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("posts");
  const [followers, setFollowers] = useState(0);
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.userID) return;

    const fetchData = async () => {
      try {
        const [followerRes, postRes] = await Promise.all([
          getFollowerCount(user.userID),
          getUserPosts(user.userID)
        ]);

        setFollowers(followerRes);
        setPosts(postRes.posts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [user?.userID]);

  const mockSaved = [];

  if (!user) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ProfileHeader user={user} isOwnProfile={true} followers={followers} />

      <ProfileTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        posts={posts}
        saved={mockSaved}
        hasFollowed={true}
      />
    </div>
  );
}