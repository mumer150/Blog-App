import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  NotebookPen,
  NotebookPenIcon,
  Search,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { logout } from "../firebase/authService";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../features/posts/postService";

export default function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [openUser, setOpenUser] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [query, setQuery] = useState("");

  const userRef = useRef(null);
  const inputRef = useRef(null);

  const { data: posts = [] } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const results = query.trim()
    ? posts.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setOpenUser(false);
      navigate("/login");
    },
  });

  // outside click (user only)
  useEffect(() => {
    const handleClick = (e) => {
      if (!userRef.current?.contains(e.target)) {
        setOpenUser(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* LOGO */}
          <Link
            to="/"
            onClick={() => scrollTo(0, 0)}
            className="flex items-center gap-2 group"
          >
            {/* ICON */}
            <div
              className="w-8 h-8 bg-black rounded
    flex items-center justify-center
    transition-all duration-300
    group-hover:bg-orange-700
    group-hover:rotate-6
    group-hover:scale-105"
            >
              <NotebookPen size={18} className="text-white" />
            </div>

            {/* TEXT */}
            <div className="flex items-center gap-2">
              <span
                className="
      font-semibold text-lg text-gray-900
      transition-all duration-300
      group-hover:text-orange-700
      group-hover:translate-x-0.5
    "
              >
                BlogWeb
              </span>

              {/* DOT */}
              <div
                className="
      w-[6px] h-[6px] rounded-full bg-orange-700
      transition-all duration-300
      group-hover:scale-125
      group-hover:shadow-[0_0_10px_rgba(234,88,12,0.6)]
    "
              />
            </div>
          </Link>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            {/* WRITE BLOG (ONLY LOGGED IN) */}
            {user && (
              <Link
                to="/write-blog"
                className="flex items-center gap-1 mr-2 text-sm font-medium hover:text-orange-700 transition"
              >
                <NotebookPenIcon color="#CA3500" size={18} />
                Write
              </Link>
            )}

            {/* USER */}
            <div ref={userRef} className="relative">
              {/* TRIGGER */}
              {user ? (
                <button
                  onClick={() => setOpenUser((p) => !p)}
                  className="
        flex items-center gap-2
        px-2 py-1 rounded-full
        hover:bg-gray-100 transition
      "
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <UserRound size={18} />
                  </div>

                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      openUser ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-gray-100 transition"
                >
                  <UserRound size={18} />
                </button>
              )}

              {/* DROPDOWN */}
              {openUser && (
                <div
                  className="
        absolute right-0 mt-3
        w-64
        bg-white
        border border-gray-200
        rounded-2xl
        shadow-[0_10px_30px_rgba(0,0,0,0.08)]
        overflow-hidden
      "
                >
                  {/* HEADER */}
                  <div className="px-4 py-3 border-b bg-gray-50">
                    <p className="text-xs text-gray-400">Account</p>
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {user?.email}
                    </p>
                  </div>

                  {/* MENU */}
                  <div className="p-1">
                    <button
                      onClick={() => {
                        navigate("/my-blogs");
                        setOpenUser(false);
                      }}
                      className="
            w-full flex items-center justify-between
            px-3 py-2 rounded-lg
            text-sm text-gray-700
            hover:bg-gray-100
            transition
          "
                    >
                      <span>My Blogs</span>
                      <span className="text-gray-300">›</span>
                    </button>

                    <button
                      onClick={() => {
                        logoutMutation.mutate();
                        setOpenUser(false);
                      }}
                      className="
            w-full flex items-center justify-between
            px-3 py-2 rounded-lg
            text-sm text-red-500
            hover:bg-red-50
            transition
          "
                    >
                      <span>Logout</span>
                      <span className="text-red-300">↗</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ================= FLOATING SEARCH BUTTON ================= */}
      <button
        onClick={() => setFabOpen(true)}
        className="fixed bottom-5 right-5 w-12 h-12 bg-[#CA3500] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition z-50"
      >
        <Search size={18} />
      </button>

      {fabOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center"
          onMouseDown={() => setFabOpen(false)}
        >
          <div
            className="w-full sm:w-[420px] bg-white rounded-t-2xl sm:rounded-2xl shadow-xl p-4"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* INPUT */}
            <input
              ref={inputRef}
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-full px-3 py-2 border rounded-lg text-sm outline-none"
            />

            {/* RESULTS */}
            <div className="mt-3 max-h-80 overflow-y-auto overflow-x-hidden ">
              {results.length > 0 ? (
                results.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => {
                      setFabOpen(false);
                      setQuery("");
                      navigate(`/posts/${post.id}`);
                      window.scrollTo(0, 0);
                    }}
                    className="flex items-center gap-3 px-2 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                  >
                    <img
                      src={post.image}
                      className="w-10 h-10 rounded object-cover"
                    />

                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-medium truncate hover:text-red-500">
                        {post.title}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {post.category}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-6">
                  No results found
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
