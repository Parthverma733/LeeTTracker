import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import GenerateForm from "../components/GenerateForm";
import GeneratedSheet from "../components/GeneratedSheet";
import { fetchProblems } from "../api/leetcode";

const shuffle = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Generate = () => {
  const [allProblems, setAllProblems] = useState([]);
  const [generatedProblems, setGeneratedProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProblems = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchProblems({
          skip: 0,
          limit: 100,
        });

        setAllProblems(data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load problems");
      } finally {
        setLoading(false);
      }
    };

    loadProblems();
  }, []);

  const handleGenerate = ({ easy, medium, hard, topics }) => {
    let filtered = [...allProblems];

    if (topics.length > 0) {
      filtered = filtered.filter((problem) =>
        problem.topicTags.some((tag) =>
          topics.includes(tag.name)
        )
      );
    }

    const easyProblems = shuffle(
      filtered.filter(
        (problem) => problem.difficulty === "Easy"
      )
    ).slice(0, easy);

    const mediumProblems = shuffle(
      filtered.filter(
        (problem) => problem.difficulty === "Medium"
      )
    ).slice(0, medium);

    const hardProblems = shuffle(
      filtered.filter(
        (problem) => problem.difficulty === "Hard"
      )
    ).slice(0, hard);

    const finalSheet = shuffle([
      ...easyProblems,
      ...mediumProblems,
      ...hardProblems,
    ]).map((problem) => ({
      ...problem,
      id: problem.questionFrontendId,
      topic:
        problem.topicTags
          .slice(0, 2)
          .map((tag) => tag.name)
          .join(", ") || "General",
      link: `https://leetcode.com/problems/${problem.titleSlug}/`,
    }));

    setGeneratedProblems(finalSheet);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      <Navbar />

      {/* Background purple glow */}
      <div
        className="
          pointer-events-none
          absolute left-1/2 top-24
          h-[420px] w-[420px]
          -translate-x-1/2
          rounded-full
          bg-violet-600/10
          blur-[140px]
        "
      />

      {/* Secondary glow */}
      <div
        className="
          pointer-events-none
          absolute -right-40 top-[420px]
          h-[360px] w-[360px]
          rounded-full
          bg-indigo-500/[0.07]
          blur-[130px]
        "
      />

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        {/* Page heading */}
        <div className="mb-7 flex items-end justify-between">
          <div>
            <div
              className="
                mb-3
                inline-flex
                rounded-full
                border border-violet-500/20
                bg-violet-500/10
                px-3 py-1
                text-xs font-medium
                text-violet-300
              "
            >
              Practice Generator
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Generate
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Build a custom LeetCode practice sheet.
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            className="
              mb-5
              rounded-xl
              border border-red-500/20
              bg-red-500/[0.07]
              p-3
              text-sm
              text-red-400
              shadow-[0_0_25px_rgba(239,68,68,0.05)]
            "
          >
            {error}
          </div>
        )}

        {/* Main content */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[360px_1fr]">
          <GenerateForm
            onGenerate={handleGenerate}
            disabled={loading}
          />

          <GeneratedSheet problems={generatedProblems} />
        </div>
      </main>
    </div>
  );
};

export default Generate;
