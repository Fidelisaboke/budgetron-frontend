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
import React, {useState} from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type ConfirmDeleteModalProps = {
  children: React.ReactNode;
  onDelete: () => void;
  loading: boolean;
}

export function ConfirmDeleteModal({ children, onDelete, loading }: ConfirmDeleteModalProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      await onDelete();
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong when trying to delete!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={handleDelete} disabled={loading}>
              {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2 inline" /> : null}
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
