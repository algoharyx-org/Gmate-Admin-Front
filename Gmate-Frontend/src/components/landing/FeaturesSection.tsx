import { HomeIcon, RefreshCw, TrendingUp } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="border-border bg-background scroll-mt-20 border-b py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why Choose GMATE?
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Experience a new level of productivity with our suite of tools
            designed for modern, high-performing teams.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
            <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
              <HomeIcon className="text-primary h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Smart Organization</h3>
            <p className="text-muted-foreground text-sm">
              Auto-categorize tasks with AI-driven tags. Stop sorting manually,
              and let our engine do the heavy lifting.
            </p>
          </div>

          <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
            <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
              <RefreshCw className="text-primary h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Real-time Sync</h3>
            <p className="text-muted-foreground text-sm">
              Stay updated across all devices instantly. Whether you&apos;re on
              desktop or mobile, your team is always in sync.
            </p>
          </div>

          <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
            <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
              <TrendingUp className="text-primary h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Progress Tracking</h3>
            <p className="text-muted-foreground text-sm">
              Visual analytics to measure team velocity. Spot bottlenecks early
              with beautiful, real-time charts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
