import ProblemTable from "./ProblemTable";
import RecentProblems from "./RecentProblems";

const ProblemSection = () => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_300px]">
      <ProblemTable />
      <RecentProblems />
    </div>
  );
};

export default ProblemSection;