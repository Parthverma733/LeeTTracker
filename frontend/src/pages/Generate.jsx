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
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">
            Generate
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Build a custom LeetCode practice sheet.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-900/50 bg-red-950/30 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[360px_1fr]">
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