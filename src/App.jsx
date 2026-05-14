import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReelSelector from './ReelSelector';
import followers from './followers';
import './index.css';

function MinimalConfetti({ style }) {
  return <div className="fixed pointer-events-none rounded-sm" style={style} />;
}

// Elegant, realistic Movie Ticket Modal with Framer Motion
function MovieTicketModal({ winner, onClose }) {
  if (!winner) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 50, opacity: 0, scale: 0.95, rotateX: 10 }}
        animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
        exit={{ y: 20, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="relative flex flex-col md:flex-row w-full max-w-3xl bg-white rounded-lg overflow-hidden shadow-2xl text-slate-900"
        onClick={e => e.stopPropagation()}
        style={{ perspective: 1000 }}
      >
        {/* Left Side: Main Ticket Info */}
        <div className="flex-[2] p-10 border-b-2 md:border-b-0 md:border-r-2 border-dashed border-slate-300 relative bg-white">
          
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none bg-cover bg-center" 
            style={{ backgroundImage: 'url("/movie-poster.jpg")' }}
          ></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-10">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Admit One</p>
                <h2 className="text-4xl font-black tracking-tight text-slate-900">Drishyam 3</h2>
                <p className="text-sm text-slate-500 mt-1 font-medium">Exclusive Ticket Giveaway</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200">
                <i className="fa-solid fa-film text-xl text-slate-400"></i>
              </div>
            </div>

            <div className="mb-10">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Ticket Holder</p>
              <p className="text-2xl font-bold text-slate-900 border-l-4 border-slate-800 pl-4 py-1">
                @{winner}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-10 border-t border-slate-100 pt-6">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Date</p>
                <p className="font-semibold text-slate-800">TBD</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Time</p>
                <p className="font-semibold text-slate-800">TBD</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Seat</p>
                <p className="font-semibold text-slate-800">VIP-{Math.floor(Math.random() * 90) + 10}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Stub & Barcode */}
        <div className="flex-1 p-8 flex flex-col justify-between bg-slate-50 items-center relative z-10">
           
           <img src="/movie-poster.jpg" alt="Drishyam 3" className="w-full h-48 object-cover rounded shadow-sm mb-6" onError={(e) => e.target.style.display='none'} />

           <div className="w-full flex flex-col items-center">
             <p className="text-[10px] text-slate-400 uppercase font-bold mb-3 tracking-widest text-center">Scan at entry</p>
             <div className="flex gap-1 h-10 justify-center w-full">
               {[...Array(28)].map((_, i) => (
                 <div key={i} className="bg-slate-800" style={{ width: `${Math.random() * 3 + 1}px` }}></div>
               ))}
             </div>
             <p className="text-[10px] font-mono mt-3 text-slate-500 tracking-[0.2em]">{Math.random().toString().slice(2, 14)}</p>
           </div>
           
           <button
              onClick={onClose}
              className="mt-8 w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-slate-200"
           >
              Done
           </button>
        </div>

        {/* Cutouts */}
        <div className="absolute -top-4 md:left-[66.66%] -ml-4 w-8 h-8 bg-slate-900/60 rounded-full hidden md:block backdrop-blur-sm z-20"></div>
        <div className="absolute -bottom-4 md:left-[66.66%] -ml-4 w-8 h-8 bg-slate-900/60 rounded-full hidden md:block backdrop-blur-sm z-20"></div>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [pool, setPool] = useState([...followers]);
  const [winners, setWinners] = useState([]);
  const [currentWinner, setCurrentWinner] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [particles, setParticles] = useState([]);
  const selectorRef = useRef(null);

  const triggerConfetti = useCallback(() => {
    const tones = ['#0f172a', '#334155', '#94a3b8', '#cbd5e1', '#e2e8f0'];
    const flakes = Array.from({ length: 60 }, (_, i) => ({
      id: Date.now() + i,
      style: {
        width: `${6 + Math.random() * 6}px`,
        height: `${4 + Math.random() * 8}px`,
        background: tones[Math.floor(Math.random() * tones.length)],
        left: `${Math.random() * 100}vw`,
        top: '-20px',
        animation: `confetti-fall ${2 + Math.random() * 2}s ${Math.random() * 0.3}s cubic-bezier(0.25,1,0.5,1) forwards`,
        zIndex: 100,
      },
    }));
    setParticles(flakes);
    setTimeout(() => setParticles([]), 4000);
  }, []);

  const handleWinnerPicked = useCallback((name, idx) => {
    setCurrentWinner(name);
    setWinners(prev => [name, ...prev]);
    setPool(prev => prev.filter((_, i) => i !== idx));
    setDrawing(false);
    triggerConfetti();
    setTimeout(() => setShowModal(true), 600); // Wait a bit for the selector animation to land
  }, [triggerConfetti]);

  const handleStartDraw = () => {
    if (drawing || pool.length === 0) return;
    setDrawing(true);
    setShowModal(false);
    selectorRef.current?.startSelection();
  };

  const handleResetPool = () => {
    if (drawing) return;
    setPool([...followers]);
    setWinners([]);
    setCurrentWinner(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-slate-200 selection:text-slate-900 overflow-x-hidden">
      
      {particles.map(p => <MinimalConfetti key={p.id} style={p.style} />)}

      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="px-8 py-6 flex justify-between items-center bg-white border-b border-slate-200 relative z-10"
      >
        <div className="flex items-center">
          {/* Logo removed as requested, using sophisticated typography instead */}
          <h1 className="text-xl font-black tracking-tighter text-slate-900">
            Drishyam 3
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-xs uppercase tracking-widest text-slate-400 font-bold hidden sm:block">
            Ticket Giveaway
          </div>
          {winners.length > 0 && (
            <button 
              onClick={handleResetPool} 
              disabled={drawing} 
              className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors disabled:opacity-50"
            >
              Reset
            </button>
          )}
        </div>
      </motion.header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-4xl mx-auto w-full relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8"
        >
           <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
             Select Winner
           </h2>
           <p className="text-slate-500 text-lg font-medium">
             {pool.length} verified participants remaining
           </p>
        </motion.div>

        <ReelSelector ref={selectorRef} pool={pool} onWinner={handleWinnerPicked} />

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={drawing || pool.length === 0}
          onClick={handleStartDraw}
          className="px-12 py-5 bg-slate-900 text-white font-bold text-lg rounded-2xl shadow-xl shadow-slate-200 hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:pointer-events-none flex items-center gap-3"
        >
          {drawing ? (
            <><i className="fa-solid fa-spinner animate-spin"></i> Processing</>
          ) : (
            <><i className="fa-solid fa-ticket"></i> Draw Ticket</>
          )}
        </motion.button>

      </main>

      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="px-8 py-6 border-t border-slate-200 bg-white flex flex-col sm:flex-row justify-between text-xs font-semibold uppercase tracking-widest text-slate-400 items-center gap-4 relative z-10"
      >
        <div>
          Official Ticket Giveaway
        </div>
        <div className="flex items-center gap-2">
           <span>Total Selected: <strong className="text-slate-900">{winners.length}</strong></span>
        </div>
      </motion.footer>

      <AnimatePresence>
        {showModal && <MovieTicketModal winner={currentWinner} onClose={() => setShowModal(false)} />}
      </AnimatePresence>
      
    </div>
  );
}
