import { useEffect, useState } from "react";
import { fetchProblems } from "../api/leetcode";

const difficultyClass = (difficulty) => {
  if (difficulty === "Easy") return "text-emerald-400";
  if (difficulty === "Medium") return "text-amber-400";
  return "text-red-400";
};

const ProblemTable = () => {
  const [problems, setProblems] = useState([]);

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [skip, setSkip] = useState(0);
  const limit = 50;

  const [total, setTotal] = useState(0);

  const loadProblems = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await fetchProblems({
        skip,
        limit,
        difficulty,
        topic,
      });

      setProblems(data.data);
      setTotal(data.totalNum);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProblems();
  }, [skip, difficulty, topic]);

  useEffect(() => {
    setSkip(0);
  }, [difficulty, topic]);

  const filteredProblems = problems.filter((problem) => {
    if (!search.trim()) return true;

    const value = search.toLowerCase();

    return (
      problem.title.toLowerCase().includes(value) ||
      problem.questionFrontendId.includes(value)
    );
  });

  const handlePrevious = () => {
    setSkip((prev) => Math.max(0, prev - limit));
  };

  const handleNext = () => {
    if (skip + limit < total) {
      setSkip((prev) => prev + limit);
    }
  };

  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Problems
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Browse LeetCode problems.
          </p>
        </div>

        <span className="text-sm text-zinc-500">
          {total} problems
        </span>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Search current page..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-700"
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-300 outline-none"
        >
          <option value="All">All Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-300 outline-none"
        >
          <option value="All">All Topics</option>
          <option value="array">Array</option>
          <option value="dynamic-programming">
            Dynamic Programming
          </option>
          <option value="graph">Graph</option>
          <option value="binary-search">
            Binary Search
          </option>
          <option value="tree">Tree</option>
          <option value="stack">Stack</option>
          <option value="greedy">Greedy</option>
          <option value="sliding-window">
            Sliding Window
          </option>
        </select>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-900/50 bg-red-950/30 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="min-h-[500px] overflow-x-auto">
        {loading ? (
          <div className="flex h-[400px] items-center justify-center">
            <p className="text-sm text-zinc-600">
              Loading problems...
            </p>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500">
                <th className="px-3 py-3 font-medium">#</th>
                <th className="px-3 py-3 font-medium">Problem</th>
                <th className="px-3 py-3 font-medium">
                  Difficulty
                </th>
                <th className="px-3 py-3 font-medium">Topics</th>
              </tr>
            </thead>

            <tbody>
              {filteredProblems.map((problem) => (
                <tr
                  key={problem.questionFrontendId}
                  className="border-b border-zinc-900 transition hover:bg-zinc-900/60"
                >
                  <td className="px-3 py-4 text-zinc-500">
                    {problem.questionFrontendId}
                  </td>

                  <td className="px-3 py-4">
                    <a
                      href={`https://leetcode.com/problems/${problem.titleSlug}/`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-zinc-200 hover:text-white"
                    >
                      {problem.title}
                    </a>
                  </td>

                  <td
                    className={`px-3 py-4 ${difficultyClass(
                      problem.difficulty
                    )}`}
                  >
                    {problem.difficulty}
                  </td>

                  <td className="px-3 py-4 text-zinc-500">
                    {problem.topicTags
                      .slice(0, 2)
                      .map((tag) => tag.name)
                      .join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4">
        <button
          onClick={handlePrevious}
          disabled={skip === 0 || loading}
          className="rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-400 transition hover:border-zinc-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          Previous
        </button>

        <span className="text-xs text-zinc-600">
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          onClick={handleNext}
          disabled={
            skip + limit >= total || loading
          }
          className="rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-400 transition hover:border-zinc-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProblemTable;