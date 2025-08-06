
import { Link, useLocation } from "react-router-dom";
import PATHS from "@/routes/paths";

const navLinks = [
  { to: PATHS.APP.DASHBOARD, label: "Dashboard" },
  { to: PATHS.APP.CATEGORIES, label: "Categories" },
  { to: PATHS.APP.BUDGETS, label: "Budgets" },
  { to: PATHS.APP.TRANSACTIONS, label: "Transactions" },
  { to: PATHS.APP.REPORTS, label: "Reports" },
  { to: PATHS.APP.PROFILE, label: "Profile" },
];

export function Sidebar({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {open && (
        <div
        className="fixed inset-0 z-30 md:hidden bg-black/30"
        onClick={() => setOpen(false)}
        aria-label="Close sidebar"
      />
      ) }
      <aside
        className={`fixed md:static top-0 left-0 h-full w-48 bg-white border-r shadow-md z-40 transition-transform ${open ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:block`}
      >
        <nav className="flex flex-col overflow-y-auto gap-2 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded hover:bg-teal-100 transition ${location.pathname === link.to ? "bg-teal-50 font-semibold text-teal-700" : ""
                }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}