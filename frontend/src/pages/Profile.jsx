import { useState, useCallback, useEffect } from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileTabs from "../components/profile/ProfileTabs";
import PunishButtons from "../components/profile/PunishButtons";
import { getCurrentUser } from "../services/userService";
import WarnModal from "../components/userManagement/WarnModal";
import BanModal from "../components/userManagement/BanModal";
import UnbanModal from "../components/userManagement/UnbanModal";
import MuteModal from "../components/userManagement/MuteModal";
import UnmuteModal from "../components/userManagement/UnmuteModal";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("posts");
  const { user } = useAuth();

//   const [modal, setModal] = useState({
//     type: null,
//     user: null 
//   });

//   const openModal = useCallback((type, user) => {
//     setModal({ type, user });
//   }, []);

//   const closeModal = useCallback(() => {
//     setModal({ user: null, type: null });
//   }, []);

  const mockPosts = [];
  const mockSaved = [];

  if (!user) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ProfileHeader user={user} isOwnProfile={true} />

      {/* <PunishButtons user={user} openModal={openModal} /> */}

      <ProfileTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        posts={mockPosts}
        saved={mockSaved}
        hasSaved={true}
      />

      {/* MODALS */}
      {/* {modal.type === "warn" && (
        <WarnModal user={modal.user} onClose={closeModal} />
      )}

      {modal.type === "ban" && (
        <BanModal user={modal.user} onClose={closeModal} />
      )}

      {modal.type === "unban" && (
        <UnbanModal user={modal.user} onClose={closeModal} />
      )}

      {modal.type === "mute" && (
        <MuteModal user={modal.user} onClose={closeModal} />
      )}

      {modal.type === "unmute" && (
        <UnmuteModal user={modal.user} onClose={closeModal} />
      )} */}
    </div>
  );
}