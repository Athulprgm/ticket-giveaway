import { useState, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

const ReelSelector = forwardRef(({ pool, onWinner }, ref) => {
  const [displayedName, setDisplayedName] = useState("Standby");
  const [shuffling, setShuffling] = useState(false);
  const [progress, setProgress] = useState(0);
  const [winnerRevealed, setWinnerRevealed] = useState(false);

  const containerControls = useAnimation();

  useImperativeHandle(
    ref,
    () => ({
      startSelection() {
        if (shuffling || pool.length === 0) return;
        setShuffling(true);
        setWinnerRevealed(false);
        setProgress(0);

        const n = pool.length;
        const winnerIdx = Math.floor(Math.random() * n);
        const chosenWinner = pool[winnerIdx];

        // Visual Fairness: Guarantee all participants have equal priority by cycling them all
        const displaySequence = [...pool].sort(() => Math.random() - 0.5);
        let seqIndex = 0;

        const totalDuration = 2500;
        const startTime = performance.now();

        let lastFrameTime = startTime;
        let intervalTime = 16; // 60 FPS ultra-fast text swap speed

        const formatDisplay = (item) => {
          return typeof item === "string"
            ? `@${item}`
            : `${item.username}: ${item.text}`;
        };

        // Add extreme high-tech jitter/blur to container during shuffle
        containerControls.start({
          y: [0, -1, 1, -2, 2, 0],
          x: [0, 1, -1, 1, -1, 0],
          filter: "blur(1.5px)",
          transition: { duration: 0.1, repeat: Infinity, repeatType: "mirror" },
        });

        const updateReel = (now) => {
          const elapsed = now - startTime;
          const currentProgress = Math.min(elapsed / totalDuration, 1);
          setProgress(currentProgress);

          if (elapsed > totalDuration) {
            setDisplayedName(formatDisplay(chosenWinner));
            setShuffling(false);
            setWinnerRevealed(true);

            // Winner reveal massive advanced animation
            containerControls.stop();
            containerControls.start({
              y: 0,
              x: 0,
              filter: "blur(0px)",
              scale: [0.7, 1.15, 1],
              rotateX: [40, -10, 0],
              transition: { duration: 0.8, type: "spring", bounce: 0.6 },
            });

            // Delay modal to admire the winner reveal animation
            setTimeout(() => {
              onWinner(chosenWinner, winnerIdx);
            }, 1200);
            return;
          }

          if (now - lastFrameTime > intervalTime) {
            lastFrameTime = now;

            // Guarantee equal visual priority: cycle through all participants sequentially
            const itemToShow =
              displaySequence[seqIndex % displaySequence.length];
            setDisplayedName(formatDisplay(itemToShow));
            seqIndex++;

            // Fast snappy slow down, keeps it hyper-fast until the very end
            const easeOutExpo =
              currentProgress === 1
                ? 1
                : 1 - Math.pow(2, -10 * currentProgress);
            intervalTime = 16 + Math.pow(easeOutExpo, 8) * 350;
          }

          requestAnimationFrame(updateReel);
        };

        requestAnimationFrame(updateReel);
      },
    }),
    [pool, shuffling, onWinner, containerControls],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex justify-center my-6 relative"
    >
      <div className="relative w-full max-w-2xl bg-white border border-zinc-200 py-24 px-8 flex flex-col items-center overflow-hidden shadow-2xl transition-all duration-700">
        {/* Advanced Geometric Grid Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>

        {/* Minimal Progress Bar */}
        <AnimatePresence>
          {shuffling && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="absolute top-0 left-0 w-full h-1 bg-zinc-100"
            >
              <motion.div
                className="h-full bg-zinc-900"
                style={{ width: `${progress * 100}%` }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <p className="absolute top-6 left-6 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
          Engine{" "}
          <span className="ml-2 text-[8px] bg-zinc-100 text-zinc-500 px-1.5 py-0.5 rounded-sm border border-zinc-200">
            Equal Priority
          </span>
        </p>

        <AnimatePresence>
          {shuffling && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 bg-zinc-50 border border-zinc-200 rounded-full z-10 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 animate-pulse"></span>
              <span className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest">
                Computing
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated scanning line */}
        {shuffling && (
          <motion.div
            animate={{ y: ["-200%", "300%"] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-zinc-200/50 to-transparent z-20 pointer-events-none mix-blend-multiply"
          />
        )}

        {/* Main Text Display Area */}
        <div
          className="relative z-10 flex items-center justify-center min-h-[160px] w-full overflow-hidden"
          style={{ perspective: 1000 }}
        >
          <motion.div
            animate={containerControls}
            className={`text-4xl md:text-5xl lg:text-7xl text-center px-4 select-none break-all relative z-10 ${
              shuffling
                ? "text-zinc-300 font-mono tracking-tighter" // Techy font during shuffle
                : displayedName === "Standby"
                  ? "text-zinc-300 tracking-tight font-light"
                  : "text-zinc-900 tracking-tighter font-black"
            }`}
          >
            {/* The actual text */}
            {displayedName}

            {/* Winner reveal special effects: Text Shockwave */}
            <AnimatePresence>
              {winnerRevealed && (
                <motion.div
                  initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  animate={{ opacity: 0, scale: 2.5, filter: "blur(20px)" }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="absolute inset-0 text-zinc-900 pointer-events-none flex items-center justify-center whitespace-nowrap"
                >
                  {displayedName}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Flashbang glow effect when winner pops */}
            <AnimatePresence>
              {winnerRevealed && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute -inset-10 bg-white z-50 pointer-events-none mix-blend-overlay rounded-full"
                  style={{ filter: "blur(15px)" }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

export default ReelSelector;
