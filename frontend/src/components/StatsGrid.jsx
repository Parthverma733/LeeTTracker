const StatCard = ({ label, value, subtitle, glow = "violet" }) => {
  const glowClasses = {
    violet: "bg-violet-500/20",
    green: "bg-emerald-500/20",
    amber: "bg-amber-500/20",
    red: "bg-red-500/20",
  };

  return (
    <div
      className="
        relative overflow-hidden
        rounded-2xl
        border border-zinc-800
        bg-zinc-900/80
        p-5
        shadow-[0_0_35px_rgba(139,92,246,0.06)]
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-violet-500/30
        hover:shadow-[0_0_45px_rgba(139,92,246,0.14)]
      "
    >
      <div
        className={`
          pointer-events-none
          absolute -right-14 -top-14
          h-28 w-28
          rounded-full
          blur-3xl
          ${glowClasses[glow]}
        `}
      />

      <div className="relative z-10">
        <p className="text-sm text-zinc-400">{label}</p>

        <div className="mt-3 flex items-end justify-between">
          <h3 className="text-3xl font-semibold text-white">{value}</h3>

          {subtitle && (
            <span className="text-xs text-zinc-600">{subtitle}</span>
          )}
        </div>
      </div>
    </div>
  );
};

const StatsGrid = ({ profile }) => {
  const getCount = (difficulty) => {
    if (!profile) return "...";

    return (
      profile.submitStats.acSubmissionNum.find(
        (item) => item.difficulty === difficulty,
      )?.count || 0
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total Solved"
        value={getCount("All")}
        glow="violet"
      />

      <StatCard
        label="Easy"
        value={getCount("Easy")}
        glow="green"
      />

      <StatCard
        label="Medium"
        value={getCount("Medium")}
        glow="amber"
      />

      <StatCard
        label="Hard"
        value={getCount("Hard")}
        glow="red"
      />
    </div>
  );
};

export default StatsGrid;