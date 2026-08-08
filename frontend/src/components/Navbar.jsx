import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header
      className="
        relative
        border-b border-zinc-800/80
        bg-zinc-950/80
        backdrop-blur-xl
      "
    >
      {/* Subtle purple glow under navbar */}
      <div
        className="
          pointer-events-none
          absolute left-1/2 top-0
          h-24 w-[500px]
          -translate-x-1/2
          bg-violet-600/[0.06]
          blur-[80px]
        "
      />

      <div
        className="
          relative z-10
          mx-auto flex max-w-7xl
          items-center justify-between
          px-6 py-4
        "
      >
        {/* Brand */}
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-xl
              border border-violet-500/20
              bg-violet-500/10
              text-sm font-bold
              text-violet-300
              shadow-[0_0_20px_rgba(139,92,246,0.10)]
            "
          >
            LT
          </div>

          <div>
            <h1 className="text-sm font-semibold text-white">
              LeetCode Tracker
            </h1>

            <p className="text-xs text-zinc-600">
              Practice smarter
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav
          className="
            flex items-center gap-1
            rounded-xl
            border border-zinc-800
            bg-zinc-950/70
            p-1
          "
        >
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `
                rounded-lg
                px-4 py-2
                text-sm font-medium
                transition-all duration-200
                ${
                  isActive
                    ? `
                      bg-violet-500/15
                      text-violet-300
                      shadow-[0_0_15px_rgba(139,92,246,0.08)]
                    `
                    : `
                      text-zinc-500
                      hover:bg-zinc-900
                      hover:text-zinc-200
                    `
                }
              `
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/generate"
            className={({ isActive }) =>
              `
                rounded-lg
                px-4 py-2
                text-sm font-medium
                transition-all duration-200
                ${
                  isActive
                    ? `
                      bg-violet-500/15
                      text-violet-300
                      shadow-[0_0_15px_rgba(139,92,246,0.08)]
                    `
                    : `
                      text-zinc-500
                      hover:bg-zinc-900
                      hover:text-zinc-200
                    `
                }
              `
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

