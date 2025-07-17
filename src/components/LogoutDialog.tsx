// src/components/LogoutDialog.tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function LogoutDialog({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    try {
      logout();
      toast.success("You have been logged out.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out of your account?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={handleLogout} disabled={loading}>
              {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2 inline" /> : null}
              {loading ? "Logging out..." : "Log Out"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
