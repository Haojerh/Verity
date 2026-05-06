import { useState, useEffect } from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileTabs from "../components/profile/ProfileTabs";
import { useAuth } from "../context/AuthContext";
import { getFollowerCount } from "../services/FollowService.js";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("posts");
  const [followers, setFollowers] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.userID) return;

    const fetchFollowers = async () => {
        try {
        const res = await getFollowerCount(user.userID);
        setFollowers(res);
        } catch (err) {
        console.error(err);
        }
    };

    fetchFollowers();
  }, [user?.userID]);

  const mockPosts = [];
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
        posts={mockPosts}
        saved={mockSaved}
        hasSaved={true}
      />
    </div>
  );
}