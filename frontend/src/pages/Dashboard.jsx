import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import StatsGrid from "../components/StatsGrid";
import ProblemSection from "../components/ProblemSection";

import { fetchProfile } from "../api/profile";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);

  const username = "parthverma733";

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfile(username);
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadProfile();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      <Navbar />

      {/* Main violet ambient glow */}
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

      {/* Left secondary glow */}
      <div
        className="
          pointer-events-none
          absolute -left-40 top-[500px]
          h-[340px] w-[340px]
          rounded-full
          bg-violet-500/[0.06]
          blur-[130px]
        "
      />

      {/* Right secondary glow */}
      <div
        className="
          pointer-events-none
          absolute -right-40 top-[800px]
          h-[360px] w-[360px]
          rounded-full
          bg-indigo-500/[0.06]
          blur-[130px]
        "
      />

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="mb-7">
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
            Overview
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Dashboard
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Track your LeetCode progress.
          </p>
        </div>

        {/* Stats */}
        <StatsGrid profile={profile} />

        {/* Problems */}
        <ProblemSection />
      </main>
    </div>
  );
};

export default Dashboard;

