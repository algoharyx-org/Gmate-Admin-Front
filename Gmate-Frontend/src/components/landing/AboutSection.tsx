export default function AboutSection() {
  return (
    <section
      id="about"
      className="border-border bg-background scroll-mt-20 border-b py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          About GMATE
        </h2>
        <p className="text-muted-foreground text-lg">
          GMATE is a modern task management platform designed for teams who
          value clarity, efficiency, and collaboration. Built with cutting-edge
          technology and a focus on user experience, we help teams achieve their
          goals faster and smarter.
        </p>
      </div>
    </section>
  );
}
