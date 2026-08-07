const StatCard = ({ label, value, subtitle }) => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <p className="text-sm text-zinc-500">{label}</p>

      <div className="mt-3 flex items-end justify-between">
        <h3 className="text-3xl font-semibold text-white">{value}</h3>

        <span className="text-xs text-zinc-600">{subtitle}</span>
      </div>
    </div>
  );
};

const StatsGrid = ({profile}) => {
  const getCount = (difficulty, profile) => {
    if (!profile) return "...";

    return (
      profile.submitStats.acSubmissionNum.find(
        (item) => item.difficulty === difficulty,
      )?.count || 0
    );
  };
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Total Solved" value={getCount("All", profile)} />

      <StatCard label="Easy" value={getCount("Easy", profile)} />

      <StatCard label="Medium" value={getCount("Medium", profile)} />

      <StatCard label="Hard" value={getCount("Hard", profile)} />
    </div>
  );
};

export default StatsGrid;
