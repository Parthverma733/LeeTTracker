import { useState } from "react";

const topics = [
  "Array",
  "Dynamic Programming",
  "Graph",
  "Binary Search",
  "Tree",
  "Stack",
  "Greedy",
  "Sliding Window",
];

const GenerateForm = ({ onGenerate }) => {
  const [easy, setEasy] = useState(2);
  const [medium, setMedium] = useState(6);
  const [hard, setHard] = useState(2);

  const [selectedTopics, setSelectedTopics] = useState([]);

  const total = easy + medium + hard;

  const toggleTopic = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((item) => item !== topic)
        : [...prev, topic]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onGenerate({
      easy,
      medium,
      hard,
      topics: selectedTopics,
      total,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">
          Generate Sheet
        </h3>

        <p className="mt-1 text-sm text-zinc-500">
          Customize your practice mix.
        </p>
      </div>

      {/* Difficulty Distribution */}

      <div className="mb-6">
        <label className="mb-3 block text-sm text-zinc-400">
          Difficulty distribution
        </label>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="mb-2 text-xs text-emerald-400">
              Easy
            </p>

            <input
              type="number"
              min="0"
              value={easy}
              onChange={(e) =>
                setEasy(Number(e.target.value))
              }
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm text-white outline-none focus:border-zinc-700"
            />
          </div>

          <div>
            <p className="mb-2 text-xs text-amber-400">
              Medium
            </p>

            <input
              type="number"
              min="0"
              value={medium}
              onChange={(e) =>
                setMedium(Number(e.target.value))
              }
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm text-white outline-none focus:border-zinc-700"
            />
          </div>

          <div>
            <p className="mb-2 text-xs text-red-400">
              Hard
            </p>

            <input
              type="number"
              min="0"
              value={hard}
              onChange={(e) =>
                setHard(Number(e.target.value))
              }
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm text-white outline-none focus:border-zinc-700"
            />
          </div>
        </div>

        <p className="mt-3 text-xs text-zinc-600">
          Total: {total} questions
        </p>
      </div>

      {/* Topics */}

      <div className="mb-6">
        <label className="mb-3 block text-sm text-zinc-400">
          Topics
        </label>

        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => {
            const selected =
              selectedTopics.includes(topic);

            return (
              <button
                type="button"
                key={topic}
                onClick={() => toggleTopic(topic)}
                className={`rounded-lg border px-3 py-2 text-xs transition ${
                  selected
                    ? "border-zinc-600 bg-zinc-700 text-white"
                    : "border-zinc-800 bg-zinc-900 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                }`}
              >
                {topic}
              </button>
            );
          })}
        </div>

        <p className="mt-3 text-xs text-zinc-600">
          {selectedTopics.length === 0
            ? "No topic selected — use all topics"
            : `${selectedTopics.length} topics selected`}
        </p>
      </div>

      <button
        type="submit"
        disabled={total === 0}
        className="w-full rounded-xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Generate Practice Sheet
      </button>
    </form>
  );
};

export default GenerateForm;