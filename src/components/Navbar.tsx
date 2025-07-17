import { ProfileDropdown } from "@/components/ProfileDropdown";
import { Menu } from "lucide-react";

export function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-teal-600 shadow text-white">
      <div className="flex items-center gap-2">
        <button onClick={onMenuClick} className="md:hidden p-2 text-white" aria-label="Toggle navigation">
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-bold text-2xl tracking-tight">Budgetron</span>
      </div>
      <div>
        <ProfileDropdown />
      </div>
    </nav>
  );
}