import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowDownRight, ArrowUpRight, Check, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import corrugated from "@/assets/corrugated.jpg";
import films from "@/assets/films.jpg";
import pallets from "@/assets/pallets.jpg";
import protective from "@/assets/protective.jpg";
import branded from "@/assets/branded.jpg";
import labels from "@/assets/labels.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Rastogi Packworks | Industrial Packaging Procurement" },
    { name: "description", content: "Rastogi Packworks connects manufacturing plants with corrugated boxes, films, pallets, protective packaging and labels through coordinated sourcing and scheduled delivery." },
    { property: "og:title", content: "Rastogi Packworks | Industrial Packaging Procurement" },
    { property: "og:description", content: "Packaging sourced for your plant, delivered on schedule. Explore materials and share your requirements with Rastogi Packworks." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const categories = [
  { title: "Corrugated boxes", description: "Cartons and boxes sized to your products, loads and dispatch needs.", image: corrugated, alt: "Corrugated shipping cartons stacked on a pallet" },
  { title: "Stretch films & tapes", description: "Industrial wrap and sealing materials for secure handling and transit.", image: films, alt: "Rolls of stretch film and packing tape" },
  { title: "Pallets & crates", description: "Wooden pallets and crates for storage, movement and protection.", image: pallets, alt: "Wooden pallets and transport crates at a loading bay" },
  { title: "Protective packaging", description: "Bubble wrap, foam and EPE cushioning for delicate goods.", image: protective, alt: "Bubble wrap and foam protective packaging" },
  { title: "Custom branded packaging", description: "Packaging made to carry your identity as well as your products.", image: branded, alt: "Custom printed packaging boxes" },
  { title: "Labels", description: "Product, shipping and identification labels to fit your workflow.", image: labels, alt: "Rolls and sheets of product labels" },
];

const process = [
  { number: "01", title: "Share requirement", description: "Tell us your dimensions, specifications, quantities and delivery schedule." },
  { number: "02", title: "Source & optimize", description: "We find the right manufacturers, negotiate pricing and check for quality." },
  { number: "03", title: "Just-in-time delivery", description: "Your packaging is dispatched in step with your plant's production cycle." },
];

const sectors = ["Automotive", "FMCG", "Pharmaceuticals", "Electronics", "Logistics"];

function Brand() {
  return <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label="Rastogi Packworks, back to top">
    <span className="grid size-9 place-items-center rounded-lg bg-tape font-display text-xl font-black text-foreground">R</span>
    <span className="font-display text-lg font-black text-current sm:text-2xl">Rastogi<span className="text-primary">.</span> Packworks</span>
  </a>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    const form = event.currentTarget;
    const values = new FormData(form);
    setStatus("submitting");
    const { error } = await supabase.from("inquiries").insert({
      name: String(values.get("name") ?? "").trim(),
      company: String(values.get("company") ?? "").trim(),
      email: String(values.get("email") ?? "").trim(),
      phone: String(values.get("phone") ?? "").trim(),
      requirement: String(values.get("requirement") ?? "").trim(),
    });
    if (error) { setStatus("error"); return; }
    form.reset();
    setStatus("success");
  }

  return <div id="top" className="min-h-screen bg-background text-foreground">
    <div className="bg-foreground px-4 py-2.5 text-center text-[11px] font-semibold uppercase text-dark-foreground sm:text-xs">From requirement to plant floor <span className="mx-2 text-tape">✳</span> Packaging procurement, simplified</div>
    <header className="relative z-20 mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-5 lg:px-10 lg:py-6">
      <Brand />
      <nav aria-label="Main navigation" className="hidden items-center gap-8 text-sm font-semibold lg:flex">
        <a className="transition-colors hover:text-primary" href="#cats">Categories</a>
        <a className="transition-colors hover:text-primary" href="#process">How it works</a>
        <a className="transition-colors hover:text-primary" href="#sectors">Sectors</a>
        <a className="transition-colors hover:text-primary" href="#benefits">Benefits</a>
      </nav>
      <div className="flex items-center gap-2">
        <Button asChild variant="industrial" size="pill" className="hidden sm:inline-flex"><a href="#lead">Get a quote <ArrowUpRight /></a></Button>
        <Button variant="industrialOutline" size="icon" className="lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      </div>
      {menuOpen && <nav aria-label="Mobile navigation" className="absolute inset-x-0 top-full flex flex-col border-y border-border bg-background px-5 py-4 shadow-lg lg:hidden">
        {[["Categories", "#cats"], ["How it works", "#process"], ["Sectors", "#sectors"], ["Benefits", "#benefits"], ["Get a quote", "#lead"]].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="border-b border-border py-3 font-semibold last:border-0">{label}</a>)}
      </nav>}
    </header>

    <main>
      <section className="mx-auto max-w-[1400px] px-5 pb-0 pt-8 lg:px-10 lg:pt-10">
        <div className="mb-5 flex items-center gap-3"><span className="size-2 rounded-full bg-primary" /><span className="text-xs font-bold uppercase text-muted-foreground">Packaging procurement, simplified</span></div>
        <h1 className="max-w-[1300px] font-display text-[clamp(3rem,9vw,8.5rem)] font-black uppercase leading-[0.9] [overflow-wrap:anywhere]">Boxes, films<br />and pallets —<br /><span className="text-primary">sourced fast</span><span className="text-tape">.</span></h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">We bridge packaging manufacturers and manufacturing plants. Share what you need, and we source, optimize and coordinate delivery around your production schedule.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button asChild variant="signal" size="pillLg"><a href="#lead">Share your requirement <ArrowUpRight /></a></Button>
          <Button asChild variant="industrialOutline" size="pillLg"><a href="#cats">Browse categories <ArrowDownRight /></a></Button>
        </div>
        <div className="mt-12 overflow-hidden border-y-2 border-foreground bg-tape py-3" aria-label="Packaging categories">
          <div className="marquee-track font-display text-xl font-black uppercase md:text-3xl" aria-hidden="true">{[0, 1].map(n => <span key={n} className="pr-10">Corrugated boxes · Stretch films & tapes · Pallets & crates · Protective packaging · Custom branded packaging & labels · </span>)}</div>
        </div>
      </section>

      <section id="process" className="scroll-mt-8 bg-foreground py-16 text-dark-foreground md:py-20">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <p className="mb-4 text-xs font-bold uppercase text-tape">01 / How it works</p>
          <h2 className="mb-12 font-display text-4xl font-black uppercase leading-none md:text-6xl">Three steps to<br /><span className="text-tape">delivered packaging</span></h2>
          <div className="grid gap-5 md:grid-cols-3">{process.map((step, index) => <article key={step.number} className={`flex min-h-[280px] flex-col rounded-lg p-7 text-foreground md:p-8 ${index === 1 ? "bg-tape" : "bg-background"}`}>
            <div className="flex items-start justify-between"><span className={`font-display text-6xl font-black ${index === 0 ? "text-primary" : index === 2 ? "text-forest" : "text-foreground"}`}>{step.number}</span><span className={`size-3 rounded-full ${index === 0 ? "bg-primary" : index === 2 ? "bg-forest" : "bg-foreground"}`} /></div>
            <h3 className="mt-auto pt-8 font-display text-2xl font-black uppercase">{step.title}</h3><p className="mt-2 leading-relaxed text-muted-foreground">{step.description}</p>
          </article>)}</div>
        </div>
      </section>

      <section id="cats" className="mx-auto max-w-[1400px] scroll-mt-8 px-5 py-16 lg:px-10 lg:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6"><div><p className="mb-4 text-xs font-bold uppercase text-primary">02 / Materials</p><h2 className="font-display text-4xl font-black uppercase leading-none md:text-6xl">What we<br />supply</h2></div><p className="max-w-sm leading-relaxed text-muted-foreground">Across everyday essentials and custom specifications, find what your plant needs in one sourcing conversation.</p></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{categories.map(category => <article key={category.title} className="group overflow-hidden rounded-lg bg-card">
          <img src={category.image} alt={category.alt} loading="lazy" width={944} height={704} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
          <div className="p-6"><h3 className="font-display text-xl font-black uppercase">{category.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{category.description}</p></div>
        </article>)}</div>
      </section>

      <section id="benefits" className="scroll-mt-8 bg-tape py-16 md:py-20"><div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <p className="mb-4 text-xs font-bold uppercase">03 / The advantage</p><h2 className="mb-12 font-display text-4xl font-black uppercase leading-none md:text-6xl">Why plants<br />choose us</h2>
        <div className="grid gap-5 md:grid-cols-3">
          <article className="flex min-h-60 flex-col rounded-lg bg-foreground p-8 text-dark-foreground"><span className="font-display text-6xl font-black text-tape">↘</span><h3 className="mt-auto pt-8 font-display text-2xl font-black uppercase">Cost efficiency</h3><p className="mt-2 text-sm leading-relaxed opacity-80">Access manufacturer pricing without managing multiple suppliers yourself.</p></article>
          <article className="flex min-h-60 flex-col rounded-lg bg-background p-8 text-foreground"><span className="font-display text-6xl font-black">↻</span><h3 className="mt-auto pt-8 font-display text-2xl font-black uppercase">Scheduled dispatches</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Flexible deliveries planned around your production cycles, not excess inventory.</p></article>
          <article className="flex min-h-60 flex-col rounded-lg bg-primary p-8 text-primary-foreground"><Check className="size-14" strokeWidth={3} /><h3 className="mt-auto pt-8 font-display text-2xl font-black uppercase">Quality assurance</h3><p className="mt-2 text-sm leading-relaxed opacity-80">Vetted manufacturers and materials checked against your requirements.</p></article>
        </div>
      </div></section>

      <section id="sectors" className="mx-auto max-w-[1400px] scroll-mt-8 px-5 py-16 lg:px-10 lg:py-20"><p className="mb-4 text-xs font-bold uppercase text-primary">04 / Industries</p><h2 className="mb-10 font-display text-4xl font-black uppercase leading-none md:text-6xl">Built for<br /><span className="text-forest">your sector</span></h2><div className="flex flex-wrap gap-3">{sectors.map((sector, index) => <span key={sector} className={`rounded-full px-6 py-3 font-display text-sm font-bold uppercase ${["bg-foreground text-dark-foreground", "bg-tape text-foreground", "bg-forest text-dark-foreground", "bg-primary text-primary-foreground", "border-2 border-foreground text-foreground"][index]}`}>{sector}</span>)}</div></section>

      <section id="lead" className="scroll-mt-8 bg-foreground py-16 text-dark-foreground md:py-20"><div className="mx-auto grid max-w-[1400px] items-start gap-12 px-5 lg:grid-cols-2 lg:px-10">
        <div><p className="mb-5 text-xs font-bold uppercase text-tape">05 / Request a quote</p><h2 className="font-display text-5xl font-black uppercase leading-[0.95] md:text-7xl">Tell us<br />what you<br /><span className="text-tape">need.</span></h2><p className="mt-6 max-w-md leading-relaxed opacity-75">Tell us about your packaging requirement. We'll work on the right sourcing and delivery plan for your plant.</p></div>
        <form onSubmit={submitInquiry} className="rounded-lg bg-background p-6 text-foreground sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block"><span className="font-display text-xs font-bold uppercase">Name</span><input name="name" required minLength={2} maxLength={120} autoComplete="name" placeholder="Your name" className="mt-2 w-full rounded-md border-2 border-input bg-card px-4 py-3 outline-none focus:border-primary" /></label>
            <label className="block"><span className="font-display text-xs font-bold uppercase">Company</span><input name="company" required minLength={2} maxLength={160} autoComplete="organization" placeholder="Company name" className="mt-2 w-full rounded-md border-2 border-input bg-card px-4 py-3 outline-none focus:border-primary" /></label>
            <label className="block"><span className="font-display text-xs font-bold uppercase">Email</span><input name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@company.com" className="mt-2 w-full rounded-md border-2 border-input bg-card px-4 py-3 outline-none focus:border-primary" /></label>
            <label className="block"><span className="font-display text-xs font-bold uppercase">Phone</span><input name="phone" type="tel" required minLength={6} maxLength={40} autoComplete="tel" placeholder="Phone number" className="mt-2 w-full rounded-md border-2 border-input bg-card px-4 py-3 outline-none focus:border-primary" /></label>
          </div>
          <label className="mt-4 block"><span className="font-display text-xs font-bold uppercase">Packaging requirement</span><textarea name="requirement" required minLength={10} maxLength={3000} rows={4} placeholder="Materials, sizes, quantities and delivery schedule" className="mt-2 w-full resize-y rounded-md border-2 border-input bg-card px-4 py-3 outline-none focus:border-primary" /></label>
          <Button type="submit" variant="signal" size="pillLg" disabled={status === "submitting"} className="mt-5 w-full uppercase">{status === "submitting" ? "Sending..." : "Share requirement"} {status !== "submitting" && <ArrowUpRight />}</Button>
          {status === "success" && <p role="status" className="mt-4 text-sm font-semibold text-forest">Thank you. Your requirement has been received.</p>}
          {status === "error" && <p role="alert" className="mt-4 text-sm font-semibold text-primary">We couldn't send your request. Please try again.</p>}
        </form>
      </div></section>
    </main>
    <footer className="border-t border-dark-foreground/15 bg-foreground text-dark-foreground"><div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-5 py-8 lg:px-10"><Brand /><span className="text-sm opacity-70">Boxes, films and pallets — sourced for your plant.</span></div></footer>
  </div>;
}
