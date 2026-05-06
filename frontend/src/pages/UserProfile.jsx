import { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileTabs from "../components/profile/ProfileTabs";
import PunishButtons from "../components/profile/PunishButtons";
import { getUserById } from "../services/UserService";
import WarnModal from "../components/userManagement/WarnModal";
import BanModal from "../components/userManagement/BanModal";
import UnbanModal from "../components/userManagement/UnbanModal";
import MuteModal from "../components/userManagement/MuteModal";
import UnmuteModal from "../components/userManagement/UnmuteModal";
import { useAuth } from "../context/AuthContext";
import { toggleFollow, getFollowStatus, getFollowerCount } from "../services/FollowService.js";
import { getUserPosts } from "../services/PostService.js";

export default function UserProfile() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [activeTab, setActiveTab] = useState("posts");
  const [modal, setModal] = useState({
    type: null,
    user: null,
  });

  useEffect(() => {
    if (currentUser?.userID === id) {
      navigate("/profile");
    }
  }, [currentUser, id, navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id);
        setProfileUser(res.user);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, [id]);

  useEffect(() => {
    const fetchFollowers = async () => {
        try {
        const res = await getFollowerCount(id);
        setFollowers(res);
        } catch (err) {
        console.error(err);
        }
    };

    if (id) fetchFollowers();
  }, [id]);

  useEffect(() => {
    const fetchFollowStatus = async () => {
        try {
        const res = await getFollowStatus(id);
        setIsFollowed(res.following);
        } catch (err) {
        console.error("Failed to fetch follow status", err);
        }
    };

    if (id) fetchFollowStatus();
  }, [id]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getUserPosts(id);
        setPosts(res.posts);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      }
    };

    if (id) fetchPosts();
  }, [id]);

  const handleFollowToggle = async () => {
    try {
        await toggleFollow(profileUser.userID);
        setIsFollowed((prev) => !prev);
        setFollowers((prev) => isFollowed ? prev - 1 : prev + 1);

    } catch (err) {
        console.error(err);
    }
  };

  const openModal = useCallback((type, user) => {
    setModal({ type, user });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ user: null, type: null });
  }, []);

  const mockSaved = [];

  if (!profileUser) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  const isModerator = currentUser?.userRole?.toUpperCase() === "MODERATOR";
  const isAdmin = currentUser?.userRole?.toUpperCase() === "ADMINISTRATOR";
  const isOwnProfile = currentUser?.userID === profileUser?.userID;

  return (
    <div className="max-w-4xl mx-auto">
      <ProfileHeader 
        user={profileUser}
        isOwnProfile={isOwnProfile}
        isFollowed={isFollowed}
        onFollowToggle={handleFollowToggle}
        followers={followers}
      />

      {(isModerator || isAdmin) && !isOwnProfile && (
        <PunishButtons user={profileUser} openModal={openModal} />
      )}

      <ProfileTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        posts={posts}
        saved={mockSaved}
        hasFollowed={isOwnProfile}
      />

      {/* MODALS */}
      {modal.type === "warn" && (
        <WarnModal 
          user={modal.user} 
          onClose={closeModal} 
        />
      )}

      {modal.type === "ban" && (
        <BanModal 
          user={modal.user}
          onClose={closeModal}
          setUserData={setProfileUser}
          isProfile={true}
        />
      )}

      {modal.type === "unban" && (
        <UnbanModal
          user={modal.user}
          onClose={closeModal}
          setUserData={setProfileUser}
          isProfile={true}
        />
      )}

      {modal.type === "mute" && (
        <MuteModal
          user={modal.user}
          onClose={closeModal}
          setUserData={setProfileUser}
          isProfile={true}
        />
      )}

      {modal.type === "unmute" && (
        <UnmuteModal 
          user={modal.user}
          onClose={closeModal}
          setUserData={setProfileUser}
          isProfile={true}
        />
      )}
    </div>
  );
}