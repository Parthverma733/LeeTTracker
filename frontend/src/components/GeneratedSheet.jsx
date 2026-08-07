const difficultyClass = (difficulty) => {
  if (difficulty === "Easy") return "text-emerald-400";
  if (difficulty === "Medium") return "text-amber-400";
  return "text-red-400";
};

const GeneratedSheet = ({ problems }) => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-white">
          Practice Sheet
        </h3>

        <p className="mt-1 text-sm text-zinc-500">
          Your generated set will appear here.
        </p>
      </div>

      {problems.length === 0 ? (
        <div className="flex min-h-72 items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900/40">
          <p className="text-sm text-zinc-600">
            No sheet generated yet.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {problems.map((problem, index) => (
            <a
              key={problem.id}
              href={problem.link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 transition hover:border-zinc-700"
            >
              <div className="flex items-center gap-4">
                <span className="text-sm text-zinc-600">
                  {index + 1}
                </span>

                <div>
                  <p className="text-sm font-medium text-zinc-200">
                    {problem.title}
                  </p>

                  <p className="mt-1 text-xs text-zinc-600">
                    {problem.topic}
                  </p>
                </div>
              </div>

              <span
                className={`text-xs ${difficultyClass(
                  problem.difficulty
                )}`}
              >
                {problem.difficulty}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default GeneratedSheet;