import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
      <div className="bg-slate-950 text-slate-200 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
  );
}
