import { useState } from "react";
import Navbar from "../components/Navbar";
import GenerateForm from "../components/GenerateForm";
import GeneratedSheet from "../components/GeneratedSheet";

const mockProblems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Array",
    link: "https://leetcode.com/problems/two-sum/",
  },
  {
    id: 20,
    title: "Valid Parentheses",
    difficulty: "Easy",
    topic: "Stack",
    link: "https://leetcode.com/problems/valid-parentheses/",
  },
  {
    id: 704,
    title: "Binary Search",
    difficulty: "Easy",
    topic: "Binary Search",
    link: "https://leetcode.com/problems/binary-search/",
  },
  {
    id: 121,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    topic: "Array",
    link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
  },
  {
    id: 322,
    title: "Coin Change",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    link: "https://leetcode.com/problems/coin-change/",
  },
  {
    id: 200,
    title: "Number of Islands",
    difficulty: "Medium",
    topic: "Graph",
    link: "https://leetcode.com/problems/number-of-islands/",
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    topic: "Sliding Window",
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
  },
  {
    id: 98,
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    topic: "Tree",
    link: "https://leetcode.com/problems/validate-binary-search-tree/",
  },
  {
    id: 55,
    title: "Jump Game",
    difficulty: "Medium",
    topic: "Greedy",
    link: "https://leetcode.com/problems/jump-game/",
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    topic: "Binary Search",
    link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
  },
  {
    id: 42,
    title: "Trapping Rain Water",
    difficulty: "Hard",
    topic: "Array",
    link: "https://leetcode.com/problems/trapping-rain-water/",
  },
  {
    id: 124,
    title: "Binary Tree Maximum Path Sum",
    difficulty: "Hard",
    topic: "Tree",
    link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
  },
];

const shuffle = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Generate = () => {
  const [generatedProblems, setGeneratedProblems] = useState([]);

  const handleGenerate = ({ easy, medium, hard, topics }) => {
    let filtered = [...mockProblems];

    if (topics.length > 0) {
      filtered = filtered.filter((problem) =>
        topics.includes(problem.topic)
      );
    }

    const easyProblems = shuffle(
      filtered.filter((problem) => problem.difficulty === "Easy")
    ).slice(0, easy);

    const mediumProblems = shuffle(
      filtered.filter((problem) => problem.difficulty === "Medium")
    ).slice(0, medium);

    const hardProblems = shuffle(
      filtered.filter((problem) => problem.difficulty === "Hard")
    ).slice(0, hard);

    const generated = shuffle([
      ...easyProblems,
      ...mediumProblems,
      ...hardProblems,
    ]);

    setGeneratedProblems(generated);
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

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[360px_1fr]">
          <GenerateForm onGenerate={handleGenerate} />

          <GeneratedSheet problems={generatedProblems} />
        </div>
      </main>
    </div>
  );
};

export default Generate;