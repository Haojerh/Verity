import { useState, useCallback, useEffect } from "react";
import Pagination from "../components/ui/Pagination";
import SearchBar from "../components/ui/SearchBar";
import ModeratorTable from "../components/moderatorManagement/ModeratorTable";
import PunishmentLogs from "../components/userManagement/PunishmentLogs";
import WarnModal from "../components/userManagement/WarnModal";
import DemoteModal from "../components/moderatorManagement/DemoteModal";
import Header from "../components/ui/Header";
import { getModerators } from "../services/userService";

export default function ModeratorManagement() {
  // state
  const [moderatorData, setModeratorData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState({
      type: null,
      user: null
  });

  useEffect(() => {
    const fetchModerators = async () => {
      try {
        const res = await getModerators();
        setModeratorData(res.moderators);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching moderators:", error);
      }
    };

    fetchModerators();
  }, []);
  
  // modal control
  const openModal = useCallback((type, user) => {
    setModal({ type, user });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ type: null, user: null });
  }, []);

  // pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(moderatorData.length / itemsPerPage);

  const paginatedUsers = moderatorData.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
  );

  return (
    <div className="max-w-4xl mx-auto w-full">
      {/* Header */}
      <Header title="Moderator Management" desc="Audit and Regulate staff permission and status" />

      {/* Search */}
      <div className="mb-4">
        <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Find user by name or email..."
        />
      </div>

      {/* Table */}
      <ModeratorTable users={paginatedUsers} onAction={openModal} />

      <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      totalItems={moderatorData.length}
      itemsPerPage={itemsPerPage}
      />

      {/* Overlay */}
      {modal.type === "logs" && (
        <PunishmentLogs
          roleType="mod"
          user={modal.user}
          onClose={closeModal}
        />
      )}

      {modal.type === "warn" && (
        <WarnModal
          user={modal.user}
          roleType="mod"
          onClose={closeModal}
        />
      )}

      {modal.type === "demote" && (
        <DemoteModal
          user={modal.user}
          onClose={closeModal}
          setModeratorData={setModeratorData}
        />
      )}

    </div>
  );
}