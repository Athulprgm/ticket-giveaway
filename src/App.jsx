import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReelSelector from "./ReelSelector";
import AnnouncementView from "./AnnouncementView";
import followers from "./followers";
import comments from "./comments";
import "./index.css";

function MinimalConfetti({ style }) {
  return <div className="fixed pointer-events-none rounded-sm" style={style} />;
}

// Minimalist Movie Ticket Modal
function MovieTicketModal({ winner, onClose }) {
  if (!winner) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{
          y: 50,
          opacity: 0,
          scale: 0.9,
          rotateX: 20,
          filter: "blur(10px)",
        }}
        animate={{
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          filter: "blur(0px)",
        }}
        exit={{
          y: 20,
          opacity: 0,
          scale: 0.9,
          rotateX: -10,
          filter: "blur(10px)",
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col md:flex-row w-full max-w-3xl bg-white border border-zinc-200 shadow-2xl text-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Main Ticket Info */}
        <div className="flex-[2] p-10 border-b md:border-b-0 md:border-r border-dashed border-zinc-300 relative bg-white">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-10">
              <div>
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1">
                  Exclusive Pass
                </p>
                <h2 className="text-4xl font-black tracking-tight text-zinc-900">
                  Drishyam 3
                </h2>
                <p className="text-sm text-zinc-500 mt-1 font-medium">
                  Trawbit Giveaway Winner
                </p>
              </div>
              <div className="w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center bg-zinc-50 overflow-hidden p-2.5 shadow-sm">
                <img
                  src="/Untitled-2-01.png"
                  alt="Trawbit"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="mb-6 mt-12">
              <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold mb-2">
                Verified Winner
              </p>
              <p className="text-xl md:text-2xl font-bold text-zinc-900 break-words">
                {typeof winner === "string"
                  ? `@${winner}`
                  : `${winner.username}: ${winner.text}`}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Stub */}
        <div className="flex-1 p-8 flex flex-col justify-between bg-zinc-50 items-center relative z-10">
          <div className="w-full h-40 bg-zinc-200 mb-6 flex items-center justify-center overflow-hidden border border-zinc-300">
            <img
              src="/movie-poster.jpg"
              alt="Drishyam 3"
              className="w-full h-full object-cover grayscale opacity-90"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>

          <button
            onClick={onClose}
            className="mt-auto w-full py-3.5 bg-zinc-900 hover:bg-black text-white text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-zinc-900/50"
          >
            Claim Ticket
          </button>
        </div>

        {/* Cutouts */}
        <div className="absolute -top-4 md:left-[66.66%] -ml-4 w-8 h-8 bg-white/90 border-b border-zinc-200 rounded-full hidden md:block z-20"></div>
        <div className="absolute -bottom-4 md:left-[66.66%] -ml-4 w-8 h-8 bg-white/90 border-t border-zinc-200 rounded-full hidden md:block z-20"></div>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [view, setView] = useState(() => {
    const hash = window.location.hash;
    if (hash === "#admin") return "picker";
    if (hash === "#follower") return "follower-announcement";
    if (hash === "#comment") return "comment-announcement";
    return "home";
  });
  const [mode, setMode] = useState("followers");
  const [pool, setPool] = useState([...followers]);
  const [winners, setWinners] = useState([]);
  const [currentWinner, setCurrentWinner] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [particles, setParticles] = useState([]);
  const selectorRef = useRef(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleModeChange = (newMode) => {
    if (drawing) return;
    setMode(newMode);
    setWinners([]);
    setCurrentWinner(null);
    setPool(newMode === "followers" ? [...followers] : [...comments]);
  };

  const triggerConfetti = useCallback(() => {
    const tones = ["#18181b", "#27272a", "#3f3f46", "#52525b", "#71717a"];
    const flakes = Array.from({ length: 80 }, (_, i) => ({
      id: Date.now() + i,
      style: {
        width: `${4 + Math.random() * 6}px`,
        height: `${4 + Math.random() * 6}px`,
        background: tones[Math.floor(Math.random() * tones.length)],
        left: `${Math.random() * 100}vw`,
        top: "-20px",
        animation: `confetti-fall ${2 + Math.random() * 2}s ${Math.random() * 0.3}s cubic-bezier(0.25,1,0.5,1) forwards`,
        zIndex: 100,
        borderRadius: Math.random() > 0.5 ? "50%" : "0",
      },
    }));
    setParticles(flakes);
    setTimeout(() => setParticles([]), 4000);
  }, []);

  const handleWinnerPicked = useCallback(
    (name, idx) => {
      setCurrentWinner(name);
      setWinners((prev) => [name, ...prev]);
      setPool((prev) => prev.filter((_, i) => i !== idx));
      setDrawing(false);
      triggerConfetti();
      setTimeout(() => setShowModal(true), 600);
    },
    [triggerConfetti],
  );

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#admin") setView("picker");
      else if (hash === "#follower") setView("follower-announcement");
      else if (hash === "#comment") setView("comment-announcement");
      else setView("home");
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleStartDraw = () => {
    if (drawing || pool.length === 0) return;
    setDrawing(true);
    setShowModal(false);
    selectorRef.current?.startSelection();
  };

  const handleResetPool = () => {
    if (drawing) return;
    setPool(mode === "followers" ? [...followers] : [...comments]);
    setWinners([]);
    setCurrentWinner(null);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-zinc-200 overflow-x-hidden relative">
      {particles.map((p) => (
        <MinimalConfetti key={p.id} style={p.style} />
      ))}

      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="px-8 py-6 flex justify-between items-center border-b border-zinc-100 bg-white/80 backdrop-blur-md relative z-10"
      >
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold tracking-tight text-zinc-900">
            TRAWBIT <span className="font-light">GIVEAWAY</span>
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold hidden md:block">
            Drishyam 3
          </div>
          {winners.length > 0 && view === "picker" && (
            <button
              onClick={handleResetPool}
              disabled={drawing}
              className="text-xs font-medium text-zinc-400 hover:text-zinc-900 transition-colors disabled:opacity-50"
            >
              Reset
            </button>
          )}
        </div>
      </motion.header>

      {view === "follower-announcement" || view === "comment-announcement" ? (
        <AnnouncementView type={view === "follower-announcement" ? "follower" : "comment"} />
      ) : view === "home" ? (
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <img src="/Untitled-2-01.png" alt="Trawbit Technologies" className="h-10 opacity-30 grayscale" />
        </main>
      ) : !isAuthenticated ? (
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-sm mx-auto w-full relative z-10">
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleLogin}
            className="w-full bg-white p-8 border border-zinc-200 flex flex-col gap-6"
          >
            <div className="text-center mb-2 flex flex-col items-center">
              <img
                src="/Untitled-2-01.png"
                alt="Trawbit"
                className="h-8 mb-6 opacity-60 grayscale"
              />
              <h2 className="text-xl font-semibold text-zinc-900 tracking-tight">
                Admin Access
              </h2>
              <p className="text-zinc-500 text-sm mt-1">Please authenticate</p>
            </div>

            {loginError && (
              <div className="bg-red-50 text-red-600 text-xs px-4 py-3 border border-red-100 text-center font-medium">
                Invalid credentials
              </div>
            )}

            <div>
              <label className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2 block">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 text-zinc-900 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all placeholder:text-zinc-400 text-sm"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2 block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 text-zinc-900 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all placeholder:text-zinc-400 text-sm"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-3.5 bg-zinc-900 hover:bg-black text-white font-medium text-sm transition-all"
            >
              Login
            </button>
          </motion.form>
        </main>
      ) : (
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-4xl mx-auto w-full relative z-10">
          <img
            src="/Untitled-2-01.png"
            alt="Trawbit"
            className="h-10 mb-10 opacity-30 grayscale"
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-zinc-900 mb-6">
              Select <span className="font-semibold">Winner</span>
            </h2>

            <div className="flex justify-center gap-3 mb-8">
              <button
                onClick={() => handleModeChange("followers")}
                className={`px-6 py-2.5 text-sm font-medium transition-all ${mode === "followers" ? "bg-zinc-900 text-white" : "bg-white text-zinc-500 border border-zinc-200 hover:text-zinc-900 hover:border-zinc-300"}`}
              >
                Follower Picker
              </button>
              <button
                onClick={() => handleModeChange("comments")}
                className={`px-6 py-2.5 text-sm font-medium transition-all ${mode === "comments" ? "bg-zinc-900 text-white" : "bg-white text-zinc-500 border border-zinc-200 hover:text-zinc-900 hover:border-zinc-300"}`}
              >
                Comment Picker
              </button>
            </div>

            <p className="text-zinc-500 text-sm font-medium">
              {pool.length} verified{" "}
              {mode === "followers" ? "participants" : "comments"} remaining
            </p>
          </motion.div>

          <ReelSelector
            ref={selectorRef}
            pool={pool}
            onWinner={handleWinnerPicked}
          />

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={drawing || pool.length === 0}
            onClick={handleStartDraw}
            className="mt-10 px-12 py-4 bg-zinc-900 text-white font-medium text-lg border border-zinc-900 hover:bg-white hover:text-zinc-900 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center gap-3"
          >
            {drawing ? (
              <>
                <i className="fa-solid fa-spinner animate-spin"></i> Processing
              </>
            ) : (
              <>Draw Ticket</>
            )}
          </motion.button>
        </main>
      )}

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="px-8 py-6 border-t border-zinc-100 flex flex-col sm:flex-row justify-between text-[10px] font-semibold uppercase tracking-widest text-zinc-400 items-center gap-4 relative z-10"
      >
        <div>
          Powered by <span className="text-zinc-900">Trawbit Technologies</span>
        </div>
        <div className="flex items-center gap-2">
          <span>
            Total Selected:{" "}
            <strong className="text-zinc-900">{winners.length}</strong>
          </span>
        </div>
      </motion.footer>

      <AnimatePresence>
        {showModal && (
          <MovieTicketModal
            winner={currentWinner}
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
