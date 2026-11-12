import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ContactForm } from './components/ContactForm'
import { GraphVisual } from './components/GraphVisual'
import { Reveal } from './components/Reveal'
import { experience, manuscripts, projects, research, skills } from './data'

const navigation = ['About', 'Experience', 'Research', 'Work', 'Contact']

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(distance > 0 ? window.scrollY / distance : 0)
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className="min-h-screen overflow-hidden bg-ivory text-obsidian">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-obsidian/95 text-ivory backdrop-blur-md">
        <div className="h-px origin-left bg-brass" style={{ transform: `scaleX(${scrollProgress})` }} aria-hidden="true" />
        <div className="page-shell flex h-[4.5rem] items-center justify-between">
          <a href="#top" className="font-display text-2xl tracking-tight" aria-label="Namgay D. Wangchuk home">NDW<span className="text-brass">.</span></a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navigation.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>)}
          </nav>
          <a href="mailto:namgaydw@gmail.com" className="hidden items-center gap-2 text-xs uppercase tracking-[.16em] text-ivory/70 transition hover:text-ivory md:flex">
            Available for research <span className="h-1.5 w-1.5 rounded-full bg-brass" />
          </a>
          <button className="lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle navigation">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <nav className="page-shell grid gap-4 border-t border-white/10 py-6 lg:hidden" aria-label="Mobile navigation">
            {navigation.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="nav-link">{item}</a>)}
          </nav>
        )}
      </header>

      <main id="top">
        <section className="relative min-h-screen bg-obsidian pb-10 pt-32 text-ivory">
          <div className="technical-grid absolute inset-0" aria-hidden="true" />
          <div className="page-shell relative flex min-h-[calc(100vh-10rem)] flex-col justify-between">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
              <div>
                <p className="eyebrow text-brass">Research engineer · Machine learning systems</p>
                <h1 className="mt-8 font-display text-[clamp(4.25rem,9.5vw,9rem)] leading-[.78] tracking-[-.06em]">
                  Namgay D.<br /><span className="italic text-brass">Wangchuk</span>
                </h1>
                <p className="mt-10 max-w-2xl text-[clamp(1rem,1.5vw,1.3rem)] leading-relaxed text-ivory/66">
                  AI/ML Research Engineer <span className="mx-2 text-brass">|</span> Machine Learning Systems & Multi-Agent AI
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a className="button-primary" href="#research">View research <ArrowDown size={16} aria-hidden="true" /></a>
                  <a className="button-ghost" href="#contact">Discuss a collaboration</a>
                </div>
              </div>
              <GraphVisual />
            </div>
            <div className="mt-16 flex items-center justify-between border-t border-white/12 pt-5 font-mono text-[10px] uppercase tracking-[.18em] text-ivory/40">
              <span>India · UTC +05:30</span><span>Research portfolio / 2026</span>
            </div>
          </div>
        </section>

        <section id="about" className="section-space">
          <Reveal className="page-shell grid gap-12 lg:grid-cols-[.55fr_1.45fr]">
            <p className="section-number">01 / Profile</p>
            <div>
              <h2 className="section-title">A gentleman. A researcher. <span className="italic text-sage">An engineer.</span></h2>
              <div className="mt-12 grid gap-10 border-t border-obsidian/15 pt-8 text-base leading-8 text-obsidian/62 md:grid-cols-2">
                <p>I work where research questions become engineered systems—translating uncertain problems into experiments, interfaces, and APIs that can be examined with care.</p>
                <p>My interests center on graph intelligence, responsible diagnostic reasoning, and machine-learning infrastructure where technical rigor and human judgment matter equally.</p>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="experience" className="border-y border-obsidian/10 bg-white section-space">
          <Reveal className="page-shell grid gap-12 lg:grid-cols-[.55fr_1.45fr]">
            <div><p className="section-number">02 / Experience</p><p className="mt-5 max-w-xs text-sm leading-6 text-obsidian/50">Research appointments and environments shaping my engineering practice.</p></div>
            <div>
              <h2 className="section-title">Research shaped by <span className="italic text-sage">serious questions.</span></h2>
              <div className="timeline mt-14">
                {experience.map((item, index) => (
                  <article key={item.organization} className="timeline-row">
                    <span className="timeline-marker" aria-hidden="true" />
                    <span className="font-mono text-[10px] text-sage">0{index + 1}</span>
                    <div><p className="eyebrow text-sage">{item.organization}</p><h3 className="mt-3 font-display text-3xl sm:text-4xl">{item.role}</h3></div>
                    <p className="max-w-xl leading-7 text-obsidian/58">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <section id="research" className="bg-obsidian section-space text-ivory">
          <div className="page-shell">
            <Reveal className="grid gap-8 lg:grid-cols-[.55fr_1.45fr]">
              <p className="section-number text-brass">03 / Research</p>
              <h2 className="section-title">From representation to <span className="italic text-brass">reasoning.</span></h2>
            </Reveal>
            <div className="mt-16 grid gap-px border border-white/10 bg-white/10 lg:grid-cols-2">
              {research.map((item) => (
                <Reveal key={item.title} className="research-card">
                  <div className="flex items-start justify-between"><span className="font-mono text-xs text-brass">{item.number}</span><span className="font-mono text-[9px] uppercase tracking-[.2em] text-ivory/35">Case study</span></div>
                  <h3 className="mt-12 font-display text-4xl leading-none sm:text-5xl">{item.title}</h3>
                  <p className="mt-8 border-l border-brass/50 pl-5 text-lg leading-8 text-ivory/75">{item.question}</p>
                  <p className="mt-6 leading-7 text-ivory/48">{item.approach}</p>
                  <div className="mt-9 flex flex-wrap gap-2">{item.methods.map((method) => <span className="dark-tag" key={method}>{method}</span>)}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="section-space">
          <div className="page-shell">
            <Reveal className="grid gap-8 lg:grid-cols-[.55fr_1.45fr]"><p className="section-number">04 / Selected engineering</p><h2 className="section-title">Systems with a clear <span className="italic text-sage">reason to exist.</span></h2></Reveal>
            <div className="mt-16 border-t border-obsidian/15">
              {projects.map((project, index) => {
                const body = <><div className="flex items-start gap-5"><span className="font-mono text-[10px] text-sage">0{index + 1}</span><div><p className="eyebrow text-sage">{project.label}</p><h3 className="mt-3 font-display text-4xl sm:text-5xl">{project.title}</h3></div></div><div><p className="max-w-xl leading-7 text-obsidian/58">{project.description}</p><div className="mt-5 flex flex-wrap gap-2">{project.stack.map((item) => <span key={item} className="tag">{item}</span>)}</div></div><ArrowUpRight className="hidden transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 lg:block" aria-hidden="true" /></>
                return project.href ? <a key={project.title} className="project-row group" href={project.href} target="_blank" rel="noreferrer">{body}</a> : <article key={project.title} className="project-row group">{body}</article>
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-obsidian/10 bg-white section-space" aria-labelledby="publications-title">
          <Reveal className="page-shell grid gap-12 lg:grid-cols-[.55fr_1.45fr]">
            <p className="section-number">05 / Publications</p>
            <div><h2 id="publications-title" className="section-title">Work in <span className="italic text-sage">progress.</span></h2><div className="mt-14 border-y border-obsidian/15">{manuscripts.map((item, index) => <article key={item.title} className="publication-row"><span className="font-mono text-[10px] text-sage">0{index + 1}</span><h3 className="font-display text-2xl sm:text-3xl">{item.title}</h3><div className="text-sm leading-6 text-obsidian/55"><p>{item.status}</p><p>{item.focus}</p></div></article>)}</div><p className="mt-6 text-sm text-obsidian/45">Research details are shared responsibly as work reaches an appropriate stage.</p></div>
          </Reveal>
        </section>

        <section className="section-space" aria-labelledby="capabilities-title">
          <Reveal className="page-shell grid gap-12 lg:grid-cols-[.55fr_1.45fr]">
            <p className="section-number">06 / Capabilities</p>
            <div><h2 id="capabilities-title" className="section-title">A focused toolkit for <span className="italic text-sage">careful engineering.</span></h2><div className="mt-14 divide-y divide-obsidian/15 border-y border-obsidian/15">{skills.map(([title, detail], index) => <div key={title} className="capability-row"><span className="font-mono text-[10px] text-sage">0{index + 1}</span><h3 className="font-medium">{title}</h3><p className="text-obsidian/55">{detail}</p></div>)}</div></div>
          </Reveal>
        </section>

        <section id="contact" className="bg-charcoal section-space text-ivory">
          <div className="page-shell grid items-start gap-16 lg:grid-cols-[.8fr_1.2fr]">
            <Reveal><p className="section-number text-brass">07 / Contact</p><h2 className="mt-8 font-display text-5xl leading-[.95] tracking-[-.04em] sm:text-7xl">Let’s examine an idea <span className="italic text-brass">properly.</span></h2><p className="mt-8 max-w-md leading-7 text-ivory/55">For research collaborations, engineering opportunities, or a thoughtful technical conversation.</p><div className="mt-10 space-y-4 text-sm"><a className="contact-link" href="mailto:namgaydw@gmail.com"><Mail size={17} />namgaydw@gmail.com</a><a className="contact-link" href="https://www.linkedin.com/in/namgay-d-wangchuk-618761379" target="_blank" rel="noreferrer"><Linkedin size={17} />LinkedIn</a><a className="contact-link" href="https://github.com/namgaydw-tech" target="_blank" rel="noreferrer"><Github size={17} />GitHub</a></div></Reveal>
            <Reveal><ContactForm /></Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-obsidian py-8 text-ivory/40"><div className="page-shell flex flex-col gap-3 font-mono text-[10px] uppercase tracking-[.14em] sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Namgay D. Wangchuk</p><p>React · TypeScript · Python / FastAPI</p></div></footer>
    </div>
  )
}

export default App
