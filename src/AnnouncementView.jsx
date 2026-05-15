import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import followers from "./followers";
import comments from "./comments";

// Predefined credentials for the winners
const CREDENTIALS = {
  follower: { user: "trawbit_follower", pass: "cm@0014589" },
  comment: { user: "trawbit_comment", pass: "cm@09783453" },
};

// Manually update these after the random winner is selected
const MANUAL_WINNERS = {
  follower: "Follower_Winner_Name", // <--- UPDATE THIS AFTER SELECTION
  comment: "Comment_Winner_Name", // <--- UPDATE THIS AFTER SELECTION
};

const MANUAL_CODES = {
  follower: "TRWB400", // <--- UPDATE THIS WITH REAL VOUCHER CODE
  comment: "TRWB400", // <--- UPDATE THIS WITH REAL VOUCHER CODE
};

const VoucherCard = ({ winnerName, code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cutoutBg = "bg-[#f8fafc]";

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      className="relative bg-gradient-to-br from-[#020B3D] to-[#051352] text-white rounded-3xl w-full max-w-3xl mx-auto overflow-hidden shadow-2xl border border-[#C7E23A]/20"
    >
      {/* Premium background effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_0%,_rgba(199,226,58,0.15),_transparent_50%)] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_100%,_rgba(199,226,58,0.05),_transparent_50%)] pointer-events-none"></div>

      <div className="absolute -bottom-10 -left-10 opacity-[0.04] pointer-events-none grayscale scale-110">
        <img src="/trawbit-logo.png" alt="" className="w-64" />
      </div>

      <div className="flex flex-col md:flex-row relative z-10">
        {/* Left Section */}
        <div className="w-full md:w-[70%] p-6 md:p-10 flex flex-col justify-between">
          <div className="mb-8 md:mb-10">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/trawbit-logo.png"
                alt="Trawbit Technologies"
                className="h-4 md:h-5 object-contain brightness-0 invert"
              />
            </div>

            <h1
              className="text-2xl md:text-4xl lg:text-5xl font-semibold text-[#C7E23A] tracking-[0.15em] md:tracking-[0.2em] uppercase leading-tight mb-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              GIFT VOUCHER
            </h1>
            <p className="text-sm md:text-lg text-white/70">
              BookMyShow Entertainment Pass
            </p>
          </div>

          <div className="w-16 h-[1px] bg-[#C7E23A]/30 mb-6"></div>

          <div>
            <p className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest mb-1">
              Presented to
            </p>
            <p className="text-xl md:text-3xl font-medium text-white tracking-tight">
              {winnerName}
            </p>
          </div>
        </div>

        {/* Desktop Divider */}
        <div className="hidden md:flex flex-col justify-center items-center relative w-0">
          <div
            className={`absolute top-[-20px] left-[-16px] w-8 h-8 ${cutoutBg} rounded-full z-20 shadow-inner border border-[#C7E23A]/10`}
          ></div>
          <div className="w-[1px] h-full border-l-[2px] border-dashed border-white/20 absolute left-[-0.5px]"></div>
          <div
            className={`absolute bottom-[-20px] left-[-16px] w-8 h-8 ${cutoutBg} rounded-full z-20 shadow-inner border border-[#C7E23A]/10`}
          ></div>
        </div>

        {/* Mobile Divider */}
        <div className="flex md:hidden w-full items-center justify-center relative h-0">
          <div
            className={`absolute left-[-20px] top-[-16px] w-8 h-8 ${cutoutBg} rounded-full z-20 shadow-inner border border-[#C7E23A]/10`}
          ></div>
          <div className="w-full border-t-[2px] border-dashed border-white/20 absolute top-[-0.5px]"></div>
          <div
            className={`absolute right-[-20px] top-[-16px] w-8 h-8 ${cutoutBg} rounded-full z-20 shadow-inner border border-[#C7E23A]/10`}
          ></div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[30%] p-6 md:p-8 flex flex-col justify-center items-center md:items-end text-right relative bg-black/10">
          <div className="mb-6 w-full">
            <h2 className="text-4xl md:text-6xl font-bold text-[#C7E23A] leading-none mb-1 text-center md:text-right">
              <span className="text-2xl md:text-3xl align-top mr-1">₹</span>400
            </h2>
            <p className="text-[10px] md:text-xs text-white/60 tracking-widest uppercase text-center md:text-right">
              Value
            </p>
          </div>

          <div className="w-full flex flex-col items-center md:items-end">
            <div className="border border-[#C7E23A]/30 px-4 py-2 md:py-3 rounded md:rounded-md mb-4 w-full text-center bg-black/30 backdrop-blur-sm">
              <span className="font-mono text-base md:text-xl tracking-widest text-white select-all">
                {code}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="text-[10px] font-bold bg-[#C7E23A] text-[#020B3D] hover:bg-[#9FBF2E] px-5 py-2.5 rounded uppercase tracking-widest transition-all active:scale-95 w-full shadow-lg shadow-[#C7E23A]/10"
            >
              {copied ? "COPIED TO CLIPBOARD" : "COPY CODE"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ClaimFlow = ({
  type,
  winnerName,
  expectedUsername,
  expectedPassword,
  commentText,
  voucherCode,
  onSuccess,
}) => {
  const [step, setStep] = useState("idle");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      username.trim() === expectedUsername &&
      password.trim() === expectedPassword
    ) {
      setError("");
      onSuccess({ name: winnerName, code: voucherCode });
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex-1 w-full min-h-[350px] bg-white p-8 border border-zinc-200 flex flex-col items-center justify-center relative hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden">
      <AnimatePresence mode="wait">
        {step === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col items-center h-full w-full justify-center text-center"
          >
            <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-6">
              {type === "follower" ? "Follower Winner" : "Comment Winner"}
            </p>
            <p className="text-3xl md:text-4xl font-light text-zinc-900 tracking-tight mb-4 break-all">
              @{winnerName}
            </p>
            {type === "comment" && commentText && (
              <p className="text-sm text-zinc-500 font-light italic max-w-xs leading-relaxed mb-6">
                "{commentText}"
              </p>
            )}
            <button
              onClick={() => setStep("login")}
              className="mt-6 bg-[#020B3D] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#041154] transition-colors shadow-lg shadow-[#020B3D]/20 active:scale-95"
            >
              Claim Voucher
            </button>
          </motion.div>
        )}

        {step === "login" && (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col items-center w-full max-w-xs"
          >
            <p className="text-lg font-semibold text-zinc-900 mb-6">
              Claim Your Voucher
            </p>

            <form onSubmit={handleLogin} className="w-full flex flex-col gap-3">
              <div>
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm outline-none focus:border-[#020B3D] focus:bg-white transition-all font-medium"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm outline-none focus:border-[#020B3D] focus:bg-white transition-all font-medium"
                />
              </div>
              {error && (
                <p className="text-red-500 text-xs font-medium text-center mt-1">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="bg-[#C7E23A] text-[#020B3D] font-bold px-4 py-3 rounded-lg text-sm hover:bg-[#9FBF2E] transition-colors w-full mt-2 shadow-lg shadow-[#C7E23A]/20 active:scale-95"
              >
                Reveal Voucher Code
              </button>
            </form>
            <button
              onClick={() => setStep("idle")}
              className="mt-4 text-xs text-zinc-400 hover:text-zinc-600 font-medium transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RedemptionPage = ({ winnerData, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 z-[100] bg-[#f8fafc] overflow-y-auto w-full h-full"
    >
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <img src="/trawbit-logo.png" alt="Trawbit" className="h-8" />
        </div>

        {/* Voucher Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-light text-zinc-900 mb-2">
            Congratulations, {winnerData.name}!
          </h2>
          <p className="text-zinc-500 mb-10">
            Here is your official BookMyShow Entertainment Pass.
          </p>
          <VoucherCard winnerName={winnerData.name} code={winnerData.code} />
        </div>

        {/* Tutorial Section */}
        <div className="border-t border-zinc-200 pt-16 mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="text-3xl font-semibold text-zinc-900 mb-4">
              How to Redeem Your Voucher
            </h3>
            <p className="text-zinc-600 text-lg">
              ബുക്ക്മൈഷോയിൽ ഈ വൗച്ചർ എങ്ങനെ ഉപയോഗിക്കാം
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center bg-zinc-50 rounded-3xl p-5 border border-zinc-100 shadow-sm">
              <img
                src="/step1_mockup.jpg"
                alt="Step 1: Select Seats"
                className="w-full max-w-[260px] h-auto object-contain drop-shadow-xl rounded-[2rem] mb-8"
              />
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="bg-[#020B3D] text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                  1
                </div>
                <h4 className="text-lg font-semibold text-zinc-900">
                  Select Your Seats
                </h4>
              </div>
              <p className="text-sm text-zinc-600 mb-2 leading-relaxed">
                Choose your movie and select your preferred seats.
              </p>
              <p className="text-sm text-[#020B3D] font-medium leading-relaxed">
                സിനിമയും സീറ്റുകളും തിരഞ്ഞെടുക്കുക.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center bg-zinc-50 rounded-3xl p-5 border border-zinc-100 shadow-sm">
              <img
                src="/step2_mockup.jpg"
                alt="Step 2: Confirm Booking"
                className="w-full max-w-[260px] h-auto object-contain drop-shadow-xl rounded-[2rem] mb-8"
              />
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="bg-[#020B3D] text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                  2
                </div>
                <h4 className="text-lg font-semibold text-zinc-900">
                  Confirm Booking
                </h4>
              </div>
              <p className="text-sm text-zinc-600 mb-2 leading-relaxed">
                Review your details and proceed to the payment page.
              </p>
              <p className="text-sm text-[#020B3D] font-medium leading-relaxed">
                വിവരങ്ങൾ പരിശോധിച്ച് പേയ്‌മെൻ്റിലേക്ക് പോവുക.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center bg-zinc-50 rounded-3xl p-5 border border-zinc-100 shadow-sm">
              <img
                src="/step3_mockup.jpg"
                alt="Step 3: Select Gift Voucher"
                className="w-full max-w-[260px] h-auto object-contain drop-shadow-xl rounded-[2rem] mb-8"
              />
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="bg-[#020B3D] text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                  3
                </div>
                <h4 className="text-lg font-semibold text-zinc-900">
                  Select Gift Voucher
                </h4>
              </div>
              <p className="text-sm text-zinc-600 mb-2 leading-relaxed">
                On the payment screen, select "Gift Voucher" from other options.
              </p>
              <p className="text-sm text-[#020B3D] font-medium leading-relaxed">
                പേയ്‌മെന്റ് ഓപ്ഷനുകളിൽ നിന്ന് "Gift Voucher" തിരഞ്ഞെടുക്കുക.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center bg-zinc-50 rounded-3xl p-5 border border-zinc-100 shadow-sm">
              <img
                src="/step4_mockup.jpg"
                alt="Step 4: Enter Code"
                className="w-full max-w-[260px] h-auto object-contain drop-shadow-xl rounded-[2rem] mb-8"
              />
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="bg-[#020B3D] text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                  4
                </div>
                <h4 className="text-lg font-semibold text-zinc-900">
                  Enter Code
                </h4>
              </div>
              <p className="text-sm text-zinc-600 mb-2 leading-relaxed">
                Paste your copied code and click Apply to redeem your ticket.
              </p>
              <p className="text-sm text-[#020B3D] font-medium leading-relaxed">
                കോപ്പി ചെയ്ത കോഡ് നൽകി Apply ക്ലിക്ക് ചെയ്യുക.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function AnnouncementView({ type }) {
  const [followerWinner, setFollowerWinner] = useState(null);
  const [commentWinner, setCommentWinner] = useState(null);

  // New state to manage navigation to the redemption page
  const [loggedInWinner, setLoggedInWinner] = useState(null);

  useEffect(() => {
    // Pick random initial data to populate the comment text UI
    const fw = followers[Math.floor(Math.random() * followers.length)];
    const cw = comments[Math.floor(Math.random() * comments.length)];
    setFollowerWinner(fw);
    setCommentWinner(cw);
  }, []);

  // If a user successfully logs in, show the dedicated redemption page
  if (loggedInWinner) {
    return (
      <RedemptionPage
        winnerData={loggedInWinner}
        onBack={() => setLoggedInWinner(null)}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full px-6 py-12 relative z-10 bg-white">
      <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-zinc-900 mb-12 text-center">
        Official <span className="font-semibold">Announcement</span>
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(20px)", scale: 0.95 }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row gap-6 w-full max-w-md mx-auto"
      >
        {type === "follower" && (
          <ClaimFlow
            type="follower"
            winnerName={MANUAL_WINNERS.follower}
            expectedUsername={CREDENTIALS.follower.user}
            expectedPassword={CREDENTIALS.follower.pass}
            voucherCode={MANUAL_CODES.follower}
            onSuccess={setLoggedInWinner}
          />
        )}
        {type === "comment" && (
          <ClaimFlow
            type="comment"
            winnerName={MANUAL_WINNERS.comment}
            expectedUsername={CREDENTIALS.comment.user}
            expectedPassword={CREDENTIALS.comment.pass}
            commentText={commentWinner?.text}
            voucherCode={MANUAL_CODES.comment}
            onSuccess={setLoggedInWinner}
          />
        )}
      </motion.div>
    </div>
  );
}
