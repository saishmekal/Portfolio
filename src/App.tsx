import { useEffect, useState, type FormEvent, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDownRight, ArrowUpRight, Mail, Menu, X, Moon, Sun,
  Send, Code2, Sparkles, Check,
} from 'lucide-react';
import './index.css';

type Project = {
  number: string; title: string; type: string; description: string;
  stack: string[]; image: string; tone: string; status: string;
  url?: string; underConstruction?: boolean;
};

const projects: Project[] = [
  { number: '01', title: 'Sahyadri Tour Company', type: 'Full-stack development', description: 'A travel platform designed to make discovering destinations and sending enquiries feel effortless.', stack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'], image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=85', tone: 'sage', status: 'LIVE WEBSITE', url: 'https://sahyadri-tour-company.vercel.app/' },
  { number: '04', title: 'Vision By KPIXELS', type: 'Photography · Client project', description: 'A visual-first photography website presenting services, galleries and membership experiences.', stack: ['React', 'Tailwind CSS', 'Responsive UI', 'WhatsApp'], image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=85', tone: 'sand', status: 'LIVE WEBSITE', url: 'https://www.visionbykpixels.com/' },
  { number: '05', title: 'Moksh Salon', type: 'Business website · Client project', description: 'A polished digital presence for a salon, focused on showcasing its services and making the brand easy to explore.', stack: ['Web development', 'Responsive design', 'UI/UX'], image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=85', tone: 'peach', status: 'LIVE WEBSITE', url: 'https://mokshsalonweb.netlify.app/' },
  { number: '02', title: 'Divyra Fashion', type: 'E-commerce · Client project', description: 'An elegant jewellery shopping experience with collection discovery, rental options and WhatsApp-led enquiries.', stack: ['React', 'UI/UX', 'SEO', 'WhatsApp integration'], image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1400&q=85', tone: 'pink', status: 'COMING SOON', underConstruction: true },
  { number: '03', title: 'Real-time Code Editor', type: 'Engineering · Ongoing', description: 'Building a collaborative coding space where multiple users can work together with real-time updates.', stack: ['React', 'Node.js', 'Socket.io', 'WebSockets'], image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85', tone: 'blue', status: 'IN PROGRESS' },
];

const skills = [
  { name: 'JavaScript', icon: 'javascript', category: 'LANGUAGE' },
  { name: 'TypeScript', icon: 'typescript', category: 'LANGUAGE' },
  { name: 'Python', icon: 'python', category: 'LANGUAGE' },
  { name: 'React', icon: 'react', category: 'FRONTEND' },
  { name: 'Node.js', icon: 'nodejs', category: 'BACKEND' },
  { name: 'Express.js', icon: 'express', category: 'BACKEND' },
  { name: 'MongoDB', icon: 'mongodb', category: 'DATABASE' },
  { name: 'PostgreSQL', icon: 'postgresql', category: 'DATABASE' },
  { name: 'Tailwind CSS', icon: 'tailwindcss', category: 'FRONTEND' },
  { name: 'Git', icon: 'git', category: 'TOOLS' },
  { name: 'Docker', icon: 'docker', category: 'TOOLS' },
  { name: 'REST APIs', icon: 'api', category: 'BACKEND' },
  { name: 'Bootstrap', icon: 'bootstrap', category: 'FRONTEND' },
  { name: 'Postman', icon: 'postman', category: 'TOOLS' },
  { name: 'AWS', icon: 'amazonwebservices', category: 'CLOUD' },
  { name: 'JWT', icon: 'jwt', category: 'AUTH' },
  { name: 'Firebase', icon: 'firebase', category: 'BACKEND' },
];

const roles = [
  'Full Stack Developer',
  'Problem Solver (in progress)',
  'Software Developer',
  'Professional Bug Negotiator',
  'UI/UX Designer',
];

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.14 }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function EncryptedName({ active }: { active: boolean }) {
  const target = 'Hi, I’m Saish Mekal.';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*';
  const [display, setDisplay] = useState(target.replace(/[^ ]/g, '·'));
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const total = target.length;
    const timer = window.setInterval(() => {
      frame += 1;
      const progress = frame / 34;
      setDisplay(target.split('').map((char, i) => {
        if (char === ' ') return ' ';
        if (i < Math.floor(progress * total)) return char;
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));
      if (frame >= 34) { window.clearInterval(timer); setDisplay(target); }
    }, 42);
    return () => window.clearInterval(timer);
  }, [active]);
  return <span className="encrypted-name" aria-label={target}>{display}</span>;
}

function TypewriterRoles({ active }: { active: boolean }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    if (!active) return;
    const current = roles[roleIndex];
    const delay = deleting ? 42 : 78;
    const timer = window.setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) window.setTimeout(() => setDeleting(true), 1150);
      } else {
        const next = current.slice(0, Math.max(0, text.length - 1));
        setText(next);
        if (!next) { setDeleting(false); setRoleIndex((roleIndex + 1) % roles.length); }
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [active, text, deleting, roleIndex]);
  return <span className="typewriter-text">{text}<span className="type-cursor" aria-hidden="true" /></span>;
}

function SkillCard({ skill, index }: { skill: typeof skills[number]; index: number }) {
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const style = { '--spot-x': `${spot.x}%`, '--spot-y': `${spot.y}%`, '--card-index': index } as CSSProperties;
  const iconName = skill.icon;
  const iconUrl = iconName === 'api'
    ? 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg'
    : `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`;
  return (
    <motion.article className="skill-card" style={style} onMouseMove={(event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      setSpot({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 });
    }} onMouseLeave={() => setSpot({ x: 50, y: 50 })} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: Math.min(index * 0.025, 0.35), duration: 0.5 }}>
      <span className="skill-category">{skill.category}</span>
      <div className="skill-icon-wrap"><img src={iconUrl} alt={`${skill.name} logo`} loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; event.currentTarget.parentElement?.classList.add('icon-fallback'); }} /><span className="skill-fallback">{skill.name.slice(0, 2).toUpperCase()}</span></div>
      <h3>{skill.name}</h3>
      <span className="skill-card-index">{String(index + 1).padStart(2, '0')}</span>
    </motion.article>
  );
}

const journey = [
  { date: 'THE FOUNDATION', title: 'Computer Engineering', text: 'Built a grounding in programming, computing and the way software systems fit together.', detail: 'A starting point for asking better questions, understanding fundamentals and figuring out what I enjoy building.' },
  { date: 'PROJECTS BEYOND TUTORIALS', title: 'Freelance Full Stack Developer', text: ' Moved from learning concepts to applying them in websites, full-stack projects and client work.', detail: 'Working through real requirements taught me to think about users, edge cases, deployment and the details that make a product useful, while delivering them under time constraints.' },
  { date: 'THE NEXT CHAPTER', title: 'Growing as an engineer', text: 'Sharpening my full-stack skills and preparing for SDE-1 and Full Stack Developer opportunities.', detail: 'The focus now is stronger engineering fundamentals, maintainable code and building systems with care.' },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [entered, setEntered] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => window.localStorage.getItem('saish-portfolio-theme') === 'light' ? 'light' : 'dark');
  const [themeMessage, setThemeMessage] = useState(false);
  const [constructionOpen, setConstructionOpen] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('saish-portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    if (themeMessage) return;
    setThemeMessage(true);
    window.setTimeout(() => {
      setTheme((current) => current === 'light' ? 'dark' : 'light');
      window.setTimeout(() => setThemeMessage(false), 800);
    }, 550);
  };

  const enterPortfolio = () => {
    setEntered(true);
    window.setTimeout(() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }), 450);
  };

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const subject = String(data.get('subject') || 'Portfolio enquiry').trim();
    const message = String(data.get('message') || '').trim();
    const body = `Hi Saish,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`;
    setFormStatus(`Thank you ${name}, I'll get back to you soon!`);
    window.location.href = `mailto:mekalsaish7@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className={`app-root theme-${theme}`}>
      <AnimatePresence>
        {!entered && <motion.section className="welcome-screen" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.025, filter: 'blur(14px)' }} transition={{ duration: 0.8 }}>
          <div className="welcome-noise" />
          <div className="welcome-top"><span className="welcome-mark">SM<span>®</span></span><span className="welcome-index">A PERSONAL SPACE ON THE INTERNET</span></div>
          <div className="welcome-content">
            <div className="welcome-orbit-mark"><Code2 size={42} strokeWidth={1.25} /><span>THINK · BUILD · REFINE</span></div>
            <p className="welcome-kicker">OH, HEY! YOU MADE IT.</p>
            <h1>Welcome to my<br /><em> little corner </em> of the internet.</h1>
            <p className="welcome-subtitle">I'm Saish — developer, curious mind, and professional button-clicker.</p>
            <motion.button className="enter-button glass-button" onClick={enterPortfolio} whileHover={{ y: -4, scale: 1.025 }} whileTap={{ scale: 0.97 }}>LET'S EXPLORE <ArrowUpRight size={18} /></motion.button>
          </div>
          
        </motion.section>}
      </AnimatePresence>

      <header className="site-header glass-panel">
        <a className="wordmark" href="#home" onClick={closeMenu}>SM<span>®</span></a>
        <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>
          <a href="#about" onClick={closeMenu}>About</a><a href="#work" onClick={closeMenu}>Work</a><a href="#skills" onClick={closeMenu}>Tech stack</a><a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <div className="header-actions">
          <button className="theme-toggle glass-button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>{theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}<span>{theme === 'light' ? 'DARK MODE' : 'LIGHT MODE'}</span></button>
          <a className="header-cta" href="#contact">LET'S TALK <ArrowUpRight size={15} /></a>
        </div>
        <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <AnimatePresence>{themeMessage && <motion.div className="theme-transition" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div initial={{ y: 20, scale: .94, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }}><span className="transition-spark">✦</span><p>{theme === 'light' ? 'WELCOME TO THE DARK SIDE.' : 'BACK TO THE BRIGHT SIDE?'}</p><strong>{theme === 'light' ? 'Excellent taste. 😏' : 'A little sunshine never hurt. ☀️'}</strong></motion.div></motion.div>}</AnimatePresence>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-topline"><span><i className="availability-dot" /> AVAILABLE FOR OPPORTUNITIES</span><span>MUMBAI, INDIA</span></div>
          <div className="hero-layout">
            <div className="hero-copy">
              <Reveal><p className="eyebrow">FULL STACK DEVELOPER</p>
                <h1><EncryptedName active={entered} /></h1>
                <p className="hero-role"><TypewriterRoles active={entered} /></p>
                <p className="hero-intro">I build responsive web applications, scalable backend systems and thoughtful digital experiences using modern technologies.</p>
              </Reveal>
              <div className="hero-bottom"><Reveal delay={0.12}><a className="hero-explore" href="#work">EXPLORE MY WORK <ArrowDownRight size={18} /></a></Reveal></div>
            </div>
            <Reveal className="hero-avatar-wrap" delay={0.18}><motion.img className="hero-avatar" src="/saish-avatar.png" alt="Illustrated portrait of Saish Mekal at his development desk" initial={{ opacity: 0, y: 22, scale: .96 }} animate={entered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 22, scale: .96 }} transition={{ duration: 1, delay: .2, ease: [0.22, 1, 0.36, 1] }} /></Reveal>
          </div>
        </section>

        <section className="about section-wrap" id="about">
          <Reveal><p className="section-kicker">01 — A LITTLE ABOUT ME</p></Reveal>
          <div className="about-intro-grid">
            <Reveal className="about-intro-copy"><h2>Writing Code that works,<br />Until it<em> <span className="work-highlight"> Doesnt.</span></em></h2></Reveal>
            <Reveal delay={0.1} className="identity-card-wrap"><button className={`identity-card ${cardFlipped ? 'is-flipped' : ''}`} onClick={() => setCardFlipped(!cardFlipped)} onMouseMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`); event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`); }} onMouseLeave={(event) => { event.currentTarget.style.setProperty('--mx', '50%'); event.currentTarget.style.setProperty('--my', '50%'); }} aria-label="Flip personal introduction card">
              <span className="identity-face identity-front"><span className="identity-topline">A LITTLE INTRODUCTION <span>SM®</span></span><span className="identity-monogram">SM<span>®</span></span><span className="identity-tagline">Curious mind. Builder's mindset.</span><span className="identity-hint">CLICK TO INTERACT <ArrowUpRight size={15} /></span></span>
              <span className="identity-face identity-back"><span className="identity-topline">BEHIND THE SCREEN <span>01 / 01</span></span><span className="identity-back-title">I like learning<br />by <em>making.</em></span><span className="identity-back-copy">I'm a Computer Engineering graduate who likes turning a blank screen, a tricky problem or a half-formed idea into something people can actually use. Most of my learning happens hands-on: building projects, figuring out what broke, fixing it, and usually learning three new things along the way.</span><span className="identity-github">FIND ME ON GITHUB <span>github.com/saishmekal</span> <ArrowUpRight size={15} /></span><span className="identity-hint identity-back-hint">CLICK TO INTERACT <ArrowUpRight size={15} /></span></span>
            </button></Reveal>
          </div>

          <div className="about-columns">
            <Reveal><p className="section-kicker">1.1 / MY APPROACH</p><h3>I like understanding how things work, then building something useful with that knowledge.</h3><p>My interests sit across frontend experiences, backend development and the engineering decisions that make applications reliable. I learn best by building, testing, refining and shipping real projects.</p></Reveal>
            <Reveal delay={0.12}><p className="section-kicker">1.2 / WHAT I'M WORKING TOWARDS</p><h3>Better fundamentals. Better products. Better engineering.</h3><p>I'm strengthening my full-stack development skills while preparing for SDE-1 and Full Stack Developer opportunities. I care about maintainable code, thoughtful problem-solving and knowing why a solution works, not just that it does.</p></Reveal>
          </div>

          <div className="journey-section"><Reveal><p className="section-kicker">02 — A WORK IN PROGRESS</p><h2>MY JOURNEY</h2></Reveal>
            <div className="journey-timeline">{journey.map((item, index) => <motion.article className="journey-item" key={item.title} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: .65, delay: .08 }}><div className="journey-marker"><span>{String(index + 1).padStart(2, '0')}</span></div><div className="journey-card"><span className="journey-date">{item.date}</span><h3>{item.title}</h3><p>{item.text}</p><small>{item.detail}</small></div></motion.article>)}</div>
          </div>
        </section>

        <section className="work section-wrap" id="work"><div className="section-heading"><div><p className="section-kicker">03 — SELECTED WORK</p><h2>Projects &<br /><em>experiments.</em></h2></div></div>
          <div className="project-list">{projects.map((project, index) => <Reveal key={project.number} delay={index % 2 ? 0.08 : 0}><article className={`project-card ${project.tone}`}><div className="project-meta"><span>{project.number} / 05</span><span>{project.status}</span></div><div className="project-image-wrap"><img src={project.image} alt={`${project.title} project visual`} loading="lazy" />{project.url ? <a className="image-arrow" href={project.url} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title}`}><ArrowUpRight size={24} /></a> : project.underConstruction ? <button className="image-arrow" onClick={() => setConstructionOpen(true)} aria-label="View project status"><ArrowUpRight size={24} /></button> : <span className="image-arrow image-arrow-disabled"><Code2 size={21} /></span>}</div><div className="project-info"><div><p className="project-type">{project.type}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p></div><div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div></article></Reveal>)}</div>
        </section>

        <section className="skills section-wrap" id="skills"><Reveal><p className="section-kicker">04 — THE TOOLKIT</p><div className="skills-heading"><h2>Tech stack<span className="skills-period">.</span></h2><p>The tools I use, learn and reach for when turning an idea into something real. Move your cursor across the cards to bring them into life.</p></div></Reveal><div className="skill-grid">{skills.map((skill, index) => <SkillCard key={skill.name} skill={skill} index={index} />)}</div></section>

        <section className="contact" id="contact"><div className="contact-inner"><Reveal><p className="section-kicker">05 — HAVE SOMETHING IN MIND?</p><h2>Let's <em>Connect.</em></h2><p className="contact-copy">Have a role, a project idea or just want to talk tech? Send me a note. I'd be happy to hear from you.</p></Reveal>
          <div className="contact-grid"><Reveal><div className="contact-aside"><span>GOOD CONVERSATIONS START SOMEWHERE.</span><p>Tell me a little about what you're working on. I'll get back to you as soon as I can.</p><a href="https://github.com/saishmekal" target="_blank" rel="noreferrer"> GitHub <ArrowUpRight size={14} /></a><a href="https://www.linkedin.com/in/saish-mekal-64499b253/" target="_blank" rel="noreferrer"> LinkedIn <ArrowUpRight size={14} /></a><a href="mailto:mekalsaish7@gmail.com"><Mail size={17} /> Email <ArrowUpRight size={14} /></a></div></Reveal>
            <Reveal delay={0.12}><form className="enquiry-form" onSubmit={submitEnquiry}><div className="form-row"><label>Your name<input name="name" type="text" placeholder="What should I call you?" required /></label><label>Email address<input name="email" type="email" placeholder="you@example.com" required /></label></div><label>Subject<input name="subject" type="text" placeholder="What would you like to discuss?" required /></label><label>Your message<textarea name="message" rows={5} placeholder="A little context goes a long way..." required /></label><button className="contact-button" type="submit">SEND ENQUIRY <Send size={16} /></button>{formStatus && <p className="form-status"><Check size={15} /> {formStatus}</p>}</form></Reveal>
          </div>
        
        </div></section>
        <footer><span className='section-kicker'> SM </span><span className='section-kicker'> © 2026 Saish Mekal. All Rights Reserved. </span><a className="back-top section-kicker" href="#home"> BACK TO TOP <ArrowUpRight size={14} /></a></footer>
      </main>

      <AnimatePresence>{constructionOpen && <motion.div className="construction-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setConstructionOpen(false)}><motion.div className="construction-modal glass-panel" role="dialog" aria-modal="true" initial={{ opacity: 0, y: 35, scale: .92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .96 }} onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setConstructionOpen(false)} aria-label="Close"><X size={18} /></button><div className="construction-icon"><Code2 size={40} /></div><p className="modal-kicker">A LITTLE WORK IN PROGRESS</p><h2>Good things<br /><em>take a little time.</em></h2><p>This website is still under construction. We're adding the finishing touches — come back soon!</p><button className="modal-done glass-button" onClick={() => setConstructionOpen(false)}>GOT IT <Sparkles size={16} /></button></motion.div></motion.div>}</AnimatePresence>
    </div>
  );
}
