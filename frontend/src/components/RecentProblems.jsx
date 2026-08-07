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
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-white">
          Recent Problems
        </h3>

        <p className="mt-1 text-sm text-zinc-500">
          Recently accepted submissions.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-zinc-600">
          Loading...
        </p>
      ) : (
        <div className="space-y-3">
          {problems.slice(0, 8).map((problem) => (
            <a
              key={problem.id}
              href={`https://leetcode.com/problems/${problem.titleSlug}/`}
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-zinc-700"
            >
              <p className="text-sm font-medium text-zinc-200">
                {problem.title}
              </p>

              <p className="mt-1 text-xs text-zinc-600">
                Accepted
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentProblems;