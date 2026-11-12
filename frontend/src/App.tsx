import { ArrowDown, ArrowUpRight, Github, Mail, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { ContactForm } from './components/ContactForm'
import { projects, skills } from './data'

const navigation = ['About', 'Work', 'Skills', 'Contact']

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen overflow-hidden bg-paper text-ink">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/90 text-white backdrop-blur-xl">
        <div className="page-shell flex h-20 items-center justify-between">
          <a href="#top" className="font-display text-xl tracking-tight" aria-label="Namgay D. Wangchuk home">NDW<span className="text-lime">.</span></a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {navigation.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>)}
          </nav>
          <a href="https://github.com/namgaydw-tech" target="_blank" rel="noreferrer" className="hidden items-center gap-2 text-sm font-semibold md:flex">
            GitHub <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <button className="md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle navigation">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <nav className="page-shell grid gap-4 border-t border-white/10 py-6 md:hidden" aria-label="Mobile navigation">
            {navigation.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="nav-link">{item}</a>)}
          </nav>
        )}
      </header>

      <main id="top">
        <section className="relative min-h-screen bg-ink pb-16 pt-36 text-white">
          <div className="hero-grid absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="orb absolute -right-36 top-32 h-[30rem] w-[30rem] rounded-full" aria-hidden="true" />
          <div className="page-shell relative grid min-h-[72vh] items-end gap-12 lg:grid-cols-[1.35fr_.65fr]">
            <div>
              <p className="eyebrow text-lime">Computer science · research · engineering</p>
              <h1 className="mt-7 max-w-5xl font-display text-[clamp(3.6rem,9vw,8.4rem)] leading-[.86] tracking-[-.065em]">
                Building ideas that connect <span className="text-lime">research</span> to reality.
              </h1>
            </div>
            <div className="lg:pb-4">
              <p className="max-w-md text-lg leading-8 text-white/70">
                I’m Namgay D. Wangchuk, a computer science student and builder exploring intelligent systems, full-stack engineering, and responsible applied AI.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a className="button-light" href="#work">Explore my work <ArrowDown size={17} aria-hidden="true" /></a>
                <a className="button-outline" href="#contact">Start a conversation</a>
              </div>
            </div>
          </div>
          <div className="page-shell relative mt-16 flex items-center justify-between border-t border-white/15 pt-6 text-xs uppercase tracking-[.22em] text-white/45">
            <span>India · Open to collaboration</span><span>Portfolio / 2026</span>
          </div>
        </section>

        <section id="about" className="section-space">
          <div className="page-shell grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <div><p className="section-number">01 / About</p></div>
            <div>
              <h2 className="section-title">Curiosity, translated into useful systems.</h2>
              <div className="mt-10 grid gap-8 text-base leading-8 text-ink/65 md:grid-cols-2">
                <p>My work sits at the intersection of software engineering and research. I enjoy turning complex questions into clear interfaces, dependable APIs, and experiments that can be examined and improved.</p>
                <p>I’m especially interested in healthcare AI, graph intelligence, and human-centered technology—areas where technical quality and careful reasoning matter equally.</p>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 md:grid-cols-4">
                {['Applied AI', 'Full-stack', 'Research', 'Open source'].map((item, index) => (
                  <div key={item} className="bg-paper p-5"><span className="text-xs text-fern">0{index + 1}</span><p className="mt-5 font-semibold">{item}</p></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="bg-white section-space">
          <div className="page-shell">
            <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><p className="section-number">02 / Selected work</p><h2 className="section-title">Projects shaped by real questions.</h2></div>
            <div className="mt-16 border-t border-ink/15">
              {projects.map((project, index) => (
                <article key={project.title} className="project-row group">
                  <div className="flex items-start gap-5"><span className="pt-2 font-mono text-xs text-fern">0{index + 1}</span><div><p className="eyebrow text-fern">{project.label}</p><h3 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">{project.title}</h3></div></div>
                  <div><p className="max-w-xl leading-7 text-ink/60">{project.description}</p><div className="mt-5 flex flex-wrap gap-2">{project.stack.map((item) => <span key={item} className="tag">{item}</span>)}</div></div>
                  <ArrowUpRight className="hidden transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 lg:block" aria-hidden="true" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section-space">
          <div className="page-shell grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <p className="section-number">03 / Capabilities</p>
            <div><h2 className="section-title">A practical toolkit for thoughtful engineering.</h2><div className="mt-14 divide-y divide-ink/15 border-y border-ink/15">{skills.map(([title, detail], index) => <div key={title} className="grid gap-3 py-6 sm:grid-cols-[3rem_10rem_1fr]"><span className="text-xs text-fern">0{index + 1}</span><h3 className="font-semibold">{title}</h3><p className="text-ink/60">{detail}</p></div>)}</div></div>
          </div>
        </section>

        <section id="contact" className="bg-fern section-space text-white">
          <div className="page-shell grid items-start gap-14 lg:grid-cols-[.85fr_1.15fr]">
            <div><p className="eyebrow text-lime">04 / Contact</p><h2 className="mt-7 font-display text-5xl leading-none tracking-tight sm:text-7xl">Let’s build something worth understanding.</h2><p className="mt-7 max-w-md leading-7 text-white/65">For collaborations, research conversations, internships, or thoughtful project ideas, send a message through the secure form.</p><div className="mt-10 flex gap-4"><a className="social-link" href="https://github.com/namgaydw-tech" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a><a className="social-link" href="#contact" aria-label="Email through contact form"><Mail /></a></div></div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="bg-ink py-8 text-white/50"><div className="page-shell flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Namgay D. Wangchuk</p><p>React · TypeScript · FastAPI</p></div></footer>
    </div>
  )
}

export default App

