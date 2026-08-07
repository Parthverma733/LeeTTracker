import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="border-b border-zinc-800 bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-lg font-semibold text-white">
            LeetCode Tracker
          </h1>
          <p className="text-xs text-zinc-500">
            Practice smarter
          </p>
        </div>

        <nav className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 p-1">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `rounded-lg px-4 py-2 text-sm transition ${
                isActive
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500 hover:text-white"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/generate"
            className={({ isActive }) =>
              `rounded-lg px-4 py-2 text-sm transition ${
                isActive
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500 hover:text-white"
              }`
            }
          >
            Generate
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;