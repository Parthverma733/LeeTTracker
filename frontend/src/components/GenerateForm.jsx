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

const GenerateForm = ({ onGenerate, disabled = false }) => {
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
          absolute -left-20 -top-20
          h-48 w-48
          rounded-full
          bg-violet-500/15
          blur-[90px]
        "
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white">
            Generate Sheet
          </h2>

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
            {/* Easy */}
            <div>
              <p className="mb-2 text-xs font-medium text-emerald-400">
                Easy
              </p>

              <input
                type="number"
                min="0"
                value={easy}
                onChange={(e) =>
                  setEasy(Number(e.target.value))
                }
                className="
                  w-full
                  rounded-xl
                  border border-emerald-500/15
                  bg-zinc-950/70
                  px-3 py-3
                  text-sm text-white
                  outline-none
                  transition-all duration-200
                  hover:border-emerald-500/25
                  focus:border-emerald-500/50
                  focus:ring-2
                  focus:ring-emerald-500/10
                "
              />
            </div>

            {/* Medium */}
            <div>
              <p className="mb-2 text-xs font-medium text-amber-400">
                Medium
              </p>

              <input
                type="number"
                min="0"
                value={medium}
                onChange={(e) =>
                  setMedium(Number(e.target.value))
                }
                className="
                  w-full
                  rounded-xl
                  border border-amber-500/15
                  bg-zinc-950/70
                  px-3 py-3
                  text-sm text-white
                  outline-none
                  transition-all duration-200
                  hover:border-amber-500/25
                  focus:border-amber-500/50
                  focus:ring-2
                  focus:ring-amber-500/10
                "
              />
            </div>

            {/* Hard */}
            <div>
              <p className="mb-2 text-xs font-medium text-rose-400">
                Hard
              </p>

              <input
                type="number"
                min="0"
                value={hard}
                onChange={(e) =>
                  setHard(Number(e.target.value))
                }
                className="
                  w-full
                  rounded-xl
                  border border-rose-500/15
                  bg-zinc-950/70
                  px-3 py-3
                  text-sm text-white
                  outline-none
                  transition-all duration-200
                  hover:border-rose-500/25
                  focus:border-rose-500/50
                  focus:ring-2
                  focus:ring-rose-500/10
                "
              />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-zinc-600">
              Total questions
            </p>

            <span
              className="
                rounded-full
                border border-violet-500/20
                bg-violet-500/10
                px-2.5 py-1
                text-xs font-medium
                text-violet-300
              "
            >
              {total}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-6 h-px bg-zinc-800/80" />

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
                  className={`
                    rounded-lg
                    border
                    px-3 py-2
                    text-xs font-medium
                    transition-all duration-200
                    ${
                      selected
                        ? `
                          border-violet-500/40
                          bg-violet-500/15
                          text-violet-200
                          shadow-[0_0_18px_rgba(139,92,246,0.08)]
                        `
                        : `
                          border-zinc-800
                          bg-zinc-950/50
                          text-zinc-500
                          hover:border-violet-500/25
                          hover:bg-violet-500/[0.05]
                          hover:text-zinc-300
                        `
                    }
                  `}
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

        {/* Generate Button */}
        <button
          type="submit"
          disabled={total === 0 || disabled}
          className="
            w-full
            rounded-xl
            border border-violet-400/20
            bg-violet-600
            px-4 py-3
            text-sm font-medium
            text-white
            shadow-[0_0_25px_rgba(139,92,246,0.22)]
            transition-all duration-200
            hover:bg-violet-500
            hover:shadow-[0_0_35px_rgba(139,92,246,0.35)]
            active:scale-[0.99]
            disabled:cursor-not-allowed
            disabled:opacity-40
            disabled:hover:bg-violet-600
            disabled:hover:shadow-[0_0_25px_rgba(139,92,246,0.22)]
          "
        >
          {disabled ? "Loading Problems..." : "Generate Practice Sheet"}
        </button>
      </div>
    </form>
  );
};

export default GenerateForm;

