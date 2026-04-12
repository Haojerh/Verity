import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import DisplayModeModal from "../ui/DisplayModeModal";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [displayModeOpen, setDisplayModeOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleChange = (e) => {
      if (e.matches) {
        setSidebarOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    if (mediaQuery.matches) {
      setSidebarOpen(false);
    }

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      
      <Topbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onOpenDisplayMode={() => setDisplayModeOpen(true)}
      />

      <div className="flex relative">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>

      {displayModeOpen && (
        <DisplayModeModal onClose={() => setDisplayModeOpen(false)} />
      )}
    </div>
  );
}