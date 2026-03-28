export default function StatsSection() {
  const stats = [
    { title: "Total Projects", value: 24 },
    { title: "Tasks Completed", value: 142 },
    { title: "Collaboration", value: "98%" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="border-border bg-card shadow-card rounded-xl border p-5 text-center"
        >
          <p className="text-muted-foreground text-sm">{stat.title}</p>
          <h3 className="text-2xl font-bold">{stat.value}</h3>
        </div>
      ))}
    </div>
  );
}