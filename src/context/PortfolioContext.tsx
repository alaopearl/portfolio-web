import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import {
  type Inquiry, type ContactMessage, type Project, type Stat, type SkillGroup,
  type Testimonial, type ContactDetails, type LeadStatus,
  type NinService, type NinRequest, type NinRequestStatus, type Product, type ProductOrder,
  PROJECTS, STATS, SKILLS, TESTIMONIALS, CONTACT, ADMIN_PASSWORD, NIN_SERVICES, PRODUCTS,
} from "@/constants";

type Theme = "light" | "dark";

interface ModalState {
  type: "service-request" | "quote" | "project-detail" | "cv" | "admin" | "nin-request" | "product-detail" | "product-order" | null;
  data?: string;
}

interface PortfolioCtx {
  theme: Theme;
  toggleTheme: () => void;
  inquiries: Inquiry[];
  addInquiry: (i: Omit<Inquiry, "id" | "createdAt" | "status">) => void;
  updateInquiryStatus: (id: string, s: LeadStatus) => void;
  deleteInquiry: (id: string) => void;
    messages: ContactMessage[];
    addContactMessage: (m: Omit<ContactMessage, "id" | "createdAt" | "read">) => void;
    markMessageRead: (id: string) => void;
    deleteMessage: (id: string) => void;
    ninServices: NinService[];
    addNinService: (service: Omit<NinService, "id">) => void;
    updateNinService: (id: string, service: Partial<NinService>) => void;
    deleteNinService: (id: string) => void;
    ninRequests: NinRequest[];
    addNinRequest: (request: Omit<NinRequest, "id" | "createdAt" | "status">) => void;
    updateNinRequestStatus: (id: string, status: NinRequestStatus) => void;
    products: Product[];
    addProduct: (product: Omit<Product, "id" | "createdAt">) => void;
    updateProduct: (id: string, product: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
    productOrders: ProductOrder[];
    addProductOrder: (order: Omit<ProductOrder, "id" | "createdAt" | "status">) => void;
    cart: { productId: string; quantity: number }[];
    addToCart: (productId: string) => void;
    updateCartQuantity: (productId: string, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
  projects: Project[];
  addProject: (p: Omit<Project, "id">) => void;
  updateProject: (id: string, p: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  stats: Stat[];
  updateStat: (id: string, v: string) => void;
  skills: SkillGroup[];
  setSkills: (s: SkillGroup[]) => void;
  testimonials: Testimonial[];
  addTestimonial: (t: Omit<Testimonial, "id">) => void;
  updateTestimonial: (id: string, t: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  contact: ContactDetails;
  updateContact: (c: Partial<ContactDetails>) => void;
  showPricing: boolean;
  setShowPricing: (v: boolean) => void;
  isAdmin: boolean;
  login: (pw: string) => boolean;
  logout: () => void;
  modal: ModalState;
  openModal: (type: ModalState["type"], data?: string) => void;
  closeModal: () => void;
}

const Ctx = createContext<PortfolioCtx | null>(null);

function useStored<T>(key: string, initial: T): [T, (v: T | ((p: T) => T)) => void] {
  const [val, setVal] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch { return initial; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch { return; }
  }, [key, val]);
  return [val, setVal];
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useStored<Theme>("portfolio_theme", "dark");
  const [inquiries, setInquiries] = useStored<Inquiry[]>("portfolio_inquiries", []);
    const [messages, setMessages] = useStored<ContactMessage[]>("portfolio_messages", []);
    const [ninServices, setNinServices] = useStored<NinService[]>("portfolio_nin_services", NIN_SERVICES);
    const [ninRequests, setNinRequests] = useStored<NinRequest[]>("portfolio_nin_requests", []);
    const [products, setProducts] = useStored<Product[]>("portfolio_products", PRODUCTS);
    const [productOrders, setProductOrders] = useStored<ProductOrder[]>("portfolio_product_orders", []);
    const [cart, setCart] = useStored<{ productId: string; quantity: number }[]>("portfolio_cart", []);
  const [projects, setProjects] = useStored<Project[]>("portfolio_projects", PROJECTS);
  const [stats, setStats] = useStored<Stat[]>("portfolio_stats", STATS);
  const [skills, setSkillsState] = useStored<SkillGroup[]>("portfolio_skills", SKILLS);
  const [testimonials, setTestimonials] = useStored<Testimonial[]>("portfolio_testimonials", TESTIMONIALS);
  const [contact, setContact] = useStored<ContactDetails>("portfolio_contact", CONTACT);
  const [showPricing, setShowPricing] = useStored<boolean>("portfolio_pricing", true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [modal, setModal] = useState<ModalState>({ type: null });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme(p => p === "dark" ? "light" : "dark"), [setTheme]);

  const addInquiry = useCallback((i: Omit<Inquiry, "id" | "createdAt" | "status">) => {
    const entry: Inquiry = { ...i, id: crypto.randomUUID(), createdAt: new Date().toISOString(), status: "New" };
    setInquiries(p => [entry, ...p]);
    void supabase?.from("service_requests").insert({
      name: entry.name, email: entry.email, phone: entry.phone, whatsapp: entry.whatsapp,
      service: entry.service, budget: entry.budget, timeline: entry.timeline, message: entry.message,
      file_name: entry.fileName, type: entry.type, status: entry.status,
    }).then(({ error }) => { if (error) toast.error("Saved locally, but could not reach the database."); });
    toast.success(i.type === "quote" ? "Quote request submitted!" : "Request submitted successfully!");
  }, [setInquiries]);

  const updateInquiryStatus = useCallback((id: string, s: LeadStatus) => {
    setInquiries(p => p.map(i => i.id === id ? { ...i, status: s } : i));
    toast.success(`Lead marked as ${s}`);
  }, [setInquiries]);

  const deleteInquiry = useCallback((id: string) => {
    setInquiries(p => p.filter(i => i.id !== id));
    toast.success("Inquiry deleted");
  }, [setInquiries]);

  const addContactMessage = useCallback((m: Omit<ContactMessage, "id" | "createdAt" | "read">) => {
    const message: ContactMessage = { ...m, id: crypto.randomUUID(), createdAt: new Date().toISOString(), read: false };
    setMessages((prev) => [message, ...prev]);
    void supabase?.from("contact_messages").insert({
      id: message.id, name: message.name, email: message.email, phone: message.phone,
      subject: message.subject, message: message.message, read: false,
    }).then(({ error }) => { if (error) toast.error("Saved locally, but could not reach the database."); });
    toast.success("Message sent successfully!");
  }, [setMessages]);

  const markMessageRead = useCallback((id: string) => {
    setMessages((prev) => prev.map((message) => message.id === id ? { ...message, read: true } : message));
  }, [setMessages]);

  const deleteMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
    toast.success("Message deleted");
  }, [setMessages]);

  const addNinService = useCallback((service: Omit<NinService, "id">) => {
    setNinServices((prev) => [...prev, { ...service, id: crypto.randomUUID() }]);
    toast.success("NIN service added");
  }, [setNinServices]);

  const updateNinService = useCallback((id: string, service: Partial<NinService>) => {
    setNinServices((prev) => prev.map((item) => item.id === id ? { ...item, ...service } : item));
    toast.success("NIN service updated");
  }, [setNinServices]);

  const deleteNinService = useCallback((id: string) => {
    setNinServices((prev) => prev.filter((item) => item.id !== id));
    toast.success("NIN service deleted");
  }, [setNinServices]);

  const addNinRequest = useCallback((request: Omit<NinRequest, "id" | "createdAt" | "status">) => {
    const entry: NinRequest = { ...request, id: crypto.randomUUID(), createdAt: new Date().toISOString(), status: "New" };
    setNinRequests((prev) => [entry, ...prev]);
    void supabase?.from("nin_requests").insert({ ...entry, created_at: entry.createdAt, preferred_date: entry.preferredDate }).then(({ error }) => { if (error) toast.error("Saved locally, but could not reach the database."); });
    toast.success("Your NIN service request has been received.");
  }, [setNinRequests]);

  const updateNinRequestStatus = useCallback((id: string, status: NinRequestStatus) => {
    setNinRequests((prev) => prev.map((request) => request.id === id ? { ...request, status } : request));
  }, [setNinRequests]);

  const addProduct = useCallback((product: Omit<Product, "id" | "createdAt">) => {
    setProducts((prev) => [...prev, { ...product, id: crypto.randomUUID(), createdAt: new Date().toISOString() }]);
    toast.success("Product added");
  }, [setProducts]);

  const updateProduct = useCallback((id: string, product: Partial<Product>) => {
    setProducts((prev) => prev.map((item) => item.id === id ? { ...item, ...product } : item));
    toast.success("Product updated");
  }, [setProducts]);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    setCart((prev) => prev.filter((item) => item.productId !== id));
    toast.success("Product deleted");
  }, [setProducts, setCart]);

  const addProductOrder = useCallback((order: Omit<ProductOrder, "id" | "createdAt" | "status">) => {
    const entry: ProductOrder = { ...order, id: crypto.randomUUID(), createdAt: new Date().toISOString(), status: "New" };
    setProductOrders((prev) => [entry, ...prev]);
    void supabase?.from("product_orders").insert({ ...entry, created_at: entry.createdAt, product_id: entry.productId, delivery_method: entry.deliveryMethod, delivery_address: entry.deliveryAddress }).then(({ error }) => { if (error) toast.error("Saved locally, but could not reach the database."); });
    toast.success("Order request received");
  }, [setProductOrders]);

  const addToCart = useCallback((productId: string) => {
    setCart((prev) => {
      const item = prev.find((entry) => entry.productId === productId);
      return item ? prev.map((entry) => entry.productId === productId ? { ...entry, quantity: entry.quantity + 1 } : entry) : [...prev, { productId, quantity: 1 }];
    });
    toast.success("Added to cart");
  }, [setCart]);

  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    setCart((prev) => quantity > 0 ? prev.map((entry) => entry.productId === productId ? { ...entry, quantity } : entry) : prev.filter((entry) => entry.productId !== productId));
  }, [setCart]);

  const removeFromCart = useCallback((productId: string) => setCart((prev) => prev.filter((entry) => entry.productId !== productId)), [setCart]);
  const clearCart = useCallback(() => setCart([]), [setCart]);

  const addProject = useCallback((p: Omit<Project, "id">) => {
    setProjects(prev => [...prev, { ...p, id: crypto.randomUUID() }]);
    toast.success("Project added");
  }, [setProjects]);

  const updateProject = useCallback((id: string, p: Partial<Project>) => {
    setProjects(prev => prev.map(pr => pr.id === id ? { ...pr, ...p } : pr));
    toast.success("Project updated");
  }, [setProjects]);

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => prev.filter(pr => pr.id !== id));
    toast.success("Project deleted");
  }, [setProjects]);

  const updateStat = useCallback((id: string, v: string) => {
    setStats(prev => prev.map(s => s.id === id ? { ...s, value: v } : s));
  }, [setStats]);

  const setSkills = useCallback((s: SkillGroup[]) => setSkillsState(s), [setSkillsState]);

  const addTestimonial = useCallback((t: Omit<Testimonial, "id">) => {
    setTestimonials(prev => [...prev, { ...t, id: crypto.randomUUID() }]);
    toast.success("Testimonial added");
  }, [setTestimonials]);

  const updateTestimonial = useCallback((id: string, t: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(ti => ti.id === id ? { ...ti, ...t } : ti));
    toast.success("Testimonial updated");
  }, [setTestimonials]);

  const deleteTestimonial = useCallback((id: string) => {
    setTestimonials(prev => prev.filter(ti => ti.id !== id));
    toast.success("Testimonial deleted");
  }, [setTestimonials]);

  const updateContact = useCallback((c: Partial<ContactDetails>) => {
    setContact(prev => ({ ...prev, ...c }));
    toast.success("Contact details saved");
  }, [setContact]);

  const login = useCallback((pw: string) => {
    if (pw === ADMIN_PASSWORD) { setIsAdmin(true); toast.success("Welcome, Abdullahi"); return true; }
    toast.error("Incorrect admin password");
    return false;
  }, []);

  const logout = useCallback(() => setIsAdmin(false), []);

  const openModal = useCallback((type: ModalState["type"], data?: string) => setModal({ type, data }), []);
  const closeModal = useCallback(() => setModal({ type: null }), []);

  return (
    <Ctx.Provider value={{
      theme, toggleTheme, inquiries, addInquiry, updateInquiryStatus, deleteInquiry,
      messages, addContactMessage, markMessageRead, deleteMessage,
      ninServices, addNinService, updateNinService, deleteNinService, ninRequests, addNinRequest, updateNinRequestStatus,
      products, addProduct, updateProduct, deleteProduct, productOrders, addProductOrder,
      cart, addToCart, updateCartQuantity, removeFromCart, clearCart,
      projects, addProject, updateProject, deleteProject, stats, updateStat,
      skills, setSkills, testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
      contact, updateContact, showPricing, setShowPricing, isAdmin, login, logout,
      modal, openModal, closeModal,
    }}>
      {children}
    </Ctx.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePortfolio() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePortfolio must be used within PortfolioProvider");
  return ctx;
}