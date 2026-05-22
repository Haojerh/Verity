import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import DisplayModeModal from "../ui/DisplayModeModal";
import Topbar from "./Topbar";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [displayModeOpen, setDisplayModeOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");

    if (saved) return saved === "dark";

    return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  });

  // sync changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Automatically close sidebar when needed
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
        isDark={isDark}
        mobileSearchOpen={mobileSearchOpen}
        setMobileSearchOpen={setMobileSearchOpen}
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
        <DisplayModeModal onClose={() => {setDisplayModeOpen(false)}} isDark={isDark} onDark={setIsDark}/>
      )}
    </div>
  );
}