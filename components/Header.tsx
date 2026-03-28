import { LogOut } from "lucide-react";
import Image from "next/image";
import ThemeToggle from "./themeToggle";
import { logout } from "@/services/apiAuth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function Header() {
  const router = useRouter();
  const { user } = useAuthStore();
  async function handleLogout() {
    await logout();
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    router.push("/");
  }

  return (
    <header className="bg-background/90 border-border sticky top-0 z-30 w-full border-b backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3 pl-16 lg:px-6 lg:pl-6">
        <div className="flex items-center gap-2">
          <Image
            src={user?.avatar?.url || "/avatar.jpg"}
            width={40}
            height={40}
            alt="avatar"
            className="border-border/50 size-10 rounded-full border object-cover"
          />
          <span className="text-foreground text-sm font-semibold sm:text-base truncate max-w-[120px] sm:max-w-none">
            {user?.name || "Loading..."}
          </span>
        </div>
        <ul className="flex items-center gap-3 sm:gap-4">
          <li>
            <ThemeToggle />
          </li>
          <li>
            <button onClick={handleLogout} className="hover:bg-accent w-fit rounded-md p-2 transition-colors">
              <LogOut className="h-5 w-5" />
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
