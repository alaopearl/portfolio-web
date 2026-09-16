import { useState } from "react";
import { motion } from "framer-motion";
import {
  X, Lock, LockKey, SignOut, Trash, Pencil, Plus, Check, Gear,
  ListChecks, Users, Briefcase, EnvelopeSimple, FloppyDisk, ChatCircle,
  CurrencyDollar, Star, WhatsappLogo, Phone, MapPin,
  ShieldCheck, Package, ShoppingCart,
} from "@phosphor-icons/react";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  ADMIN_PASSWORD,
  type LeadStatus, type Project, type Testimonial, type SkillGroup, type ContactDetails,
  type NinRequestStatus, type Product, type ProductAvailability, type ProductCategory,
} from "@/constants";

const STATUSES: LeadStatus[] = ["New", "In Progress", "Contacted", "Closed"];
const statusColor: Record<LeadStatus, string> = {
  New: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  "In Progress": "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  Contacted: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  Closed: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
};
const TABS = [
  { id: "inquiries", label: "Inquiries", icon: ChatCircle },
  { id: "messages", label: "Messages", icon: EnvelopeSimple },
  { id: "nin", label: "NIN Services", icon: ShieldCheck },
  { id: "products", label: "Products", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "stats", label: "Stats", icon: ListChecks },
  { id: "skills", label: "Skills", icon: Gear },
  { id: "testimonials", label: "Testimonials", icon: Star },
  { id: "contact", label: "Contact", icon: EnvelopeSimple },
] as const;
type TabId = (typeof TABS)[number]["id"];

const inp = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";
const btnPrimary = "inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-transform hover:scale-[1.02]";
const btnGhost = "inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold hover:bg-accent";

function LoginGate() {
  const { login, closeModal } = usePortfolio();
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(pw)) { setErr(true); setPw(""); }
  };
  return (
    <div className="fixed inset-0 z-[110] grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
      <motion.form onSubmit={submit} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-sm rounded-3xl border border-border bg-background p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white"><LockKey size={24} /></div>
          <button type="button" onClick={closeModal} className="grid size-9 place-items-center rounded-full bg-muted text-muted-foreground hover:bg-accent"><X size={18} /></button>
        </div>
        <h3 className="text-xl font-bold">Admin Access</h3>
        <p className="mt-1 text-sm text-muted-foreground">Enter your password to manage the portfolio.</p>
        <div className="relative mt-6">
          <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input autoFocus type="password" value={pw} onChange={(e) => { setPw(e.target.value); setErr(false); }} placeholder="Password"
            className={`${inp} pl-9 ${err ? "border-red-500 ring-2 ring-red-500/20" : ""}`} />
        </div>
        {err && <p className="mt-2 text-sm text-red-500">Incorrect password. Try again.</p>}
        <button type="submit" className={`${btnPrimary} mt-5 w-full py-2.5`}>Unlock Dashboard</button>
        <p className="mt-4 text-center text-xs text-muted-foreground">Demo password: <code className="rounded bg-muted px-1.5 py-0.5">{ADMIN_PASSWORD}</code></p>
      </motion.form>
    </div>
  );
}

function InquiriesTab() {
  const { inquiries, updateInquiryStatus, deleteInquiry, contact } = usePortfolio();
  if (!inquiries.length) return <Empty icon={ChatCircle} text="No inquiries yet." />;
  return (
    <div className="space-y-3">
      {inquiries.map((q) => (
        <div key={q.id} className="rounded-xl border border-border bg-card p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2"><span className="font-semibold">{q.name}</span><span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${statusColor[q.status]}`}>{q.status}</span></div>
              <div className="mt-0.5 text-xs text-muted-foreground">{q.service} · {q.budget} · {q.type === "quote" ? "Quote" : "Request"}</div>
            </div>
            <div className="flex items-center gap-1.5">
              <a href={`mailto:${q.email}`} className={btnGhost}><EnvelopeSimple size={14} /></a>
              <a href={`https://wa.me/234${q.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className={btnGhost}><WhatsappLogo size={14} weight="fill" /></a>
              <button onClick={() => deleteInquiry(q.id)} className={btnGhost}><Trash size={14} className="text-red-500" /></button>
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{q.message}</p>
          {q.fileName && <p className="mt-1 text-xs text-muted-foreground">📎 {q.fileName}</p>}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {STATUSES.map((s) => (
              <button key={s} onClick={() => updateInquiryStatus(q.id, s)}
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${q.status === s ? statusColor[s] : "bg-muted text-muted-foreground hover:bg-accent"}`}>{s}</button>
            ))}
          </div>
          <div className="mt-2 text-xs text-muted-foreground">{q.email} · {q.phone} · {new Date(q.createdAt).toLocaleDateString()}</div>
        </div>
      ))}
      <p className="pt-2 text-center text-xs text-muted-foreground">Contact WhatsApp: {contact.whatsapp}</p>
    </div>
  );
}

function MessagesTab() {
  const { messages, markMessageRead, deleteMessage } = usePortfolio();
  if (!messages.length) return <Empty icon={EnvelopeSimple} text="No contact messages yet." />;
  return (
    <div className="space-y-3">
      {messages.map((message) => (
        <div key={message.id} className={`rounded-xl border border-border bg-card p-4 ${message.read ? "" : "ring-1 ring-blue-500/30"}`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 font-semibold">{message.name}{!message.read && <span className="rounded-full bg-blue-500/15 px-2 py-0.5 text-[11px] text-blue-600">New</span>}</div>
              <div className="text-xs text-muted-foreground">{message.subject || "No subject"} · {new Date(message.createdAt).toLocaleDateString()}</div>
            </div>
            <div className="flex gap-1.5">
              <a href={`mailto:${message.email}`} className={btnGhost}><EnvelopeSimple size={14} /></a>
              <button onClick={() => markMessageRead(message.id)} disabled={message.read} className={btnGhost}><Check size={14} /></button>
              <button onClick={() => deleteMessage(message.id)} className={btnGhost}><Trash size={14} className="text-red-500" /></button>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{message.message}</p>
          <p className="mt-2 text-xs text-muted-foreground">{message.email}{message.phone && ` · ${message.phone}`}</p>
        </div>
      ))}
    </div>
  );
}

const NIN_STATUSES: NinRequestStatus[] = ["New", "Contacted", "Appointment Scheduled", "Processing", "Completed", "Cancelled"];
const PRODUCT_CATEGORIES: ProductCategory[] = ["MiFi", "4G Routers", "5G Routers", "Portable Wi-Fi", "Other Connectivity Devices"];
const AVAILABILITY: ProductAvailability[] = ["In Stock", "Low Stock", "Out of Stock"];

function NinAdminTab() {
  const { ninServices, addNinService, updateNinService, deleteNinService, ninRequests, updateNinRequestStatus } = usePortfolio();
  const [draft, setDraft] = useState({ title: "", description: "", price: "Contact for pricing", enabled: true });
  return <div className="space-y-4"><div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4"><div className="grid gap-2 sm:grid-cols-2"><input className={inp} placeholder="Service title" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} /><input className={inp} placeholder="Pricing" value={draft.price} onChange={(event) => setDraft({ ...draft, price: event.target.value })} /></div><textarea className={`${inp} mt-2`} placeholder="Description" value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} /><button onClick={() => { if (draft.title.trim()) { addNinService(draft); setDraft({ title: "", description: "", price: "Contact for pricing", enabled: true }); } }} className={`${btnPrimary} mt-2`}><Plus size={15} /> Add NIN Service</button></div>{ninServices.map((service) => <div key={service.id} className="rounded-xl border border-border bg-card p-4"><div className="flex items-start gap-2"><div className="flex-1"><input className={`${inp} font-semibold`} value={service.title} onChange={(event) => updateNinService(service.id, { title: event.target.value })} /><textarea className={`${inp} mt-2`} value={service.description} onChange={(event) => updateNinService(service.id, { description: event.target.value })} /></div><button onClick={() => deleteNinService(service.id)} className={btnGhost}><Trash size={14} className="text-red-500" /></button></div><div className="mt-2 flex items-center justify-between gap-3"><input className={inp} value={service.price} onChange={(event) => updateNinService(service.id, { price: event.target.value })} /><button role="switch" aria-checked={service.enabled} onClick={() => updateNinService(service.id, { enabled: !service.enabled })} className={`rounded-full px-3 py-1 text-xs font-semibold ${service.enabled ? "bg-emerald-500/15 text-emerald-600" : "bg-muted text-muted-foreground"}`}>{service.enabled ? "Enabled" : "Disabled"}</button></div></div>)}<div className="space-y-3 border-t border-border pt-4"><h3 className="font-bold">NIN Requests</h3>{ninRequests.length ? ninRequests.map((request) => <div key={request.id} className="rounded-xl border border-border bg-card p-4"><div className="flex flex-wrap items-center justify-between gap-2"><div><div className="font-semibold">{request.name} · {request.service}</div><div className="text-xs text-muted-foreground">{request.phone} · {request.email}</div></div><select className={inp} value={request.status} onChange={(event) => updateNinRequestStatus(request.id, event.target.value as NinRequestStatus)}>{NIN_STATUSES.map((status) => <option key={status}>{status}</option>)}</select></div><p className="mt-2 text-sm text-muted-foreground">{request.notes || "No additional information."}</p></div>) : <Empty icon={ShieldCheck} text="No NIN requests yet." />}</div></div>;
}

const emptyProduct = (): Omit<Product, "id" | "createdAt"> => ({ name: "", brand: "", category: "MiFi", networkType: "", keySpecification: "", price: "", stockQuantity: 0, availability: "Out of Stock", imageUrl: "", description: "", specifications: [], warranty: "", deliveryInformation: "", featured: false });

function ProductsAdminTab() {
  const { products, addProduct, updateProduct, deleteProduct } = usePortfolio();
  const [draft, setDraft] = useState(emptyProduct());
  const [adding, setAdding] = useState(false);
  const field = (key: keyof Product) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setDraft((current) => ({ ...current, [key]: event.target.value }));
  const save = () => { if (!draft.name.trim()) return; addProduct({ ...draft, stockQuantity: Number(draft.stockQuantity), specifications: draft.specifications }); setDraft(emptyProduct()); setAdding(false); };
  return <div className="space-y-3">{adding && <div className="space-y-2 rounded-xl border border-blue-500/30 bg-blue-500/5 p-4"><div className="grid gap-2 sm:grid-cols-2"><input className={inp} placeholder="Product name" value={draft.name} onChange={field("name")} /><input className={inp} placeholder="Brand" value={draft.brand} onChange={field("brand")} /><select className={inp} value={draft.category} onChange={field("category")}>{PRODUCT_CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select><input className={inp} placeholder="Price (e.g. ₦XX,XXX)" value={draft.price} onChange={field("price")} /><input className={inp} placeholder="Network type" value={draft.networkType} onChange={field("networkType")} /><input className={inp} placeholder="Key specification" value={draft.keySpecification} onChange={field("keySpecification")} /><input className={inp} placeholder="Image URL" value={draft.imageUrl} onChange={field("imageUrl")} /><input type="number" min="0" className={inp} placeholder="Stock quantity" value={draft.stockQuantity} onChange={field("stockQuantity")} /></div><select className={inp} value={draft.availability} onChange={field("availability")}>{AVAILABILITY.map((status) => <option key={status}>{status}</option>)}</select><textarea className={inp} placeholder="Description" value={draft.description} onChange={field("description")} /><textarea className={inp} placeholder="Warranty and delivery information" value={`${draft.warranty}${draft.deliveryInformation ? `\n${draft.deliveryInformation}` : ""}`} onChange={(event) => setDraft({ ...draft, warranty: event.target.value, deliveryInformation: "" })} /><div className="flex gap-2"><button onClick={save} className={btnPrimary}><FloppyDisk size={15} /> Save Product</button><button onClick={() => setAdding(false)} className={btnGhost}>Cancel</button></div></div>}{products.map((product) => <div key={product.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4"><div className="flex-1"><div className="font-semibold">{product.name}</div><div className="text-xs text-muted-foreground">{product.category} · {product.price || "No price"} · {product.availability}</div></div><select className={`${inp} w-auto`} value={product.availability} onChange={(event) => updateProduct(product.id, { availability: event.target.value as ProductAvailability })}>{AVAILABILITY.map((status) => <option key={status}>{status}</option>)}</select><button onClick={() => deleteProduct(product.id)} className={btnGhost}><Trash size={14} className="text-red-500" /></button></div>)}<button onClick={() => setAdding(true)} className={`${btnPrimary} w-full`}><Plus size={15} /> Add Product</button></div>;
}

function OrdersTab() {
  const { productOrders } = usePortfolio();
  return <div className="space-y-3">{productOrders.length ? productOrders.map((order) => <div key={order.id} className="rounded-xl border border-border bg-card p-4"><div className="flex justify-between gap-3"><div><div className="font-semibold">{order.productName} × {order.quantity}</div><div className="text-xs text-muted-foreground">{order.name} · {order.phone} · {order.deliveryMethod}</div></div><span className="rounded-full bg-blue-500/15 px-2 py-1 text-xs text-blue-600">{order.status}</span></div><p className="mt-2 text-sm text-muted-foreground">{order.deliveryAddress || "Pickup"}{order.instructions && ` · ${order.instructions}`}</p></div>) : <Empty icon={ShoppingCart} text="No product orders yet." />}</div>;
}

const emptyProject = (): Omit<Project, "id"> => ({ title: "", category: "", summary: "", problem: "", solution: "", tech: [], features: [], results: [], demoUrl: "" });

function ProjectEditor({ initial, onSave, onCancel }: { initial: Omit<Project, "id">; onSave: (p: Omit<Project, "id">) => void; onCancel: () => void }) {
  const [p, setP] = useState(initial);
  const set = (k: keyof Project) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setP((f) => ({ ...f, [k]: e.target.value }));
  const list = (v: string) => v.split(",").map((s) => s.trim()).filter(Boolean);
  return (
    <div className="space-y-3 rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <input className={inp} placeholder="Title" value={p.title} onChange={set("title")} />
        <input className={inp} placeholder="Category" value={p.category} onChange={set("category")} />
      </div>
      <textarea className={`${inp} min-h-16 resize-y`} placeholder="Summary" value={p.summary} onChange={set("summary")} />
      <textarea className={`${inp} min-h-16 resize-y`} placeholder="Problem" value={p.problem} onChange={set("problem")} />
      <textarea className={`${inp} min-h-16 resize-y`} placeholder="Solution" value={p.solution} onChange={set("solution")} />
      <input className={inp} placeholder="Tech (comma-separated)" defaultValue={p.tech.join(", ")} onChange={(e) => setP((f) => ({ ...f, tech: list(e.target.value) }))} />
      <input className={inp} placeholder="Features (comma-separated)" defaultValue={p.features.join(", ")} onChange={(e) => setP((f) => ({ ...f, features: list(e.target.value) }))} />
      <input className={inp} placeholder="Results (comma-separated)" defaultValue={p.results.join(", ")} onChange={(e) => setP((f) => ({ ...f, results: list(e.target.value) }))} />
      <input className={inp} placeholder="Demo URL" value={p.demoUrl ?? ""} onChange={set("demoUrl")} />
      <div className="flex gap-2">
        <button onClick={() => p.title.trim() && onSave(p)} className={btnPrimary}><FloppyDisk size={16} /> Save</button>
        <button onClick={onCancel} className={btnGhost}>Cancel</button>
      </div>
    </div>
  );
}

function ProjectsTab() {
  const { projects, addProject, updateProject, deleteProject } = usePortfolio();
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  return (
    <div className="space-y-3">
      {adding && <ProjectEditor initial={emptyProject()} onSave={(p) => { addProject(p); setAdding(false); }} onCancel={() => setAdding(false)} />}
      {projects.map((pr) =>
        editing === pr.id ? (
          <ProjectEditor key={pr.id} initial={pr} onSave={(u) => { updateProject(pr.id, u); setEditing(null); }} onCancel={() => setEditing(null)} />
        ) : (
          <div key={pr.id} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4">
            <div className="min-w-0"><div className="truncate font-semibold">{pr.title}</div><div className="text-xs text-muted-foreground">{pr.category} · {pr.tech.length} tech</div></div>
            <div className="flex shrink-0 gap-1.5">
              <button onClick={() => setEditing(pr.id)} className={btnGhost}><Pencil size={14} /></button>
              <button onClick={() => deleteProject(pr.id)} className={btnGhost}><Trash size={14} className="text-red-500" /></button>
            </div>
          </div>
        )
      )}
      {!adding && <button onClick={() => setAdding(true)} className={`${btnPrimary} w-full`}><Plus size={16} /> Add Project</button>}
    </div>
  );
}

function StatsTab() {
  const { stats, updateStat } = usePortfolio();
  return (
    <div className="space-y-3">
      {stats.map((s) => (
        <div key={s.id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
          <div className="flex-1 text-sm font-medium">{s.label}</div>
          <input className={`${inp} max-w-28 text-center font-bold`} value={s.value} onChange={(e) => updateStat(s.id, e.target.value)} />
        </div>
      ))}
    </div>
  );
}

function SkillsTab() {
  const { skills, setSkills } = usePortfolio();
  const patch = (gi: number, si: number, level: number) => {
    const next = skills.map((g, i) => i !== gi ? g : { ...g, skills: g.skills.map((x, j) => j !== si ? x : { ...x, level }) });
    setSkills(next);
  };
  const addSkill = (gi: number, name: string) => {
    if (!name.trim()) return;
    const next = skills.map((g, i) => i === gi ? { ...g, skills: [...g.skills, { name: name.trim(), level: 80 }] } : g);
    setSkills(next);
  };
  const removeSkill = (gi: number, si: number) => {
    const next = skills.map((g, i) => i === gi ? { ...g, skills: g.skills.filter((_, j) => j !== si) } : g);
    setSkills(next);
  };
  const renameGroup = (gi: number, category: string) => setSkills(skills.map((g, i) => i === gi ? { ...g, category } : g));
  const addGroup = () => setSkills([...skills, { id: crypto.randomUUID(), category: "New Category", skills: [] } as SkillGroup]);
  const removeGroup = (gi: number) => setSkills(skills.filter((_, i) => i !== gi));
  return (
    <div className="space-y-4">
      {skills.map((g, gi) => (
        <div key={g.id} className="rounded-xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center gap-2">
            <input className={`${inp} font-semibold`} value={g.category} onChange={(e) => renameGroup(gi, e.target.value)} />
            <button onClick={() => removeGroup(gi)} className={btnGhost}><Trash size={14} className="text-red-500" /></button>
          </div>
          <div className="space-y-2">
            {g.skills.map((s, si) => (
              <div key={si} className="flex items-center gap-2">
                <span className="w-28 shrink-0 truncate text-sm">{s.name}</span>
                <input type="range" min={0} max={100} value={s.level} onChange={(e) => patch(gi, si, Number(e.target.value))} className="flex-1 accent-blue-600" />
                <span className="w-10 shrink-0 text-right text-xs tabular-nums text-muted-foreground">{s.level}%</span>
                <button onClick={() => removeSkill(gi, si)} className="text-muted-foreground hover:text-red-500"><X size={14} /></button>
              </div>
            ))}
          </div>
          <AddInline placeholder="Add skill" onAdd={(v) => addSkill(gi, v)} />
        </div>
      ))}
      <button onClick={addGroup} className={`${btnPrimary} w-full`}><Plus size={16} /> Add Category</button>
    </div>
  );
}

function AddInline({ placeholder, onAdd }: { placeholder: string; onAdd: (v: string) => void }) {
  const [v, setV] = useState("");
  return (
    <div className="mt-2 flex gap-2">
      <input className={inp} placeholder={placeholder} value={v} onChange={(e) => setV(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") { onAdd(v); setV(""); } }} />
      <button onClick={() => { onAdd(v); setV(""); }} className={btnGhost}><Plus size={14} /></button>
    </div>
  );
}

const emptyTestimonial = (): Omit<Testimonial, "id"> => ({ name: "", role: "", quote: "", rating: 5 });

function TestimonialsTab() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = usePortfolio();
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<Omit<Testimonial, "id">>(emptyTestimonial());
  const startEdit = (t: Testimonial) => { setDraft({ name: t.name, role: t.role, quote: t.quote, rating: t.rating }); setEditing(t.id); };
  const save = () => {
    if (!draft.name.trim()) return;
    if (editing) updateTestimonial(editing, draft); else addTestimonial(draft);
    setEditing(null); setDraft(emptyTestimonial());
  };
  return (
    <div className="space-y-3">
      <div className={`rounded-xl border border-blue-500/30 bg-blue-500/5 p-4 ${!editing && !draft.name ? "" : ""}`}>
        <div className="grid gap-2 sm:grid-cols-2">
          <input className={inp} placeholder="Name" value={draft.name} onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))} />
          <input className={inp} placeholder="Role" value={draft.role} onChange={(e) => setDraft((d) => ({ ...d, role: e.target.value }))} />
        </div>
        <textarea className={`${inp} mt-2 min-h-16 resize-y`} placeholder="Quote" value={draft.quote} onChange={(e) => setDraft((d) => ({ ...d, quote: e.target.value }))} />
        <div className="mt-2 flex items-center justify-between">
          <div className="flex gap-1">{[1, 2, 3, 4, 5].map((n) => <button key={n} onClick={() => setDraft((d) => ({ ...d, rating: n }))}><Star size={18} weight={n <= draft.rating ? "fill" : "regular"} className={n <= draft.rating ? "text-amber-400" : "text-muted-foreground"} /></button>)}</div>
          <button onClick={save} className={btnPrimary}>{editing ? <><Check size={16} /> Update</> : <><Plus size={16} /> Add Testimonial</>}</button>
        </div>
      </div>
      {testimonials.map((t) => (
        <div key={t.id} className="flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4">
          <div className="min-w-0"><div className="font-semibold">{t.name}</div><div className="text-xs text-muted-foreground">{t.role}</div><p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{t.quote}</p></div>
          <div className="flex shrink-0 gap-1.5"><button onClick={() => startEdit(t)} className={btnGhost}><Pencil size={14} /></button><button onClick={() => deleteTestimonial(t.id)} className={btnGhost}><Trash size={14} className="text-red-500" /></button></div>
        </div>
      ))}
    </div>
  );
}

function ContactTab() {
  const { contact, updateContact, showPricing, setShowPricing } = usePortfolio();
  const [c, setC] = useState<ContactDetails>(contact);
  const dirty = JSON.stringify(c) !== JSON.stringify(contact);
  const set = (k: keyof ContactDetails) => (e: React.ChangeEvent<HTMLInputElement>) => setC((f) => ({ ...f, [k]: e.target.value }));
  return (
    <div className="space-y-4">
      <div className="space-y-3 rounded-xl border border-border bg-card p-4">
        <FieldRow icon={Phone} label="Phone"><input className={inp} value={c.phone} onChange={set("phone")} /></FieldRow>
        <FieldRow icon={WhatsappLogo} label="WhatsApp"><input className={inp} value={c.whatsapp} onChange={set("whatsapp")} /></FieldRow>
        <FieldRow icon={EnvelopeSimple} label="Email"><input className={inp} value={c.email} onChange={set("email")} /></FieldRow>
        <FieldRow icon={MapPin} label="Address"><input className={inp} value={c.address} onChange={set("address")} /></FieldRow>
        <button onClick={() => updateContact(c)} disabled={!dirty} className={`${btnPrimary} w-full disabled:cursor-not-allowed disabled:opacity-50`}><FloppyDisk size={16} /> Save Contact</button>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2"><CurrencyDollar size={18} className="text-emerald-500" /><div><div className="font-semibold">Show Pricing Section</div><div className="text-xs text-muted-foreground">Toggle public pricing on the landing page.</div></div></div>
        <button role="switch" aria-checked={showPricing} onClick={() => setShowPricing(!showPricing)}
          className={`relative h-7 w-12 rounded-full transition-colors ${showPricing ? "bg-emerald-500" : "bg-muted"}`}>
          <span className={`absolute top-1 size-5 rounded-full bg-white transition-all ${showPricing ? "left-6" : "left-1"}`} />
        </button>
      </div>
    </div>
  );
}

function FieldRow({ icon: Icon, label, children }: { icon: typeof Phone; label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 sm:flex-row sm:items-center">
      <span className="flex w-28 shrink-0 items-center gap-2 text-sm font-medium"><Icon size={16} className="text-blue-500" /> {label}</span>
      {children}
    </label>
  );
}

function Empty({ icon: Icon, text }: { icon: typeof Phone; text: string }) {
  return <div className="grid place-items-center rounded-xl border border-dashed border-border py-12 text-muted-foreground"><Icon size={28} className="mb-2 opacity-50" /><p className="text-sm">{text}</p></div>;
}

export function AdminDashboard() {
  const { modal, isAdmin, closeModal, logout, inquiries } = usePortfolio();
  const [tab, setTab] = useState<TabId>("inquiries");
  if (modal.type !== "admin") return null;
  if (!isAdmin) return <LoginGate />;
  const newCount = inquiries.filter((i) => i.status === "New").length;
  return (
    <div className="fixed inset-0 z-[110] flex flex-col bg-background">
      <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white"><Users size={18} /></div>
          <div><div className="font-bold leading-tight">Admin Dashboard</div><div className="text-xs text-muted-foreground">Manage your portfolio & leads</div></div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={logout} className={btnGhost}><SignOut size={14} /> Logout</button>
          <button onClick={closeModal} className="grid size-9 place-items-center rounded-full bg-muted text-muted-foreground hover:bg-accent"><X size={18} /></button>
        </div>
      </header>
      <div className="flex gap-1 overflow-x-auto border-b border-border px-2 py-2 sm:px-4">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${tab === t.id ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white" : "text-muted-foreground hover:bg-accent"}`}>
            <t.icon size={15} /> {t.label}
            {t.id === "inquiries" && newCount > 0 && <span className="grid size-4 place-items-center rounded-full bg-red-500 text-[10px] font-bold text-white">{newCount}</span>}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="mx-auto max-w-3xl">
          {tab === "inquiries" && <InquiriesTab />}
          {tab === "messages" && <MessagesTab />}
          {tab === "nin" && <NinAdminTab />}
          {tab === "products" && <ProductsAdminTab />}
          {tab === "orders" && <OrdersTab />}
          {tab === "projects" && <ProjectsTab />}
          {tab === "stats" && <StatsTab />}
          {tab === "skills" && <SkillsTab />}
          {tab === "testimonials" && <TestimonialsTab />}
          {tab === "contact" && <ContactTab />}
        </div>
      </div>
    </div>
  );
}