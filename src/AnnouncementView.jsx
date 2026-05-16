import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gift,
  Popcorn,
  Ticket,
  Armchair,
  Clapperboard,
  Sparkles,
} from "lucide-react";
import Footer from "./Footer";
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
  comment: "Sruthi Santhosh", // <--- UPDATE THIS AFTER SELECTION
};

const MANUAL_CODES = {
  follower: "TRWB400", // <--- UPDATE THIS WITH REAL VOUCHER CODE
  comment: "8W94YNC7QQ", // <--- UPDATE THIS WITH REAL VOUCHER CODE
};

const RedemptionPage = ({ winnerData, onBack }) => {
  const [copied, setCopied] = useState(false);
  const voucherCode = winnerData.code;

  const handleCopy = () => {
    navigator.clipboard.writeText(voucherCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#F3F3EF] flex flex-col items-center pt-12 md:pt-20 overflow-x-hidden relative selection:bg-[#C6DB2A] selection:text-[#050B2B]">
      {/* Ambient Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#C6DB2A]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#7A0000]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.button
        onClick={onBack}
        className="absolute top-6 left-6 md:top-10 md:left-10 z-50 text-black/40 hover:text-[#050B2B] font-black uppercase tracking-widest text-xs md:text-sm transition-colors bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-black/5"
      >
        &larr; Back
      </motion.button>

      {/* Main Voucher */}
      <div className="w-full max-w-5xl px-4 md:px-10 mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative w-full max-w-5xl rounded-[38px] overflow-hidden bg-white border border-black/5 shadow-[0_20px_80px_rgba(0,0,0,0.12)] mt-12 md:mt-0 flex flex-col lg:flex-row lg:items-stretch"
      >
        {/* Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(198,219,42,0.12),transparent_35%)]"></div>

        <div className="flex flex-col lg:flex-row w-full relative z-10 lg:items-stretch">
          {/* LEFT SECTION */}
          <div className="relative flex-1 bg-[#FAFAF7] overflow-hidden">
            {/* Ticket Cut */}
            <div className="hidden lg:block absolute top-1/2 -right-5 -translate-y-1/2 w-10 h-10 rounded-full bg-[#F3F3EF] z-20"></div>

            {/* Decorative Dots */}
            <div className="absolute left-0 top-20 opacity-20">
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 70 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#C6DB2A]"
                  ></div>
                ))}
              </div>
            </div>

            {/* Floating Icons */}
            <div className="absolute left-10 bottom-48 opacity-[0.08]">
              <Clapperboard size={110} strokeWidth={1} />
            </div>

            <div className="absolute left-52 bottom-20 opacity-[0.08]">
              <Popcorn size={100} strokeWidth={1} />
            </div>

            <div className="absolute right-56 bottom-20 opacity-[0.08]">
              <Armchair size={100} strokeWidth={1} />
            </div>

            <div className="absolute right-20 top-44 opacity-[0.08]">
              <Sparkles size={80} strokeWidth={1} />
            </div>

            <div className="relative z-10 px-8 md:px-10 pt-10 lg:pt-14 pb-32 lg:pb-36 h-full flex flex-col justify-center">
              {/* HEADER */}
              <div className="flex flex-wrap items-center justify-between lg:justify-start gap-3 lg:gap-6 w-full">
                <div className="flex items-center">
                  <img
                    src="/Untitled-2-01.png"
                    alt="Trawbit"
                    className="h-10 lg:h-28 object-contain brightness-0 opacity-90 scale-[1.3] lg:scale-[1.4] origin-left ml-2 lg:ml-4"
                  />
                </div>

                <div className="text-lg lg:text-2xl text-black/30 font-light">×</div>

                <div className="flex items-center">
                  <img
                    src="/bms-logo.png"
                    alt="BookMyShow"
                    className="h-5 lg:h-8 object-contain brightness-0 opacity-90"
                  />
                </div>
              </div>

              {/* TITLE */}
              <div className="mt-8 lg:mt-10 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="leading-[0.95]"
                >
                  <span className="block text-[#050B2B] text-[40px] lg:text-[60px] font-black tracking-[-0.05em]">
                    TICKET
                  </span>

                  <span className="block text-[#C6DB2A] text-[40px] lg:text-[60px] font-black tracking-[-0.05em]">
                    GIVEAWAY
                  </span>
                </motion.h1>

                {/* Divider */}
                <div className="flex items-center justify-center lg:justify-start gap-4 mt-6 w-full lg:w-auto">
                  <div className="h-[2px] w-12 lg:w-24 bg-[#C6DB2A]/30"></div>
                  <div className="w-3 h-3 rounded-full bg-[#C6DB2A] shadow-[0_0_15px_rgba(198,219,42,0.4)]"></div>
                  <div className="h-[2px] w-24 lg:w-48 bg-[#C6DB2A]/30"></div>
                </div>

                {/* Subtitle */}
                <p className="mt-4 text-[#050B2B] text-[10px] lg:text-base tracking-[0.2em] uppercase font-bold text-center lg:text-left w-full">
                  Enjoy Movies. Create Memories.
                </p>
                <div className="mt-6 flex flex-col items-center lg:items-start gap-3 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-center lg:justify-start gap-2 sm:gap-4 w-full lg:w-auto">
                    <p className="text-[10px] lg:text-xs font-bold text-black/40 uppercase tracking-widest text-center lg:text-left">
                      Presented To:
                    </p>
                    <p className="text-base lg:text-xl font-black text-[#050B2B] tracking-wide bg-[#C6DB2A]/20 px-4 py-1.5 rounded-xl border border-[#C6DB2A]/30 text-center inline-block">
                      {winnerData.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Features Strip */}
            <div className="absolute bottom-0 left-0 w-full bg-[#C6DB2A] px-4 lg:px-10 py-3 lg:py-6 flex items-center min-h-[60px] lg:h-[85px]">
              <div className="flex justify-between items-center w-full gap-2 lg:gap-8">
                {/* ITEM */}
                <div className="flex items-center gap-2 lg:gap-4">
                  <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-white/30 backdrop-blur-md flex items-center justify-center shrink-0">
                    <Ticket className="w-4 h-4 lg:w-6 lg:h-6 text-[#050B2B]" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-[#050B2B] font-black uppercase text-[8px] lg:text-base leading-tight">Your Ticket</h3>
                    <p className="text-[#050B2B]/80 uppercase tracking-wide text-[6px] lg:text-xs hidden sm:block">To Entertainment</p>
                  </div>
                </div>

                {/* ITEM */}
                <div className="flex items-center gap-2 lg:gap-4">
                  <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-white/30 backdrop-blur-md flex items-center justify-center shrink-0">
                    <Popcorn className="w-4 h-4 lg:w-6 lg:h-6 text-[#050B2B]" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-[#050B2B] font-black uppercase text-[8px] lg:text-base leading-tight">Movies. Events.</h3>
                    <p className="text-[#050B2B]/80 uppercase tracking-wide text-[6px] lg:text-xs hidden sm:block">Experiences.</p>
                  </div>
                </div>

                {/* ITEM */}
                <div className="flex items-center gap-2 lg:gap-4">
                  <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-white/30 backdrop-blur-md flex items-center justify-center shrink-0">
                    <Armchair className="w-4 h-4 lg:w-6 lg:h-6 text-[#050B2B]" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-[#050B2B] font-black uppercase text-[8px] lg:text-base leading-tight">Any Movie.</h3>
                    <p className="text-[#050B2B]/80 uppercase tracking-wide text-[6px] lg:text-xs hidden sm:block">Any Show.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="relative w-full lg:w-[360px] bg-gradient-to-br from-[#B10000] via-[#920000] to-[#570000] overflow-hidden shrink-0 border-t-2 lg:border-t-0 border-dashed border-white/20 lg:border-transparent">
            {/* Ticket Cut */}
            <div className="hidden lg:block absolute top-1/2 -left-5 -translate-y-1/2 w-10 h-10 rounded-full bg-[#F3F3EF] z-20"></div>

            {/* Cinema Texture */}
            <div className="absolute bottom-0 inset-x-0 opacity-[0.08]">
              <div className="h-60 bg-[radial-gradient(circle,#ffffff_20%,transparent_21%)] bg-[size:40px_40px]"></div>
            </div>

            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)]"></div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 lg:px-10 py-8 lg:py-0 text-white">
              {/* TOP */}
              <div className="w-full text-center">
                <p className="uppercase tracking-[0.3em] text-[10px] text-white/90">
                  Gift Voucher
                </p>

                <div className="flex items-center gap-4 my-4">
                  <div className="h-[1px] flex-1 bg-white/30"></div>
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <div className="h-[1px] flex-1 bg-white/30"></div>
                </div>

                {/* Amount */}
                <div className="flex justify-center items-start">
                  <span className="text-3xl lg:text-4xl mt-2 font-light">₹</span>
                  <span className="text-[70px] lg:text-[85px] font-black leading-none tracking-[-0.05em]">
                    400
                  </span>
                </div>

                <p className="mt-2 uppercase tracking-[0.15em] text-[10px] lg:text-xs text-white/90">
                  Four Hundred Rupees Only
                </p>
              </div>

              {/* CODE BOX */}
              <div className="w-full mt-6">
                <div className="border border-dashed border-white/40 rounded-[16px] px-5 py-4 bg-white/5 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                  <p className="uppercase text-center text-[9px] tracking-[0.3em] text-white/60 mb-2">
                    Voucher Code
                  </p>
                  <p className="text-center font-mono text-xl lg:text-2xl tracking-[0.15em] font-bold select-all">
                    {voucherCode}
                  </p>
                </div>
                
                <button
                  onClick={handleCopy}
                  className="relative w-full overflow-hidden group/btn rounded-xl mt-3"
                >
                  <div className="absolute inset-0 bg-white transition-transform duration-300 group-hover/btn:scale-105"></div>
                  <div className="relative px-4 py-2.5 flex items-center justify-center gap-2">
                    <span className="text-[10px] lg:text-xs font-black text-[#570000] uppercase tracking-widest z-10">
                      {copied ? "Copied!" : "Copy Code"}
                    </span>
                    {!copied && (
                      <svg className="w-3.5 h-3.5 text-[#570000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                </button>
              </div>

              {/* FOOTER */}
              <div className="flex items-center justify-center gap-3 mt-6 w-full">
                <div className="w-10 h-10 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0">
                  <Gift size={18} />
                </div>
                <div>
                  <p className="uppercase tracking-[0.1em] text-[8px] text-white/90 leading-relaxed">
                    Thank You For Being
                    <br />A Part Of Our Journey
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER TERMS */}
        <div className="bg-white border-t border-black/5 px-8 md:px-14 py-7">
          <div className="flex flex-wrap items-center gap-5 text-sm text-black/70">
            {/* Badge */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl border border-[#C6DB2A]/30 flex items-center justify-center bg-[#C6DB2A]/10">
                <svg
                  className="w-5 h-5 text-[#C6DB2A]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <span className="font-bold uppercase tracking-[0.15em]">
                Terms & Conditions
              </span>
            </div>

            <div className="h-5 w-[1px] bg-black/10"></div>

            <p>Valid only on BookMyShow.</p>

            <p>Not valid on gift cards.</p>

            <p>No cash redemption.</p>
          </div>
        </div>
      </motion.div>
      </div>

      {/* Tutorial Section */}
      <div className="w-full max-w-[1700px] mt-24 px-4 md:px-10 mx-auto relative z-10 mb-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-3xl md:text-5xl font-black text-[#050B2B] mb-6 tracking-tight">
            How to Redeem Your Voucher
          </h3>
          <p className="text-[#050B2B] text-xl font-medium bg-[#C6DB2A]/20 inline-block px-6 py-2 rounded-full border border-[#C6DB2A]/30">
            ബുക്ക്മൈഷോയിൽ ഈ വൗച്ചർ എങ്ങനെ ഉപയോഗിക്കാം
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <motion.div
            whileHover={{ y: -10 }}
            className="flex flex-col items-center text-center bg-white rounded-[2rem] p-8 border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.05)] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,219,42,0.1),transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="bg-[#F3F3EF] p-4 rounded-2xl mb-8 w-full flex items-center justify-center border border-black/5 shadow-inner min-h-[180px]">
              <img
                src="/step1_mockup.jpg"
                alt="Step 1: Select Seats"
                className="w-full h-full object-contain rounded-xl drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex items-center justify-center gap-3 mb-4 w-full relative z-10">
              <div className="bg-[#C6DB2A] text-[#050B2B] w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shadow-md shadow-[#C6DB2A]/40">
                1
              </div>
              <h4 className="text-xl font-bold text-[#050B2B]">Select Seats</h4>
            </div>
            <p className="text-sm text-black/60 mb-4 leading-relaxed font-medium relative z-10">
              Choose your movie and select your preferred seats.
            </p>
            <p className="text-sm text-[#050B2B] font-bold leading-relaxed bg-[#C6DB2A]/10 w-full py-2.5 rounded-xl border border-[#C6DB2A]/20 relative z-10">
              സിനിമയും സീറ്റുകളും തിരഞ്ഞെടുക്കുക.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            whileHover={{ y: -10 }}
            className="flex flex-col items-center text-center bg-white rounded-[2rem] p-8 border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.05)] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,219,42,0.1),transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="bg-[#F3F3EF] p-4 rounded-2xl mb-8 w-full flex items-center justify-center border border-black/5 shadow-inner min-h-[180px]">
              <img
                src="/step2_mockup.jpg"
                alt="Step 2: Confirm Booking"
                className="w-full h-full object-contain rounded-xl drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex items-center justify-center gap-3 mb-4 w-full relative z-10">
              <div className="bg-[#C6DB2A] text-[#050B2B] w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shadow-md shadow-[#C6DB2A]/40">
                2
              </div>
              <h4 className="text-xl font-bold text-[#050B2B]">
                Confirm Booking
              </h4>
            </div>
            <p className="text-sm text-black/60 mb-4 leading-relaxed font-medium relative z-10">
              Review your details and proceed to the payment page.
            </p>
            <p className="text-sm text-[#050B2B] font-bold leading-relaxed bg-[#C6DB2A]/10 w-full py-2.5 rounded-xl border border-[#C6DB2A]/20 relative z-10">
              വിവരങ്ങൾ പരിശോധിച്ച് പേയ്‌മെൻ്റിലേക്ക് പോവുക.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            whileHover={{ y: -10 }}
            className="flex flex-col items-center text-center bg-white rounded-[2rem] p-8 border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.05)] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,219,42,0.1),transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="bg-[#F3F3EF] p-4 rounded-2xl mb-8 w-full flex items-center justify-center border border-black/5 shadow-inner min-h-[180px]">
              <img
                src="/step3_mockup.jpg"
                alt="Step 3: Select Gift Voucher"
                className="w-full h-full object-contain rounded-xl drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex items-center justify-center gap-3 mb-4 w-full relative z-10">
              <div className="bg-[#C6DB2A] text-[#050B2B] w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shadow-md shadow-[#C6DB2A]/40">
                3
              </div>
              <h4 className="text-xl font-bold text-[#050B2B]">Gift Voucher</h4>
            </div>
            <p className="text-sm text-black/60 mb-4 leading-relaxed font-medium relative z-10">
              On the payment screen, select "Gift Voucher".
            </p>
            <p className="text-sm text-[#050B2B] font-bold leading-relaxed bg-[#C6DB2A]/10 w-full py-2.5 rounded-xl border border-[#C6DB2A]/20 relative z-10">
              "Gift Voucher" തിരഞ്ഞെടുക്കുക.
            </p>
          </motion.div>

          {/* Step 4 */}
          <motion.div
            whileHover={{ y: -10 }}
            className="flex flex-col items-center text-center bg-white rounded-[2rem] p-8 border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.05)] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,219,42,0.1),transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="bg-[#F3F3EF] p-4 rounded-2xl mb-8 w-full flex items-center justify-center border border-black/5 shadow-inner min-h-[180px]">
              <img
                src="/step4_mockup.jpg"
                alt="Step 4: Enter Code"
                className="w-full h-full object-contain rounded-xl drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex items-center justify-center gap-3 mb-4 w-full relative z-10">
              <div className="bg-[#C6DB2A] text-[#050B2B] w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shadow-md shadow-[#C6DB2A]/40">
                4
              </div>
              <h4 className="text-xl font-bold text-[#050B2B]">Enter Code</h4>
            </div>
            <p className="text-sm text-black/60 mb-4 leading-relaxed font-medium relative z-10">
              Paste your code and click Apply to redeem.
            </p>
            <p className="text-sm text-[#050B2B] font-bold leading-relaxed bg-[#C6DB2A]/10 w-full py-2.5 rounded-xl border border-[#C6DB2A]/20 relative z-10">
              കോഡ് നൽകി Apply ക്ലിക്ക് ചെയ്യുക.
            </p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
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
      onSuccess({ name: winnerName, code: voucherCode, text: commentText });
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex-1 w-full min-h-[350px] bg-white rounded-[2rem] p-8 md:p-12 border border-black/5 flex flex-col items-center justify-center relative hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-all duration-300 overflow-hidden group">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,219,42,0.1),transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

      <img
        src="/Untitled-2-01.png"
        alt="Trawbit"
        className="h-6 opacity-20 grayscale absolute top-8 right-8"
      />

      <AnimatePresence mode="wait">
        {step === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col items-center h-full w-full justify-center text-center relative z-10"
          >
            <p className="text-xs font-bold text-[#050B2B] uppercase tracking-[0.2em] mb-6 bg-[#C6DB2A]/20 px-4 py-1.5 rounded-full border border-[#C6DB2A]/30">
              {type === "follower" ? "Follower Winner" : "Comment Winner"}
            </p>
            <p className="text-3xl md:text-5xl font-black text-[#050B2B] tracking-tight mb-4 break-words">
              {winnerName}
            </p>
            <button
              onClick={() => setStep("login")}
              className="mt-6 bg-[#050B2B] text-white px-8 py-4 rounded-xl text-sm font-bold hover:scale-105 transition-all shadow-[0_10px_30px_rgba(5,11,43,0.2)] active:scale-95 uppercase tracking-wider"
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
            className="flex flex-col items-center w-full max-w-xs relative z-10"
          >
            <p className="text-2xl font-black text-[#050B2B] mb-6">
              Verify Identity
            </p>

            <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-5 py-4 bg-[#F3F3EF] border border-black/5 rounded-xl text-sm outline-none focus:border-[#C6DB2A] focus:bg-white text-[#050B2B] transition-all font-medium placeholder:text-black/30"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 bg-[#F3F3EF] border border-black/5 rounded-xl text-sm outline-none focus:border-[#C6DB2A] focus:bg-white text-[#050B2B] transition-all font-medium placeholder:text-black/30"
                />
              </div>
              {error && (
                <p className="text-red-500 text-xs font-bold text-center mt-1">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="bg-[#C6DB2A] text-[#050B2B] font-black px-4 py-4 rounded-xl text-sm hover:scale-105 transition-all w-full mt-2 shadow-[0_10px_30px_rgba(198,219,42,0.3)] active:scale-95 uppercase tracking-wider"
              >
                Reveal Voucher Code
              </button>
            </form>
            <button
              onClick={() => setStep("idle")}
              className="mt-6 text-xs text-black/40 hover:text-[#050B2B] font-bold uppercase tracking-widest transition-colors"
            >
              Cancel Verification
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function AnnouncementView({ type }) {
  const [followerWinner, setFollowerWinner] = useState(null);
  const [commentWinner, setCommentWinner] = useState(null);
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
    <div className="min-h-screen relative z-50 flex flex-col items-center justify-between w-full pt-12 bg-[#F3F3EF] overflow-x-hidden selection:bg-[#C6DB2A] selection:text-[#050B2B]">
      {/* Ambient Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#C6DB2A]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#7A0000]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center my-auto py-12 px-4 md:px-6">
        <img
          src="/Untitled-2-01.png"
          alt="Trawbit"
          className="h-20 md:h-32 mb-8 opacity-95 brightness-0"
          style={{ transform: "scale(1.5)", transformOrigin: "center", marginBottom: "3.5rem" }}
        />
        <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#050B2B] mb-8 text-center">
          Official <span className="font-black">Announcement</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(20px)", scale: 0.95 }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 w-full"
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
      <Footer />
    </div>
  );
}
