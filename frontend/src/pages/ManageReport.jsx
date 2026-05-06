import { useState } from "react";
import Pagination from "../components/ui/Pagination";
import Header from "../components/ui/Header";
import ReportTable from "../components/report/ReportTable";
import SearchBar from "../components/ui/SearchBar";
import FilterBar from "../components/ui/FilterBar";

const mockReports = [
  {
    reportID: 1,
    type: "post",
    reportedBy: "john_doe",
    datetime: "2026-05-01 10:15 AM",
    reason: "Spam content in post",
    target_id: 10
  },
  {
    reportID: 2,
    type: "comment",
    reportedBy: "alice_wong",
    datetime: "2026-05-02 02:30 PM",
    reason: "Offensive language",
    target_id: 8
    
  },
  {
    reportID: 3,
    type: "post",
    reportedBy: "michael_lee",
    datetime: "2026-05-02 05:45 PM",
    reason: "Fake news / misinformation",
    target_id: 6
  },
  {
    reportID: 4,
    type: "comment",
    reportedBy: "siti_rahman",
    datetime: "2026-05-03 09:10",
    reason: "Harassment",
    target_id: 20
  }
];

export default function ManageReport() {
  // state
  const [reportData] = useState(mockReports);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");


  const filters = ["All", "Post", "Comment"];
  const filteredReports = reportData.filter((report) => {
    const matchSearch =
      report.reportedBy.toLowerCase().includes(search.toLowerCase()) ||
      report.reason.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "All" ||
      report.type.toLowerCase() === filter.toLowerCase();

    return matchSearch && matchFilter;
  });

  // pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-4xl mx-auto w-full">
      {/* Header */}
      <Header
        title="Report Management"
        desc="View report by users on posts and threads."
      />

      {/* Filters + Search */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <FilterBar
          filters={filters}
          activeFilter={filter}
          onChange={(value) => {
            setFilter(value);
            setCurrentPage(1);
          }}
        />

        <SearchBar
          value={search}
          onChange={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
          placeholder="Search by user or reason..."
        />
      </div>

      {/* Table */}
      <ReportTable reports={paginatedReports} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredReports.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}