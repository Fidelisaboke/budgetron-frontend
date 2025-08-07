import { useAuth } from "@/contexts/AuthContext";
import { LogoutDialog } from "@/components/LogoutDialog";
import { Link } from "react-router-dom";
import PATHS from "@/routes/paths";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export function ProfileDropdown() {
  const { user } = useAuth();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="flex items-center gap-2 px-3 py-2 rounded hover:bg-teal-700 transition"
        >
          <span className="font-semibold">{user?.username ?? "User"}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0 bg-white text-gray-800 rounded shadow z-50">
        <Link
          to={PATHS.APP.PROFILE}
          className="block px-4 py-2 hover:bg-teal-50"
        >
          Profile
        </Link>
        <Link
          to={PATHS.APP.SETTINGS}
          className="block px-4 py-2 hover:bg-teal-50"
        >
          Settings
        </Link>
        <LogoutDialog>
          <button
            className="w-full text-left px-4 py-2 hover:bg-teal-50 text-red-600"
          >
            Log Out
          </button>
        </LogoutDialog>
      </PopoverContent>
    </Popover>
  );
}