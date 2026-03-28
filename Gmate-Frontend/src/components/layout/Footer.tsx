import { Link } from "react-router-dom";
import { Github, Linkedin } from "lucide-react";
import { useDarkMode } from "@/context/ThemeContext";

export default function Footer() {
  const { isDarkMode } = useDarkMode();

  return (
    <footer className="border-t border-border bg-muted/20 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 shrink-0 rounded-full overflow-hidden border border-border shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-indigo-500/20">
            <img 
              src={isDarkMode ? "/assets/logo-dark.png" : "/assets/logo-light.png"} 
              alt="GMATE Logo" 
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-foreground text-lg font-black tracking-tighter uppercase transition-colors group-hover:text-primary">GMATE</span>
        </Link>

        <div className="flex gap-8 text-muted-foreground text-sm font-bold uppercase tracking-widest">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Security</a>
          <Link to="/contact" className="hover:text-foreground transition-colors">Support</Link>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest opacity-60">
            © {new Date().getFullYear()} GMATE Inc.
          </span>
        </div>
      </div>
    </footer>
  );
}
