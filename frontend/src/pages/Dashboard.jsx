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
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-6">

        <div className="mb-6">
          <h2 className="text-2xl font-semibold">
            Dashboard
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Track your LeetCode progress.
          </p>
        </div>

        <StatsGrid profile={profile} />

        <ProblemSection />

      </main>
    </div>
  );
};

export default Dashboard;