import { useState, useCallback, useEffect } from "react";
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
import { getUsers } from "../services/userService";

export default function UserManagement() {
  // state
  const [userData, setUserData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState({
    type: null,
    user: null
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        setUserData(res.users);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

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
      user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      user?.email?.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "All" ||
      (filter === "Banned" && user.banned) ||
      (filter === "Muted" && user.muted);

    return matchSearch && matchFilter;
  });

  // pagination
  const itemsPerPage = 10;
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
          user={modal.user}
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
          setUserData={setUserData}
        />
      )}

      {modal.type === "unban" && (
        <UnbanModal
          user={modal.user}
          onClose={closeModal}
          setUserData={setUserData}
        />
      )}

      {modal.type === "mute" && (
        <MuteModal
          user={modal.user}
          onClose={closeModal}
          setUserData={setUserData}
        />
      )}

      {modal.type === "unmute" && (
        <UnmuteModal
          user={modal.user}
          onClose={closeModal}
          setUserData={setUserData}
        />
      )}
    </div>
  );
}