const difficultyClass = (difficulty) => {
  if (difficulty === "Easy") {
    return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";
  }

  if (difficulty === "Medium") {
    return "border-amber-500/20 bg-amber-500/10 text-amber-400";
  }

  return "border-rose-500/20 bg-rose-500/10 text-rose-400";
};

const GeneratedSheet = ({ problems }) => {
  return (
    <div
      className="
        relative overflow-hidden
        rounded-2xl
        border border-zinc-800
        bg-zinc-900/70
        p-5
        shadow-[0_0_40px_rgba(139,92,246,0.07)]
      "
    >
      {/* Purple ambient glow */}
      <div
        className="
          pointer-events-none
          absolute -right-24 -top-24
          h-56 w-56
          rounded-full
          bg-violet-500/15
          blur-[90px]
        "
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Practice Sheet
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Your generated set will appear here.
            </p>
          </div>

          {problems.length > 0 && (
            <span
              className="
                rounded-full
                border border-violet-500/20
                bg-violet-500/10
                px-3 py-1
                text-xs font-medium
                text-violet-300
              "
            >
              {problems.length} questions
            </span>
          )}
        </div>

        {problems.length === 0 ? (
          <div
            className="
              flex min-h-72
              items-center justify-center
              rounded-xl
              border border-dashed border-violet-500/20
              bg-violet-500/[0.025]
            "
          >
            <div className="text-center">
              <div
                className="
                  mx-auto mb-3
                  flex h-10 w-10
                  items-center justify-center
                  rounded-xl
                  border border-violet-500/20
                  bg-violet-500/10
                  text-violet-400
                "
              >
                +
              </div>

              <p className="text-sm text-zinc-500">
                No sheet generated yet.
              </p>

              <p className="mt-1 text-xs text-zinc-700">
                Choose your preferences and generate a sheet.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {problems.map((problem, index) => (
              <a
                key={problem.id}
                href={problem.link}
                target="_blank"
                rel="noreferrer"
                className="
                  group
                  flex items-center justify-between
                  rounded-xl
                  border border-zinc-800
                  bg-zinc-950/50
                  px-4 py-3
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:border-violet-500/30
                  hover:bg-violet-500/[0.04]
                  hover:shadow-[0_0_24px_rgba(139,92,246,0.07)]
                "
              >
                <div className="flex min-w-0 items-center gap-4">
                  {/* Number */}
                  <div
                    className="
                      flex h-8 w-8
                      shrink-0 items-center justify-center
                      rounded-lg
                      border border-zinc-800
                      bg-zinc-900
                      text-xs font-medium
                      text-zinc-500
                      transition-colors
                      group-hover:border-violet-500/25
                      group-hover:bg-violet-500/10
                      group-hover:text-violet-300
                    "
                  >
                    {index + 1}
                  </div>

                  {/* Problem info */}
                  <div className="min-w-0">
                    <p
                      className="
                        truncate
                        text-sm font-medium
                        text-zinc-200
                        transition-colors
                        group-hover:text-violet-300
                      "
                    >
                      {problem.title}
                    </p>

                    <p className="mt-1 truncate text-xs text-zinc-600">
                      {problem.topic}
                    </p>
                  </div>
                </div>

                {/* Difficulty */}
                <span
                  className={`
                    ml-4
                    shrink-0
                    rounded-full
                    border
                    px-2.5 py-1
                    text-xs font-medium
                    ${difficultyClass(problem.difficulty)}
                  `}
                >
                  {problem.difficulty}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratedSheet;

