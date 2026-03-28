const profile = {
  name: "Mohamed",
  email: "mohamed@example.com",
  bio: "Productive and focused on delivering great results.",
};

export default function ProfileCard() {
  return (
    <div className="border-border bg-card shadow-card rounded-xl border p-6">
      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <img
          src="/assets/avatar.jpg"
          alt="Profile"
          className="border-border size-24 shrink-0 rounded-full border-2 object-cover sm:size-28"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-foreground text-lg font-semibold">
            {profile.name}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">{profile.email}</p>
          {profile.bio && (
            <p className="text-muted-foreground mt-2 max-w-md text-sm">
              {profile.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
