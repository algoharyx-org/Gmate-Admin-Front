import { Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="border-border bg-muted/30 border-b py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="space-y-6">
            <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold">
              v1.0 is now live
            </span>

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Master Your Workflow with{" "}
              <span className="text-primary">GMATE</span>
            </h1>

            <p className="text-muted-foreground text-lg sm:text-xl">
              The all-in-one workspace for modern teams to organize tasks, track
              progress, and hit deadlines—effortlessly.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/dashboard"
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold shadow-sm transition-colors"
              >
                Get Started Free
              </Link>
              <a
                href="#features"
                className="border-border bg-background hover:bg-accent inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3 text-base font-semibold shadow-sm transition-colors"
              >
                <Play className="h-5 w-5" />
                See how it works
              </a>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="border-background bg-muted h-8 w-8 rounded-full border-2"
                  />
                ))}
              </div>
              <p className="text-muted-foreground text-sm">
                <span className="text-foreground font-semibold">20k+</span>{" "}
                Trusted by teams worldwide
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="border-border bg-card rounded-2xl border p-6 shadow-lg">
              <div className="border-border mb-4 flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="text-foreground text-sm font-semibold">
                    Task Dashboard
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    This week overview
                  </p>
                </div>
                <button className="bg-primary text-primary-foreground rounded-lg px-4 py-1.5 text-xs font-semibold">
                  New Task +
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-3">
                <div className="space-y-2">
                  <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                    To Do
                  </p>
                  <div className="border-border bg-background space-y-2 rounded-lg border p-2">
                    <div className="border-border bg-card rounded border p-2 text-xs">
                      <div className="mb-1 flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                        <span className="font-medium">Design Review</span>
                      </div>
                      <p className="text-muted-foreground text-[10px]">
                        Due tomorrow
                      </p>
                    </div>
                    <div className="border-border bg-card rounded border p-2 text-xs">
                      <div className="mb-1 flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-amber-500" />
                        <span className="font-medium">API Docs</span>
                      </div>
                      <p className="text-muted-foreground text-[10px]">
                        In progress
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                    In Progress
                  </p>
                  <div className="border-border bg-background space-y-2 rounded-lg border p-2">
                    <div className="border-border bg-card rounded border p-2 text-xs">
                      <div className="mb-1 flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-purple-500" />
                        <span className="font-medium">User Testing</span>
                      </div>
                      <p className="text-muted-foreground text-[10px]">
                        60% complete
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                    Done
                  </p>
                  <div className="border-border bg-background space-y-2 rounded-lg border p-2">
                    <div className="border-border bg-card rounded border p-2 text-xs opacity-60">
                      <div className="mb-1 flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="font-medium line-through">
                          Wireframes
                        </span>
                      </div>
                      <p className="text-muted-foreground text-[10px]">
                        Completed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
