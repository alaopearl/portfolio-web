import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Check, Paperclip, FileText, Download, ArrowLeft,
  WhatsappLogo, EnvelopeSimple, Phone, IdentificationBadge,
  Briefcase,
  ChatCircle, Sparkle,
} from "@phosphor-icons/react";
import { usePortfolio } from "@/context/PortfolioContext";
import { SERVICES, type Inquiry } from "@/constants";

const BUDGETS = ["Under $500", "$500 – $1,000", "$1,000 – $5,000", "$5,000 – $10,000", "$10,000+", "Not sure yet"];
const TIMELINES = ["ASAP (1-2 weeks)", "1 month", "2-3 months", "3-6 months", "Flexible"];

function ModalShell({ title, subtitle, onClose, children, wide }: {
  title: string; subtitle?: string; onClose: () => void; children: React.ReactNode; wide?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className={`max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-border bg-background shadow-2xl sm:rounded-3xl ${wide ? "sm:max-w-2xl" : "sm:max-w-lg"}`}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-background/95 px-6 py-5 backdrop-blur-sm">
          <div>
            <h3 className="text-lg font-bold">{title}</h3>
            {subtitle && <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          <button onClick={onClose} aria-label="Close" className="grid size-9 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-6">{children}</div>
      </motion.div>
    </motion.div>
  );
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">
        {label}{required && <span className="text-red-500"> *</span>}
      </span>
      {children}
    </label>
  );
}

const inputCls = "w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

function SuccessPanel({ onClose, onWhatsapp }: { onClose: () => void; onWhatsapp?: () => void }) {
  return (
    <div className="py-6 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
        className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
        <Check size={32} weight="bold" />
      </motion.div>
      <h4 className="text-xl font-bold">Request Received!</h4>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        Thank you for reaching out. I&apos;ll review your details and get back to you within 24 hours.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        {onWhatsapp && (
          <button onClick={onWhatsapp} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white">
            <WhatsappLogo size={18} weight="fill" /> Chat on WhatsApp
          </button>
        )}
        <button onClick={onClose} className="rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold hover:bg-accent">Close</button>
      </div>
    </div>
  );
}

function ServiceRequestForm() {
  const { modal, closeModal, addInquiry, contact } = usePortfolio();
  const preset = SERVICES.find((s) => s.id === modal.data);
  const [done, setDone] = useState(false);
  const [fileName, setFileName] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", whatsapp: contact.whatsapp,
    service: preset?.title ?? SERVICES[0].title, budget: BUDGETS[1], timeline: TIMELINES[1], message: "",
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));
  const valid = form.name.trim() && form.email.trim() && form.message.trim();

  const submit = () => {
    if (!valid) return;
    addInquiry({ ...form, fileName: fileName || undefined, type: "service" } as Omit<Inquiry, "id" | "createdAt" | "status">);
    setDone(true);
  };

  if (done) return <SuccessPanel onClose={closeModal} onWhatsapp={() => window.open(`https://wa.me/234${contact.whatsapp}`, "_blank")} />;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Name" required><input className={inputCls} value={form.name} onChange={set("name")} placeholder="Your name" /></Field>
        <Field label="Email" required><input className={inputCls} value={form.email} onChange={set("email")} placeholder="you@email.com" /></Field>
        <Field label="Phone"><input className={inputCls} value={form.phone} onChange={set("phone")} placeholder="+234..." /></Field>
        <Field label="WhatsApp"><input className={inputCls} value={form.whatsapp} onChange={set("whatsapp")} placeholder="080..." /></Field>
      </div>
      <Field label="Service" required>
        <select className={inputCls} value={form.service} onChange={set("service")}>
          {SERVICES.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
        </select>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Budget"><select className={inputCls} value={form.budget} onChange={set("budget")}>{BUDGETS.map((b) => <option key={b}>{b}</option>)}</select></Field>
        <Field label="Timeline"><select className={inputCls} value={form.timeline} onChange={set("timeline")}>{TIMELINES.map((t) => <option key={t}>{t}</option>)}</select></Field>
      </div>
      <Field label="Project Details" required>
        <textarea className={`${inputCls} min-h-24 resize-y`} value={form.message} onChange={set("message")} placeholder="Tell me about your project, goals, and any requirements..." />
      </Field>
      <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-border bg-card px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-blue-500">
        <Paperclip size={16} />
        <span className="truncate">{fileName || "Attach a brief (optional)"}</span>
        <input type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")} />
      </label>
      <button onClick={submit} disabled={!valid}
        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 py-3 font-semibold text-white shadow-lg shadow-blue-600/25 transition-transform enabled:hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50">
        Send Request
      </button>
    </div>
  );
}

const SCOPE_BASE: Record<string, number> = {
  "web-development": 500, "react-development": 800, "data-analysis": 700,
  "ai-training": 900, "graphic-design": 300, "consulting": 400,
};

function QuoteForm() {
  const { closeModal, addInquiry, contact } = usePortfolio();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    service: SERVICES[0].id, complexity: "Medium", timeline: TIMELINES[1],
    name: "", email: "", phone: "", message: "",
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const complexityMult: Record<string, number> = { Basic: 1, Medium: 1.8, Advanced: 3 };
  const base = SCOPE_BASE[form.service] ?? 500;
  const estimate = Math.round((base * (complexityMult[form.complexity] ?? 1)) / 50) * 50;
  const canNext = step === 0 ? true : step === 1 ? true : form.name.trim() && form.email.trim();

  const submit = () => {
    addInquiry({
      name: form.name, email: form.email, phone: form.phone, whatsapp: contact.whatsapp,
      service: SERVICES.find((s) => s.id === form.service)?.title ?? "Custom",
      budget: `$${estimate.toLocaleString()} (est.)`, timeline: form.timeline,
      message: form.message || "Quote request via builder.", type: "quote",
    } as Omit<Inquiry, "id" | "createdAt" | "status">);
    setDone(true);
  };

  if (done) return <SuccessPanel onClose={closeModal} onWhatsapp={() => window.open(`https://wa.me/234${contact.whatsapp}`, "_blank")} />;

  const steps = ["Service", "Scope", "Details"];
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center">
            <div className={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold transition-colors ${i <= step ? "bg-gradient-to-br from-blue-600 to-emerald-500 text-white" : "bg-muted text-muted-foreground"}`}>
              {i < step ? <Check size={16} weight="bold" /> : i + 1}
            </div>
            <span className={`ml-2 text-xs font-medium ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
            {i < steps.length - 1 && <div className={`mx-2 h-0.5 flex-1 ${i < step ? "bg-emerald-500" : "bg-muted"}`} />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="grid gap-3">
          {SERVICES.map((s) => (
            <button key={s.id} onClick={() => setForm((f) => ({ ...f, service: s.id }))}
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${form.service === s.id ? "border-blue-500 bg-blue-500/5 ring-2 ring-blue-500/20" : "border-border bg-card hover:border-blue-500/40"}`}>
              <div className="grid size-10 place-items-center rounded-lg bg-gradient-to-br from-blue-600/20 to-emerald-500/20 text-blue-500"><Briefcase size={18} /></div>
              <div><div className="font-semibold">{s.title}</div><div className="text-xs text-muted-foreground">{s.startingPrice}</div></div>
            </button>
          ))}
        </div>
      )}
      {step === 1 && (
        <div className="space-y-4">
          <Field label="Project Complexity">
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(complexityMult).map((c) => (
                <button key={c} onClick={() => setForm((f) => ({ ...f, complexity: c }))}
                  className={`rounded-xl border py-2.5 text-sm font-medium transition-all ${form.complexity === c ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400" : "border-border bg-card text-muted-foreground"}`}>{c}</button>
              ))}
            </div>
          </Field>
          <Field label="Timeline">
            <select className={inputCls} value={form.timeline} onChange={set("timeline")}>{TIMELINES.map((t) => <option key={t}>{t}</option>)}</select>
          </Field>
          <div className="flex items-start gap-3 rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
            <Sparkle size={20} className="mt-0.5 text-blue-500" />
            <div><div className="text-sm font-semibold">Custom quote</div>
              <div className="mt-1 text-sm text-muted-foreground">Final pricing depends on your project requirements. Submit your request and I&apos;ll provide a customized quote.</div></div>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Name" required><input className={inputCls} value={form.name} onChange={set("name")} placeholder="Your name" /></Field>
            <Field label="Email" required><input className={inputCls} value={form.email} onChange={set("email")} placeholder="you@email.com" /></Field>
          </div>
          <Field label="Phone"><input className={inputCls} value={form.phone} onChange={set("phone")} placeholder="+234..." /></Field>
          <Field label="Anything else?"><textarea className={`${inputCls} min-h-20 resize-y`} value={form.message} onChange={set("message")} placeholder="Optional notes..." /></Field>
          <div className="rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-5 py-3 text-sm font-medium text-white">
            Final pricing depends on your project requirements. I&apos;ll provide a customized quote after reviewing this request.
          </div>
        </div>
      )}

      <div className="mt-6 flex gap-3">
        {step > 0 && <button onClick={() => setStep((s) => s - 1)} className="inline-flex items-center gap-1 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:bg-accent"><ArrowLeft size={16} /> Back</button>}
        {step < 2 ? (
          <button onClick={() => setStep((s) => s + 1)} className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25">Continue</button>
        ) : (
          <button onClick={submit} disabled={!canNext} className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 disabled:cursor-not-allowed disabled:opacity-50">Get My Quote</button>
        )}
      </div>
    </div>
  );
}

function ProjectDetailModal() {
  const { modal, closeModal, projects, openModal } = usePortfolio();
  const p = projects.find((x) => x.id === modal.data);
  if (!p) return null;
  return (
    <ModalShell title={p.title} subtitle={p.category} onClose={closeModal} wide>
      <div className="space-y-6">
        <p className="text-muted-foreground">{p.summary}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-red-500">The Challenge</div>
            <p className="text-sm text-muted-foreground">{p.problem}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-emerald-500">The Solution</div>
            <p className="text-sm text-muted-foreground">{p.solution}</p>
          </div>
        </div>
        <div>
          <div className="mb-2 text-sm font-semibold">Tech Stack</div>
          <div className="flex flex-wrap gap-1.5">{p.tech.map((t) => <span key={t} className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium">{t}</span>)}</div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><div className="mb-2 text-sm font-semibold">Key Features</div><ul className="space-y-1.5">{p.features.map((f) => <li key={f} className="flex gap-2 text-sm text-muted-foreground"><Check size={16} className="mt-0.5 shrink-0 text-emerald-500" />{f}</li>)}</ul></div>
          <div><div className="mb-2 text-sm font-semibold">Results</div><ul className="space-y-1.5">{p.results.map((r) => <li key={r} className="flex gap-2 text-sm text-muted-foreground"><Sparkle size={16} className="mt-0.5 shrink-0 text-blue-500" />{r}</li>)}</ul></div>
        </div>
        <div className="flex flex-wrap gap-3 border-t border-border pt-5">
          {p.demoUrl && <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold hover:bg-accent"><FileText size={16} /> Live Demo</a>}
          <button onClick={() => { closeModal(); openModal("service-request"); }} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25">Start a Similar Project</button>
        </div>
      </div>
    </ModalShell>
  );
}

function CVModal() {
  const { closeModal, stats, skills, contact } = usePortfolio();
  const download = () => {
    const lines = [
      "ABDULLAHI — FULL-STACK DEVELOPER & AI/DATA SPECIALIST", "=".repeat(56), "",
      `Phone: ${contact.phone}  |  WhatsApp: ${contact.whatsapp}  |  Email: ${contact.email}`, "",
      "SUMMARY", "-".repeat(8),
      "Full-stack developer and AI/data specialist with 5+ years building web apps, analytics, and intelligent systems.", "",
      "HIGHLIGHTS", "-".repeat(10), ...stats.map((s) => `- ${s.label}: ${s.value}`), "",
      "SKILL SET", "-".repeat(8), ...skills.map((g) => `- ${g.category}: ${g.skills.map((x) => x.name).join(", ")}`), "",
    ];
    const blob = new Blob([lines.join(String.fromCharCode(10))], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "Abdullahi-CV.txt"; a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <ModalShell title="Curriculum Vitae" subtitle="Download a copy of my professional profile" onClose={closeModal}>
      <div className="space-y-5">
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-gradient-to-br from-blue-600/10 to-emerald-500/10 p-5">
          <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 text-2xl font-black text-white">A</div>
          <div><div className="text-lg font-bold">Abdullahi</div><div className="text-sm text-muted-foreground">Full-Stack Developer &amp; AI/Data Specialist</div></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => <div key={s.id} className="rounded-xl border border-border bg-card p-3 text-center"><div className="text-xl font-bold text-blue-600 dark:text-blue-400">{s.value}</div><div className="text-xs text-muted-foreground">{s.label}</div></div>)}
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground"><Phone size={16} className="text-blue-500" /> {contact.phone}</div>
          <div className="flex items-center gap-2 text-muted-foreground"><EnvelopeSimple size={16} className="text-blue-500" /> {contact.email}</div>
          <div className="flex items-center gap-2 text-muted-foreground"><IdentificationBadge size={16} className="text-blue-500" /> {contact.address}</div>
        </div>
        <button onClick={download} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 py-3 font-semibold text-white shadow-lg shadow-blue-600/25">
          <Download size={18} /> Download CV
        </button>
      </div>
    </ModalShell>
  );
}

export function ModalsAndForms() {
  const { modal, closeModal } = usePortfolio();
  return (
    <AnimatePresence>
      {modal.type === "service-request" && <ModalShell key="sr" title="Request a Service" subtitle="Tell me what you need and I'll respond within 24 hours" onClose={closeModal}><ServiceRequestForm /></ModalShell>}
      {modal.type === "quote" && <ModalShell key="q" title="Instant Quote Builder" subtitle="Get an estimated range in 3 quick steps" onClose={closeModal}><QuoteForm /></ModalShell>}
      {modal.type === "project-detail" && <ProjectDetailModal key="pd" />}
      {modal.type === "cv" && <CVModal key="cv" />}
    </AnimatePresence>
  );
}

export function FloatingWhatsApp() {
  const { contact } = usePortfolio();
  return (
    <a href={`https://wa.me/234${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 transition-transform hover:scale-110">
      <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}><WhatsappLogo size={28} weight="fill" /></motion.span>
      <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold"><ChatCircle size={10} /></span>
    </a>
  );
}