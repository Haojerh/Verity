import { useState, useEffect } from "react";
import Pagination from "../components/ui/Pagination";
import Header from "../components/ui/Header";
import ReportTable from "../components/report/ReportTable";
import SearchBar from "../components/ui/SearchBar";
import FilterBar from "../components/ui/FilterBar";
import { getAllReports } from "../services/ReportService";

export default function ManageReport() {
  // state
  const [reportData, setReportData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Post", "Comment"];

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await getAllReports();
        setReportData(res.reports); 
      } catch (err) {
        console.error("Failed to fetch reports:", err);
      }
    };

    fetchReports();
  }, []);

  const filteredReports = reportData.filter((report) => {
    const matchSearch =
      report.reporterName.toLowerCase().includes(search.toLowerCase()) ||
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
        type="reports"
      />
    </div>
  );
}