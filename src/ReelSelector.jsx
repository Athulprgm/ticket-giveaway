import { useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ReelSelector = forwardRef(({ pool, onWinner }, ref) => {
  const [displayedName, setDisplayedName] = useState('Standby');
  const [shuffling, setShuffling] = useState(false);

  useImperativeHandle(ref, () => ({
    startSelection() {
      if (shuffling || pool.length === 0) return;
      setShuffling(true);

      const n = pool.length;
      const winnerIdx = Math.floor(Math.random() * n);
      const chosenWinner = pool[winnerIdx];

      const totalDuration = 3500;
      const startTime = performance.now();

      let intervalTime = 50;
      let lastFrameTime = startTime;

      const updateReel = (now) => {
        const elapsed = now - startTime;
        
        if (elapsed > totalDuration) {
          setDisplayedName(`@${chosenWinner}`);
          setShuffling(false);
          onWinner(chosenWinner, winnerIdx);
          return;
        }

        if (now - lastFrameTime > intervalTime) {
          lastFrameTime = now;
          const randomHandle = pool[Math.floor(Math.random() * n)];
          setDisplayedName(`@${randomHandle}`);

          const progress = elapsed / totalDuration;
          intervalTime = 50 + Math.pow(progress, 3) * 200;
        }

        requestAnimationFrame(updateReel);
      };

      requestAnimationFrame(updateReel);
    }
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full flex justify-center my-8"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-sm border border-slate-200 py-20 px-8 flex flex-col items-center overflow-hidden">
        
        <p className="absolute top-8 left-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
          Selector Engine
        </p>
        
        <AnimatePresence>
          {shuffling && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-8 right-8 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Processing</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10 flex items-center justify-center min-h-[120px] w-full overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div 
              key={displayedName}
              initial={{ opacity: 0, y: shuffling ? 40 : 0, scale: shuffling ? 0.95 : 1 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: shuffling ? -40 : 0, scale: shuffling ? 0.95 : 1 }}
              transition={{ duration: shuffling ? 0.15 : 0.4, ease: "easeOut" }}
              className={`text-4xl md:text-5xl lg:text-6xl font-black text-center px-4 select-none break-all ${
                shuffling 
                  ? 'text-slate-400' 
                  : displayedName === 'Standby' 
                  ? 'text-slate-300 font-medium tracking-tight' 
                  : 'text-slate-900 tracking-tight'
              }`}
            >
              {displayedName}
            </motion.div>
          </AnimatePresence>
        </div>
        
      </div>
    </motion.div>
  );
});

export default ReelSelector;
