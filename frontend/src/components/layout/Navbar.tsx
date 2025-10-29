import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { useToast } from "../../providers/ToastProvider";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold text-gray-900">IA03</Link>
          <nav className="flex items-center gap-2 sm:gap-3 text-sm relative">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md border ${isActive ? "border-gray-300 bg-gray-50 text-gray-900" : "border-transparent text-gray-700 hover:bg-gray-50 hover:text-gray-900"}`
              }
            >
              Home
            </NavLink>
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-md ${isActive ? "text-gray-900 bg-gray-50 border border-gray-300" : "text-gray-700 hover:text-gray-900 hover:bg-gray-50 border border-transparent"}`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-md text-white ${isActive ? "bg-indigo-700" : "bg-indigo-600 hover:bg-indigo-700"}`
                  }
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <div className="relative" ref={menuRef}>
                <button onClick={() => setOpen((v) => !v)} className="px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                  {user.email}
                </button>
                {open && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <button
                      onClick={() => { logout(); setOpen(false); navigate("/login"); showToast("Logged out", "info"); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}


