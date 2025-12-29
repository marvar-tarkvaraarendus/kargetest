"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, Home } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
      router.push("/admin/login");
      router.refresh();
    } catch {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-xl font-bold text-pink-500">
            Karge Admin
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link
              href="/admin/cookies"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookies
            </Link>
            <Link
              href="/admin/opening-times"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Opening Times
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" target="_blank">
            <Button variant="ghost" size="sm">
              <Home className="w-4 h-4 mr-2" />
              View Site
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
