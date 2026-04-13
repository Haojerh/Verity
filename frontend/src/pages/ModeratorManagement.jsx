import { useState } from "react";
import Pagination from "../components/ui/Pagination";
import SearchBar from "../components/ui/SearchBar";
import ModeratorTable from "../components/moderatorManagement/ModeratorTable";
import PunishmentLogs from "../components/moderatorManagement/PunishmentLogs";

export default function ModeratorManagement() {
  const userData = [
    {
      id: 1,
      name: "An1me12",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHDkKdo1YaS_glFrItElFdnnhBPAJs2R5awn8N1seMrvvZy3XV3VVdhk_t6TKnaof4EYd2EQ7yGChbnYpWCBEK06YFY9lvE8kwev30zJ3MJPleIJqSMkjOOrrsrSJE0d_RGMVADnWCVXFexTCUc5prjxPdBWWK95utOUrsdQXb5f_cljBLbY2soZqpiqWdCmNfSz0tyCXtF61yICu3aGOqb0rxTyChYSJQu-VBNgktmcenAcIbRSy_UzxBrwu5Xb1HrjZNJDoSWjQ",
      email: "an1me123@gmail.com"
    },
    {
      id: 2,
      name: "Zhen Hao",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHDkKdo1YaS_glFrItElFdnnhBPAJs2R5awn8N1seMrvvZy3XV3VVdhk_t6TKnaof4EYd2EQ7yGChbnYpWCBEK06YFY9lvE8kwev30zJ3MJPleIJqSMkjOOrrsrSJE0d_RGMVADnWCVXFexTCUc5prjxPdBWWK95utOUrsdQXb5f_cljBLbY2soZqpiqWdCmNfSz0tyCXtF61yICu3aGOqb0rxTyChYSJQu-VBNgktmcenAcIbRSy_UzxBrwu5Xb1HrjZNJDoSWjQ",
      email: "zhenhao123@gmail.com"
    },
    {
      id: 3,
      name: "Heng Tao",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHDkKdo1YaS_glFrItElFdnnhBPAJs2R5awn8N1seMrvvZy3XV3VVdhk_t6TKnaof4EYd2EQ7yGChbnYpWCBEK06YFY9lvE8kwev30zJ3MJPleIJqSMkjOOrrsrSJE0d_RGMVADnWCVXFexTCUc5prjxPdBWWK95utOUrsdQXb5f_cljBLbY2soZqpiqWdCmNfSz0tyCXtF61yICu3aGOqb0rxTyChYSJQu-VBNgktmcenAcIbRSy_UzxBrwu5Xb1HrjZNJDoSWjQ",
      email: "hengtaong@gmail.com"
    }
  ];

  const fakeLogs = [
    {
        user: "An1me12",
        time: "2023-08-12 18:45",
        type: "Warned",
        duration: "N/A",
        reason: "Harassment of community members",
    },
  ];

  // 🔥 state
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const itemsPerPage = 10;

  // 🔍 filtering logic
  const filteredUsers = userData.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  // pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginatedUsers = filteredUsers.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
  );

  return (
    <div className="max-w-255 mx-auto w-full">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-1">Moderator Management</h2>
        <p className="text-sm text-gray-500">
          Audit and Regulate staff permission and status.
        </p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Find user by name or email..."
        />
      </div>

      {/* Table */}
      <ModeratorTable users={paginatedUsers} onOpenLogs={(user) => setSelectedUser(user)} />

      <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      totalItems={filteredUsers.length}
      itemsPerPage={itemsPerPage}
      />

      {selectedUser && (
        <PunishmentLogs
            logs={fakeLogs}
            onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}