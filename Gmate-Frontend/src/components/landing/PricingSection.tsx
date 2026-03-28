export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="border-border bg-background relative overflow-hidden border-b"
    >
      <div className="grid lg:grid-cols-2">
        <div className="bg-primary text-primary-foreground px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 flex items-center justify-center">
          <div className="mx-auto max-w-xl">
            <h2 className="mb-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Ready to streamline your workflow?
            </h2>
            <p className="text-primary-foreground/90 mb-8 text-lg">
              Join thousands of teams using GMATE today. Start your 14-day free
              trial. No credit card required.
            </p>
          </div>
        </div>

        <div className="bg-muted/30 flex items-center justify-center px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="relative mx-auto max-w-sm">
            <div className="border-border bg-card rounded-[2rem] border-8 p-4 shadow-2xl">
              <div className="bg-background rounded-xl">
                <div className="border-border bg-muted/50 border-b px-4 py-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">My Tasks</h4>
                    <div className="bg-muted-foreground/20 h-1.5 w-12 rounded-full" />
                  </div>
                </div>

                <div className="space-y-3 p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Weekly Progress
                      </span>
                      <span className="font-semibold">75%</span>
                    </div>
                    <div className="bg-muted h-2 w-full rounded-full">
                      <div className="bg-primary h-full w-3/4 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[
                      { title: "Complete project", done: true },
                      { title: "Review designs", done: true },
                      { title: "Team meeting", done: false },
                    ].map((task, i) => (
                      <div
                        key={i}
                        className="border-border bg-card flex items-center gap-3 rounded-lg border p-2"
                      >
                        <div
                          className={`h-4 w-4 rounded border-2 ${
                            task.done
                              ? "border-primary bg-primary"
                              : "border-muted-foreground/30"
                          }`}
                        />
                        <span
                          className={`text-xs ${
                            task.done
                              ? "text-muted-foreground line-through"
                              : "text-foreground"
                          }`}
                        >
                          {task.title}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-border bg-muted/50 mt-4 rounded-lg border p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
                        Team Velocity
                      </span>
                    </div>
                    <div className="flex h-16 items-end justify-between gap-1">
                      {[40, 60, 45, 75, 55, 80].map((height, i) => (
                        <div
                          key={i}
                          className="bg-primary flex-1 rounded-t"
                          style={{ height: `${height}%` }}
                        />
                      ))}
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
