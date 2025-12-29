"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DeleteCookieButtonProps {
  cookieId: string;
}

export default function DeleteCookieButton({ cookieId }: DeleteCookieButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this cookie?")) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/cookies/${cookieId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast({
          title: "Deleted",
          description: "Cookie deleted successfully",
        });
        router.refresh();
      } else {
        const data = await res.json();
        toast({
          title: "Error",
          description: data.error || "Failed to delete cookie",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleDelete}
      disabled={loading}
      className="text-destructive hover:text-destructive"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
}
