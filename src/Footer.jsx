const IconInstagram = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l1.42-1.42a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);
const IconGlobe = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconMapPin = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const contactItems = [
  {
    icon: <IconPhone />,
    label: "Call Us",
    value: "+91 90610 14814",
    href: "tel:+919061014814",
  },
  {
    icon: <IconWhatsApp />,
    label: "WhatsApp",
    value: "+91 94972 19574",
    href: "https://wa.me/919497219574",
  },
  {
    icon: <IconMail />,
    label: "Email",
    value: "hello@trawbit.com",
    sub: "help@trawbit.com",
    href: "mailto:hello@trawbit.com",
  },
  {
    icon: <IconGlobe />,
    label: "Website",
    value: "trawbit.com",
    href: "https://trawbit.com",
  },
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#050B2B]">

      {/* Top perforated tear edge — matches ticket aesthetic */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 30" preserveAspectRatio="none" className="w-full h-8 fill-[#F3F3EF]">
          <path d="M0,0 Q30,30 60,0 Q90,30 120,0 Q150,30 180,0 Q210,30 240,0 Q270,30 300,0 Q330,30 360,0 Q390,30 420,0 Q450,30 480,0 Q510,30 540,0 Q570,30 600,0 Q630,30 660,0 Q690,30 720,0 Q750,30 780,0 Q810,30 840,0 Q870,30 900,0 Q930,30 960,0 Q990,30 1020,0 Q1050,30 1080,0 Q1110,30 1140,0 Q1170,30 1200,0 L1200,0 L0,0 Z"/>
        </svg>
      </div>

      {/* Ambient glows using brand lime + red */}
      <div className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full bg-[#C6DB2A]/6 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 -right-32 w-[400px] h-[400px] rounded-full bg-[#B10000]/10 blur-[100px] pointer-events-none" />

      {/* Subtle dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(198,219,42,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-14 pb-10">

        {/* ── TOP: Logo + tagline + Instagram ── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-14">
          <div>
            {/* Brand name */}
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 leading-none" style={{ fontFamily: "'Nunito', sans-serif", letterSpacing: '-0.02em' }}>
              <span className="text-white">Traw</span><span className="text-[#C6DB2A]">bit</span>
            </h2>
            <p className="text-[#C6DB2A]/80 text-sm font-bold tracking-[0.2em] uppercase">
              Innovating Digital Experiences
            </p>
            <p className="text-white/50 text-sm font-medium mt-2 max-w-xs leading-relaxed">
              Premium websites, apps &amp; AI solutions for modern businesses.
            </p>
          </div>

          {/* Instagram CTA */}
          <a
            href="https://www.instagram.com/trawbit/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3 rounded-2xl font-bold text-sm text-[#050B2B] bg-[#C6DB2A] hover:bg-[#d4ea2e] hover:shadow-[0_0_30px_rgba(198,219,42,0.35)] transition-all duration-300 hover:-translate-y-1 active:scale-95 whitespace-nowrap"
          >
            <IconInstagram />
            Follow @trawbit
          </a>
        </div>

        {/* ── Divider with lime dot ── */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-white/8" />
          <div className="w-2 h-2 rounded-full bg-[#C6DB2A] shadow-[0_0_10px_rgba(198,219,42,0.5)]" />
          <div className="h-px flex-1 bg-white/8" />
        </div>

        {/* ── CONTACT CARDS ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {contactItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center text-center gap-3 p-5 rounded-2xl border border-white/8 bg-white/4
                hover:border-[#C6DB2A]/40 hover:bg-[#C6DB2A]/6 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,rgba(198,219,42,0.12),transparent_70%)]" />

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-[#C6DB2A] bg-[#C6DB2A]/10 border border-[#C6DB2A]/20 group-hover:bg-[#C6DB2A]/20 group-hover:shadow-[0_0_20px_rgba(198,219,42,0.2)] transition-all duration-300 group-hover:scale-110">
                {item.icon}
              </div>

              <div>
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C6DB2A]/70 mb-1">{item.label}</p>
                <p className="text-white text-sm font-semibold leading-snug">{item.value}</p>
                {item.sub && <p className="text-white/50 text-xs font-medium mt-0.5">{item.sub}</p>}
              </div>
            </a>
          ))}
        </div>

        {/* ── Address strip ── */}
        <div className="flex items-center justify-center gap-2 mb-10 text-white/40 text-xs font-semibold tracking-widest uppercase">
          <IconMapPin />
          <span>Cheemeni, Kasargod, Kerala — 671313</span>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-6 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs font-semibold tracking-wide">
            © 2026 TRAWBIT Technologies. All rights reserved.
          </p>
          <p className="text-xs font-semibold">
            <span className="text-white/40">Made with </span>
            <span className="text-[#C6DB2A]" >passion</span>
            <span className="text-white/40"> &amp; </span>
            <span className="text-white/60">innovation</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
