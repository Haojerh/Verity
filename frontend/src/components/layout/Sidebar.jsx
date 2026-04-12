import { Link, useLocation } from "react-router-dom";
import { Home, TrendingUp, Clock, Search, Plus, BookOpen, Copyright } from "lucide-react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  return (
    <aside
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 fixed md:sticky top-[64px] left-0 w-64 h-[calc(100vh-64px)] border-r border-border bg-card shrink-0 flex flex-col overflow-hidden transition-transform duration-300 z-50 md:z-auto`}
    >
      <nav className="p-4 space-y-1 flex-1 overflow-y-auto">

        {/* Home */}
        <Link
          to="/"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
            location.pathname === "/"
              ? "bg-muted text-foreground font-medium"
              : "text-foreground hover:bg-muted"
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        {/* Popular */}
        <Link
          to="/popular"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
            location.pathname === "/popular"
              ? "bg-muted text-foreground font-medium"
              : "text-foreground hover:bg-muted"
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          <span>Popular</span>
        </Link>

        {/* Recent */}
        <Link
          to="/recent"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
            location.pathname === "/recent"
              ? "bg-muted text-foreground font-medium"
              : "text-foreground hover:bg-muted"
          }`}
        >
          <Clock className="w-5 h-5" />
          <span>Recent</span>
        </Link>

        {/* Explore */}
        <Link
          to="/explore"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
            location.pathname === "/explore"
              ? "bg-muted text-foreground font-medium"
              : "text-foreground hover:bg-muted"
          }`}
        >
          <Search className="w-5 h-5" />
          <span>Explore</span>
        </Link>

        <hr className="my-2 border-border" />

        {/* Start Discussion */}
        <button className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-primary text-white hover:bg-green-700 transition-colors w-full">
          <Plus className="w-5 h-5" />
          <span>Start A Discussion</span>
        </button>

        <hr className="my-2 border-border" />

        {/* Rules */}
        <Link
          to="/rules"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground text-sm"
        >
          <BookOpen className="w-4 h-4" />
          <span>Rules</span>
        </Link>

        {/* Policies */}
        <Link
          to="/policies"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground text-sm"
        >
          <BookOpen className="w-4 h-4" />
          <span>Policies</span>
        </Link>

      </nav>
      {/* Footer */}
      <div className="p-3 border-t border-border shrink-0">
        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <Copyright className="w-3 h-3" />
          <span>Verity 2026. All rights reserved.</span>
        </div>
      </div>
    </aside>
  );
}