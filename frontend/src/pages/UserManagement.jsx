import { useState, useCallback } from "react";
import FilterBar from "../components/ui/FilterBar";
import Pagination from "../components/ui/Pagination";
import SearchBar from "../components/ui/SearchBar";
import UserTable from "../components/userManagement/UserTable";
import PunishmentLogs from "../components/userManagement/PunishmentLogs";
import Header from "../components/ui/Header";
import BanModal from "../components/userManagement/BanModal";
import UnbanModal from "../components/userManagement/UnbanModal";
import MuteModal from "../components/userManagement/MuteModal";
import UnmuteModal from "../components/userManagement/UnmuteModal";
import WarnModal from "../components/userManagement/WarnModal";

export default function UserManagement() {
  const userData = [
    {
      id: 1,
      name: "An1me12",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHDkKdo1YaS_glFrItElFdnnhBPAJs2R5awn8N1seMrvvZy3XV3VVdhk_t6TKnaof4EYd2EQ7yGChbnYpWCBEK06YFY9lvE8kwev30zJ3MJPleIJqSMkjOOrrsrSJE0d_RGMVADnWCVXFexTCUc5prjxPdBWWK95utOUrsdQXb5f_cljBLbY2soZqpiqWdCmNfSz0tyCXtF61yICu3aGOqb0rxTyChYSJQu-VBNgktmcenAcIbRSy_UzxBrwu5Xb1HrjZNJDoSWjQ",
      email: "an1me123@gmail.com",
      isBanned: false,
      isMuted: true,
    },
    {
      id: 2,
      name: "Zhen Hao",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHDkKdo1YaS_glFrItElFdnnhBPAJs2R5awn8N1seMrvvZy3XV3VVdhk_t6TKnaof4EYd2EQ7yGChbnYpWCBEK06YFY9lvE8kwev30zJ3MJPleIJqSMkjOOrrsrSJE0d_RGMVADnWCVXFexTCUc5prjxPdBWWK95utOUrsdQXb5f_cljBLbY2soZqpiqWdCmNfSz0tyCXtF61yICu3aGOqb0rxTyChYSJQu-VBNgktmcenAcIbRSy_UzxBrwu5Xb1HrjZNJDoSWjQ",
      email: "zhenhao123@gmail.com",
      isBanned: true,
      isMuted: true,
    },
    {
      id: 3,
      name: "Heng Tao",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHDkKdo1YaS_glFrItElFdnnhBPAJs2R5awn8N1seMrvvZy3XV3VVdhk_t6TKnaof4EYd2EQ7yGChbnYpWCBEK06YFY9lvE8kwev30zJ3MJPleIJqSMkjOOrrsrSJE0d_RGMVADnWCVXFexTCUc5prjxPdBWWK95utOUrsdQXb5f_cljBLbY2soZqpiqWdCmNfSz0tyCXtF61yICu3aGOqb0rxTyChYSJQu-VBNgktmcenAcIbRSy_UzxBrwu5Xb1HrjZNJDoSWjQ",
      email: "hengtaong@gmail.com",
      isBanned: false,
      isMuted: false,
    }
  ];

  const fakeLogs = [
    {
        user: "An1me12",
        moderator: "Admin_Zora",
        time: "2023-11-20 14:30",
        type: "Banned",
        duration: "Permanent",
        moderator: "Admin_Zora",
        reason: "Repeated hate speech",
    },
    {
        user: "An1me12",
        moderator: "Mod_Kael",
        time: "2023-10-05 09:15",
        type: "Muted",
        duration: "7 Days",
        reason: "Spamming discussion threads",
    },
    {
        user: "An1me12",
        moderator: "System_Bot",
        time: "2023-08-12 18:45",
        type: "Warned",
        duration: "N/A",
        reason: "Harassment of community members",
    },
  ];

  // state
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState({
    type: null,
    user: null
  });

  // modal control
  const openModal = useCallback((type, user) => {
    setModal({ type, user });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ type: null, user: null });
  }, []);

  // filtering logic
  const filters = ["All", "Banned", "Muted"];
  const filteredUsers = userData.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "All" ||
      (filter === "Banned" && user.isBanned) ||
      (filter === "Muted" && user.isMuted);

    return matchSearch && matchFilter;
  });

  // pagination
  const itemsPerPage = 1;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginatedUsers = filteredUsers.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
  );

  return (
    <div className="max-w-4xl mx-auto w-full">
      {/* Header */}
      <Header title="User Management" desc="Manage users, bans, mutes and activity logs" />

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <FilterBar
          filters={filters}
          activeFilter={filter}
          onChange={setFilter}
        />

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Find user by name or email..."
        />
      </div>

      {/* Table */}
      <UserTable users={paginatedUsers} onAction={openModal} />

      <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      totalItems={filteredUsers.length}
      itemsPerPage={itemsPerPage}
      />

      {/* Overlay */}
      {modal.type === "logs" && (
        <PunishmentLogs
          roleType="user"
          logs={fakeLogs}
          onClose={closeModal}
        />
      )}

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
        />
      )}

      {modal.type === "unban" && (
        <UnbanModal
          user={modal.user}
          onClose={closeModal}
        />
      )}

      {modal.type === "mute" && (
        <MuteModal
          user={modal.user}
          onClose={closeModal}
        />
      )}

      {modal.type === "unmute" && (
        <UnmuteModal
          user={modal.user}
          onClose={closeModal}
        />
      )}
    </div>
  );
}