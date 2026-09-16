import { motion } from "framer-motion";
import { ArrowRight, WhatsappLogo, Phone, Code, Brain, ChartBar, Check } from "@phosphor-icons/react";
import { usePortfolio } from "@/context/PortfolioContext";

const FLOATING_TAGS = [
  { label: "React", pos: "top-[18%] left-[6%]", delay: 0 },
  { label: "Python", pos: "top-[28%] right-[8%]", delay: 0.5 },
  { label: "AI/ML", pos: "bottom-[32%] left-[10%]", delay: 1 },
  { label: "Next.js", pos: "bottom-[22%] right-[6%]", delay: 1.5 },
  { label: "TypeScript", pos: "top-[55%] left-[3%]", delay: 2 },
];

export function HeroAndStats() {
  const { stats, contact, openModal } = usePortfolio();
  const whatsappLink = `https://wa.me/234${contact.whatsapp}?text=Hello%20Abdullahi,%20I%20am%20interested%20in%20working%20with%20you%20on%20a%20project.`;
  const phoneLink = `tel:${contact.phone}`;

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/4 size-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-20 right-0 size-[400px] rounded-full bg-emerald-500/15 blur-[120px]" />
        <div className="absolute bottom-0 left-0 size-[350px] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      {/* Floating tech tags */}
      {FLOATING_TAGS.map((t) => (
        <motion.span
          key={t.label}
          className={`absolute hidden ${t.pos} rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-md md:inline-block`}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, delay: t.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {t.label}
        </motion.span>
      ))}

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        {/* Left: Copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-blue-500" />
            </span>
            Available for new projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            I Build{" "}
            <span className="bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 bg-clip-text text-transparent">
              Digital Solutions
            </span>{" "}
            That Help Businesses Grow.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            I build modern websites, web applications and digital solutions that help
            individuals and businesses solve problems and work more efficiently.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => openModal("service-request")}
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-6 py-3.5 font-semibold text-white shadow-xl shadow-blue-600/25 transition-transform hover:scale-[1.03] active:scale-95"
            >
              Hire Me
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => { const el = document.querySelector("#projects"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 font-semibold transition-colors hover:bg-accent"
            >
              View My Work
            </button>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 px-5 py-3.5 font-semibold text-emerald-600 transition-colors hover:bg-emerald-500/20 dark:text-emerald-400"
            >
              <WhatsappLogo size={20} weight="fill" />
              WhatsApp
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground"
          >
            {["Software Development", "React Development", "Data Analysis", "AI Training", "Digital Services"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <Check size={16} className="text-emerald-500" weight="bold" /> {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right: Visual card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-600/30 to-emerald-500/30 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card/80 p-8 shadow-2xl backdrop-blur-xl">
            <div className="mx-auto mb-6 grid size-28 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 text-4xl font-black text-white shadow-xl shadow-blue-600/30">
              A
            </div>
            <h3 className="text-center text-xl font-bold">Abdullahi</h3>
            <p className="mt-1 text-center text-sm text-muted-foreground">
              Full-Stack Developer & AI/Data Specialist
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { icon: Code, label: "Web" },
                { icon: Brain, label: "AI" },
                { icon: ChartBar, label: "Data" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-background/50 py-3">
                  <Icon size={22} className="text-blue-500" />
                  <span className="text-xs font-medium text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
            <a
              href={phoneLink}
              className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-border bg-background/50 py-3 text-sm font-medium transition-colors hover:bg-accent"
            >
              <Phone size={16} className="text-emerald-500" /> Call Now
            </a>
          </div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto mt-16 max-w-7xl px-5 lg:px-8"
      >
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-3xl font-extrabold text-transparent lg:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground lg:text-sm">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}