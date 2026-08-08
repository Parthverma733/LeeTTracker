import { useEffect, useState } from "react";
import { fetchRecentProblems } from "../api/profile";

const RecentProblems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  const username = import.meta.env.VITE_LEETCODE_USERNAME;

  useEffect(() => {
    const loadRecentProblems = async () => {
      try {
        const data = await fetchRecentProblems(username);
        setProblems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadRecentProblems();
  }, [username]);

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
          h-52 w-52
          rounded-full
          bg-violet-500/15
          blur-[90px]
        "
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-white">
            Recent Problems
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Recently accepted submissions.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <p className="text-sm text-zinc-600">
              Loading...
            </p>
          </div>
        ) : problems.length === 0 ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <p className="text-sm text-zinc-600">
              No recent problems found.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {problems.slice(0, 8).map((problem) => (
              <a
                key={problem.id}
                href={`https://leetcode.com/problems/${problem.titleSlug}/`}
                target="_blank"
                rel="noreferrer"
                className="
                  group
                  block
                  rounded-xl
                  border border-zinc-800
                  bg-zinc-950/50
                  p-4
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:border-violet-500/30
                  hover:bg-violet-500/[0.04]
                  hover:shadow-[0_0_25px_rgba(139,92,246,0.08)]
                "
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p
                      className="
                        text-sm font-medium
                        text-zinc-200
                        transition-colors
                        group-hover:text-violet-300
                      "
                    >
                      {problem.title}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      {/* Green status dot */}
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                      <span className="text-xs font-medium text-emerald-400">
                        Accepted
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <span
                    className="
                      text-sm text-zinc-700
                      transition-all duration-200
                      group-hover:translate-x-1
                      group-hover:text-violet-400
                    "
                  >
                    →
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentProblems;