import { Outlet } from "react-router-dom";
import { useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import DisplayModeModal from "../ui/DisplayModeModal";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [displayModeOpen, setDisplayModeOpen] = useState(false);

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

        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      {displayModeOpen && (
        <DisplayModeModal onClose={() => setDisplayModeOpen(false)} />
      )}
    </div>
  );
}