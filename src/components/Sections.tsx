import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code, Atom, ChartBar, Brain, Palette, Wrench,
  MagnifyingGlass, PenNib, Rocket, Trophy, Lightning,
  BracketsCurly, ChatsCircle, Star, Download, Funnel,
  WhatsappLogo, Phone, EnvelopeSimple, MapPin, ArrowRight,
} from "@phosphor-icons/react";
import { SERVICES, PROCESS_STEPS, WHY_POINTS, PRICING_MODELS, type Project } from "@/constants";
import { usePortfolio } from "@/context/PortfolioContext";

const ICON_MAP: Record<string, React.ElementType> = {
  Code, Atom, ChartBar, Brain, Palette, Wrench,
  MagnifyingGlass, PenNib, Rocket, Trophy, Lightning,
  BracketsCurly, ChatsCircle,
};

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <span className="mb-3 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

/* ─── About ─── */
export function AboutSection() {
  const { openModal } = usePortfolio();
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading eyebrow="About Me" title="Turning Ideas Into Impactful Products" />
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                I&apos;m Abdullahi — a technology professional focused on software development, React,
                data analysis, AI training, and practical digital services.
              </p>
              <p>
                My approach combines clean engineering with a business-first mindset. I don&apos;t just
                write code — I focus on outcomes: faster conversions, clearer insights, and products
                your users genuinely love.
              </p>
              <p>
                Whether you need a website, a dashboard, data support, or another digital solution, I
                work with you to understand the requirement and deliver a useful result.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => openModal("cv")}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:bg-accent"
                >
                  <Download size={16} className="text-blue-500" /> Download CV
                </button>
                <button
                  onClick={() => { const el = document.querySelector("#contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25"
                >
                  Let&apos;s Talk <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {WHY_POINTS.map((p) => {
                const Icon = ICON_MAP[p.icon] ?? Code;
                return (
                  <div key={p.title} className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm transition-transform hover:-translate-y-1">
                    <div className="mb-3 grid size-10 place-items-center rounded-xl bg-gradient-to-br from-blue-600/20 to-emerald-500/20 text-blue-600 dark:text-blue-400">
                      <Icon size={20} />
                    </div>
                    <h4 className="font-semibold">{p.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Services ─── */
export function ServicesSection() {
  const { openModal } = usePortfolio();
  return (
    <section id="services" className="border-y border-border bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title="What I Can Build For You"
          subtitle="Comprehensive digital services designed to accelerate your business."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = ICON_MAP[s.icon] ?? Code;
            return (
              <Reveal key={s.id} delay={i * 0.06}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/10">
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600/0 to-emerald-500/0 opacity-0 transition-opacity group-hover:from-blue-600/5 group-hover:to-emerald-500/5 group-hover:opacity-100" />
                  <div className="mb-4 grid size-12 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white shadow-lg shadow-blue-600/25">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="size-1.5 rounded-full bg-emerald-500" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{s.startingPrice}</span>
                    <button
                      onClick={() => openModal("service-request", s.id)}
                      className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-blue-600 hover:text-white"
                    >
                      Request
                    </button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Skills ─── */
export function SkillsSection() {
  const { skills } = usePortfolio();
  return (
    <section id="skills" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="Technical Expertise"
          subtitle="A modern stack refined through years of production work."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {skills.map((group, gi) => (
            <Reveal key={group.id} delay={gi * 0.08}>
              <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm">
                <h3 className="mb-5 font-bold">{group.category}</h3>
                <div className="space-y-4">
                  {group.skills.map((sk) => (
                    <div key={sk.name}>
                      <div className="mb-1.5 flex justify-between text-sm">
                        <span className="font-medium">{sk.name}</span>
                        <span className="text-muted-foreground">{sk.level}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${sk.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-emerald-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Projects ─── */
export function ProjectsSection() {
  const { projects, openModal } = usePortfolio();
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="border-y border-border bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured Projects"
          subtitle="A selection of work across web, data, AI, and design."
        />
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                active === c
                  ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-lg shadow-blue-600/25"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {c === "All" && <Funnel size={14} />} {c}
            </button>
          ))}
        </div>
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p: Project, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <button
                onClick={() => openModal("project-detail", p.id)}
                className="group h-full w-full overflow-hidden rounded-2xl border border-border bg-card text-left transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/10"
              >
                <div className="relative grid h-40 place-items-center bg-gradient-to-br from-blue-600/15 to-emerald-500/15">
                  <span className="text-4xl font-black text-blue-600/30 dark:text-blue-400/30">{p.title.charAt(0)}</span>
                  <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
                    {p.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">{p.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{p.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Process ─── */
export function ProcessSection() {
  return (
    <section id="process" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Process"
          title="How I Work"
          subtitle="A transparent, collaborative process from idea to launch."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = ICON_MAP[step.icon] ?? Code;
            return (
              <Reveal key={step.id} delay={i * 0.1}>
                <div className="relative rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm">
                  <span className="absolute right-4 top-4 text-5xl font-black text-muted/40">{i + 1}</span>
                  <div className="mb-4 grid size-12 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white shadow-lg shadow-blue-600/25">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ─── */
export function PricingSection() {
  const { showPricing, openModal } = usePortfolio();
  if (!showPricing) {
    return (
      <section id="pricing" className="border-y border-border bg-muted/30 py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-5 text-center lg:px-8">
          <SectionHeading eyebrow="Pricing" title="Custom Pricing" subtitle="Every project is unique. Let's discuss your specific needs and build a tailored quote." />
          <button
            onClick={() => openModal("quote")}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-8 py-4 font-semibold text-white shadow-xl shadow-blue-600/25"
          >
            Get a Free Quote
          </button>
        </div>
      </section>
    );
  }
  return (
    <section id="pricing" className="border-y border-border bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple, Transparent Pricing"
          subtitle="Choose a plan that fits your project scope."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {PRICING_MODELS.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.08}>
              <div className={`relative flex h-full flex-col rounded-2xl border p-7 ${
                m.highlighted
                  ? "border-blue-500/50 bg-gradient-to-b from-blue-600/10 to-card shadow-2xl shadow-blue-600/20 lg:-translate-y-3"
                  : "border-border bg-card"
              }`}>
                {m.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="font-bold">{m.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">{m.price}</span>
                  <span className="text-sm text-muted-foreground">{m.period}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{m.description}</p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {m.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 text-emerald-500">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openModal("quote")}
                  className={`mt-7 rounded-xl py-3 font-semibold transition-transform hover:scale-[1.02] ${
                    m.highlighted
                      ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-lg shadow-blue-600/25"
                      : "border border-border bg-background hover:bg-accent"
                  }`}
                >
                  Get Started
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
export function TestimonialsSection() {
  const { testimonials } = usePortfolio();
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx % testimonials.length] ?? testimonials[0];

  if (!t) return null;

  return (
    <section id="testimonials" className="py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <SectionHeading eyebrow="Testimonials" title="What Clients Say" />
        <Reveal>
          <div className="relative rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-sm sm:p-12">
            <div className="mb-6 flex justify-center gap-1">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={20} weight="fill" className="text-amber-400" />
              ))}
            </div>
            <p className="text-center text-lg leading-relaxed text-foreground/90 sm:text-xl">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-8 text-center">
              <div className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 font-bold text-white">
                {t.name.charAt(0)}
              </div>
              <div className="font-bold">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.role}</div>
            </div>
            <div className="mt-8 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === idx % testimonials.length ? "w-6 bg-blue-600" : "w-2 bg-muted"}`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Contact + Footer ─── */
export function ContactSection() {
  const { contact, openModal, addContactMessage } = usePortfolio();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    addContactMessage(form);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setSent(true);
  };
  const items = [
    { icon: Phone, label: "Call", value: contact.phone, href: `tel:${contact.phone}` },
    { icon: WhatsappLogo, label: "WhatsApp", value: contact.whatsapp, href: `https://wa.me/234${contact.whatsapp}` },
    { icon: EnvelopeSimple, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: MapPin, label: "Location", value: contact.address, href: undefined },
  ];
  return (
    <section id="contact" className="border-t border-border bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Something Great"
          subtitle="Ready to start your project? Reach out directly or send a detailed request."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {items.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <>
                  <div className="mb-3 grid size-11 place-items-center rounded-xl bg-gradient-to-br from-blue-600/20 to-emerald-500/20 text-blue-600 dark:text-blue-400">
                    <Icon size={20} />
                  </div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
                  <div className="font-semibold break-words">{value}</div>
                </>
              );
              return href ? (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm transition-transform hover:-translate-y-1">
                  {inner}
                </a>
              ) : (
                <div key={label} className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm">{inner}</div>
              );
            })}
          </div>
          <Reveal delay={0.1}>
            <form onSubmit={submit} className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm">
              <h3 className="text-2xl font-bold">Have a Project in Mind?</h3>
              <p className="mt-2 text-sm text-muted-foreground">Let&apos;s discuss your idea and turn it into a practical digital solution.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <input required value={form.name} onChange={update("name")} placeholder="Name" className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-blue-500" />
                <input required type="email" value={form.email} onChange={update("email")} placeholder="Email" className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-blue-500" />
                <input value={form.phone} onChange={update("phone")} placeholder="Phone" className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-blue-500" />
                <input value={form.subject} onChange={update("subject")} placeholder="Subject" className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-blue-500" />
              </div>
              <textarea required value={form.message} onChange={update("message")} placeholder="Your message" className="mt-3 min-h-28 w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-blue-500" />
              {sent && <p className="mt-3 text-sm text-emerald-500">Thank you. Your message has been received.</p>}
              <button type="submit" className="mt-4 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/25">Send Message</button>
              <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                <button type="button" onClick={() => openModal("service-request")} className="rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-accent">Request a Service</button>
                <button type="button" onClick={() => openModal("quote")} className="rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-accent">Get a Quote</button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { contact } = usePortfolio();
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 sm:flex-row lg:px-8">
        <div className="flex items-center gap-2 font-bold">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 text-white">
            <Trophy size={16} weight="fill" />
          </span>
          Abdullahi<span className="text-blue-500">.</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Abdullahi. Phone {contact.phone} · {contact.email}
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ChatsCircle size={16} className="text-emerald-500" /> Available for hire
        </div>
      </div>
    </footer>
  );
}
