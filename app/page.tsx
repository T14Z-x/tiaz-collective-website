"use client";

import { FormEvent, useEffect, useState } from "react";

const services = [
  {
    number: "01",
    id: "foundation",
    name: "Brand Foundation",
    description:
      "We listen for the idea at the heart of your work, then give it a clear point of view and room to grow.",
    tags: ["Positioning", "Story", "Naming"],
    art: "foundation-art",
  },
  {
    number: "02",
    id: "identity",
    name: "Identity Design",
    description:
      "A distinctive visual language that feels true to you, from the first impression to the smallest detail.",
    tags: ["Identity", "Art direction", "Packaging"],
    art: "identity-art",
  },
  {
    number: "03",
    id: "experience",
    name: "Digital Experiences",
    description:
      "We bring your story into the world through thoughtful websites and the moments people remember.",
    tags: ["Web", "Editorial", "Experience"],
    art: "experience-art",
  },
];

const projects = [
  {
    name: "Morrow Botanics",
    title: "A slower kind of ritual.",
    discipline: "Identity · Packaging · Art direction",
    art: "project-botanics",
    initials: "morrow",
  },
  {
    name: "Still / Form",
    title: "Space to come back to yourself.",
    discipline: "Strategy · Identity · Digital",
    art: "project-still",
    initials: "S/F",
  },
  {
    name: "Common Ground",
    title: "A neighborhood, well gathered.",
    discipline: "Positioning · Visual identity",
    art: "project-ground",
    initials: "COMMON\nGROUND",
  },
  {
    name: "Fieldnotes",
    title: "A little closer to the land.",
    discipline: "Naming · Packaging · Story",
    art: "project-fieldnotes",
    initials: "field\nnotes",
  },
];

const journal = [
  {
    number: "NOTE 01",
    title: "The useful things a brand leaves unsaid",
    summary: "On the quiet choices that make an identity feel unmistakably itself.",
    color: "note-peach",
  },
  {
    number: "NOTE 02",
    title: "Making room for a different point of view",
    summary: "Good collaboration begins long before the first sketch.",
    color: "note-blue",
  },
  {
    number: "NOTE 03",
    title: "A place is made of more than walls",
    summary: "Finding the character of a place by paying attention to its people.",
    color: "note-yellow",
  },
];

const sectionLinks = [
  { id: "about", label: "Point of view" },
  { id: "work", label: "Selected work" },
  { id: "people", label: "The collective" },
  { id: "journal", label: "Notes" },
  { id: "news", label: "Studio news" },
  { id: "contact", label: "Contact" },
];

function BrandMark() {
  return (
    <svg
      className="brand-mark"
      viewBox="0 0 40 40"
      role="img"
      aria-label="Tiaz Collective"
    >
      <path d="M20 3.5 36.5 20 20 36.5 3.5 20 20 3.5Z" />
      <path d="M20 10v20M10 20h20" />
      <circle cx="20" cy="20" r="3" />
    </svg>
  );
}

function OrbitalDrawing() {
  return (
    <svg
      className="orbital-drawing"
      viewBox="0 0 650 620"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M329 70C467 55 551 152 532 279c-17 112-110 213-224 207C177 480 92 390 99 278 107 151 190 82 329 70Z"
        stroke="currentColor"
        strokeWidth=".8"
        strokeDasharray="1 3"
      />
      <path
        d="M330 89c106-8 177 55 183 144M115 319c1 78 52 137 123 161"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M324 90c-8-44 12-61 36-49 21 11 19 41 5 62-12 18-36 24-44 6-7-15 2-36 14-50m-78 332c-39 16-64 4-57-19 6-20 34-28 55-17 18 10 26 29 9 39-14 8-34 3-49-7m364-208c31-28 57-23 59-1 2 21-22 39-44 39-20 0-35-14-23-30 9-12 29-19 47-17"
        stroke="currentColor"
        strokeWidth=".8"
      />
      <circle cx="100" cy="279" r="3" fill="currentColor" />
      <circle cx="531" cy="280" r="3" fill="currentColor" />
      <circle cx="327" cy="71" r="3" fill="currentColor" />
      <circle cx="326" cy="486" r="3" fill="currentColor" />
    </svg>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [formMessage, setFormMessage] = useState("");
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(() => {
    const main = document.querySelector<HTMLElement>(".site-content");
    if (!main || !("IntersectionObserver" in window)) return;

    const revealItems = Array.from(
      main.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const zoomItems = Array.from(
      main.querySelectorAll<HTMLElement>("[data-scroll-zoom]"),
    );
    const storyItems = Array.from(
      main.querySelectorAll<HTMLElement>("[data-scroll-story]"),
    );
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    main.classList.add("motion-ready", "in-hero-scene");

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -7% 0px" },
    );
    revealItems.forEach((item) => revealObserver.observe(item));

    const visibleZoomItems = new Set<HTMLElement>();
    let frame = 0;
    const updateZoom = () => {
      frame = 0;
      const viewportCenter = window.innerHeight * 0.52;
      const focusRange = window.innerHeight * 0.8;

      storyItems.forEach((item) => {
        const bounds = item.getBoundingClientRect();
        const scrollableDistance = Math.max(bounds.height - window.innerHeight, 1);
        const progress = Math.max(0, Math.min(1, -bounds.top / scrollableDistance));
        const ramp = (value: number, start: number, end: number) => {
          const position = Math.max(0, Math.min(1, (value - start) / (end - start)));
          return position * position * (3 - 2 * position);
        };
        const opening = 1 - ramp(progress, 0.06, 0.23);
        const middle =
          ramp(progress, 0.2, 0.32) * (1 - ramp(progress, 0.8, 0.92));
        if (item.dataset.scrollStory === "hero") {
          main.classList.toggle("in-hero-scene", progress < 0.96);
        }

        item.style.setProperty("--story-progress", progress.toFixed(3));
        item.style.setProperty("--story-opening", opening.toFixed(3));
        item.style.setProperty("--story-middle", middle.toFixed(3));
        item.style.setProperty("--story-scale", (1 + progress * 0.2).toFixed(3));
        item.style.setProperty("--story-shift", `${(-progress * 42).toFixed(1)}px`);
        item.style.setProperty("--story-middle-shift", `${((1 - middle) * 24).toFixed(1)}px`);
        item.style.setProperty("--story-rotation", `${(progress * 220).toFixed(1)}deg`);
      });

      visibleZoomItems.forEach((item) => {
        const bounds = item.getBoundingClientRect();
        const distance = bounds.top + bounds.height / 2 - viewportCenter;
        const focus = Math.max(0, 1 - Math.abs(distance) / focusRange);
        const scale = 1.08 + focus * 0.2;
        const offset = Math.max(-18, Math.min(18, -distance * 0.025));
        item.style.setProperty("--scroll-scale", scale.toFixed(3));
        item.style.setProperty("--scroll-y", `${offset.toFixed(1)}px`);
      });
    };
    const scheduleZoom = () => {
      if (!frame) frame = window.requestAnimationFrame(updateZoom);
    };
    const zoomObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!(entry.target instanceof HTMLElement)) return;
          const item = entry.target;
          if (entry.isIntersecting) {
            visibleZoomItems.add(item);
            scheduleZoom();
          } else {
            visibleZoomItems.delete(item);
          }
        });
      },
      { rootMargin: "18% 0px" },
    );
    zoomItems.forEach((item) => zoomObserver.observe(item));
    window.addEventListener("scroll", scheduleZoom, { passive: true });
    window.addEventListener("resize", scheduleZoom);
    scheduleZoom();

    return () => {
      revealObserver.disconnect();
      zoomObserver.disconnect();
      window.removeEventListener("scroll", scheduleZoom);
      window.removeEventListener("resize", scheduleZoom);
      if (frame) window.cancelAnimationFrame(frame);
      main.classList.remove("motion-ready", "in-hero-scene");
    };
  }, []);

  useEffect(() => {
    const chapters = sectionLinks
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current?.target instanceof HTMLElement) {
          setActiveSection(current.target.id);
        }
      },
      { rootMargin: "-44% 0px -44% 0px", threshold: [0, 0.2, 0.5] },
    );
    chapters.forEach((chapter) => observer.observe(chapter));

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSectionsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormMessage(
      "Thanks for reaching out. This demo form is ready to connect to your inbox.",
    );
    event.currentTarget.reset();
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("hello@tiaz-collective.example");
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2000);
    } catch (error) {
      console.error("Could not copy the contact email.", error);
      setFormMessage("Copy didn’t work. Reach us at hello@tiaz-collective.example.");
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main className="site-content">
      <section className="hero" id="home" data-scroll-story="hero">
        <div className="hero-grain" />
        <header className="site-header hero-header">
          <a className="wordmark" href="#home" aria-label="Tiaz Collective home">
            <BrandMark />
            <span>tiaz collective</span>
          </a>
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Close" : "Menu"}
            <span className={menuOpen ? "menu-lines is-open" : "menu-lines"}>
              <i />
              <i />
            </span>
          </button>
          <nav
            className={menuOpen ? "main-nav is-open" : "main-nav"}
            id="site-navigation"
            aria-label="Main navigation"
          >
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#work" onClick={closeMenu}>Work</a>
            <a href="#people" onClick={closeMenu}>People</a>
            <a href="#contact" onClick={closeMenu}>Contact <span>↗</span></a>
          </nav>
        </header>

        <div className="hero-content">
          <OrbitalDrawing />
          <div className="hero-opening">
            <div className="hero-emblem">
              <div className="emblem-ring"><BrandMark /></div>
              <div className="emblem-type">tiaz<br />collective</div>
            </div>
            <p className="hero-kicker">Independent creative practice · Tokyo / Everywhere</p>
            <h1>Ideas find<br />their <em>form.</em></h1>
            <p className="hero-intro">
              Every meaningful thing begins somewhere quiet.
              <br />We help it find its shape, its voice, its people.
            </p>
          </div>
          <div className="hero-midpoint" aria-hidden="true">
            <p className="eyebrow">A practice of paying attention</p>
            <h2>Every beginning<br />has a story.</h2>
            <span>Listen for it. Follow the thread.</span>
          </div>
          <a className="scroll-cue" href="#about">
            <span>Scroll to discover</span>
            <i aria-hidden="true" />
          </a>
        </div>
        <span className="hero-side-note">A COLLECTIVE FOR WHAT COMES NEXT</span>
      </section>

      <section className="philosophy section-pad" id="about" data-scroll-story="philosophy">
        <span className="section-index">01 — A point of view</span>
        <div className="philosophy-content" data-reveal="up">
          <p className="eyebrow">Our philosophy</p>
          <h2>Before it becomes<br /><em>something,</em> it is a feeling.</h2>
          <div className="philosophy-copy">
            <p className="jp-line">まだ名前のない想いに、輪郭を。</p>
            <p>
              The beginnings are often hard to name: a question, a connection,
              a sense that something could be different. We pay attention to
              those first signals and follow them toward a clearer possibility.
            </p>
          </div>
          <div className="orbit-stamp" aria-hidden="true">
            <span>LISTEN · NOTICE · CONNECT ·</span>
            <i>✳</i>
          </div>
        </div>
      </section>

      <section className="introduction section-pad" data-scroll-story="introduction">
        <div className="intro-heading" data-reveal="left">
          <span className="section-index">02 — Who we are</span>
          <p className="eyebrow">A little introduction</p>
          <h2>Good work starts<br />with <em>good questions.</em></h2>
        </div>
        <div className="intro-copy" data-reveal="up">
          <p className="jp-line">想いと視点をつなぎ、これからの風景をつくる。</p>
          <p>
            Tiaz Collective is an independent creative collective bringing strategy,
            design, and words into the same conversation. We work with people
            building thoughtful businesses, places, and ideas—and help the
            world see what makes them matter.
          </p>
          <p>
            Small by intention, open by nature. We bring together the right
            perspectives for each project, then stay close from the first
            conversation to the finished experience.
          </p>
          <a className="text-link" href="#people">Meet the collective <span>↗</span></a>
        </div>
      </section>

      <section className="approach" data-scroll-story="process">
        <div className="approach-top section-pad">
          <div className="approach-intro" data-reveal="left">
            <span className="section-index">03 — How we work</span>
            <p className="eyebrow">The work before the work</p>
            <h2>First the why.<br />Then the <em>what.</em></h2>
            <p className="approach-description">
              A clear center makes every choice that follows feel more natural.
              We make space to find it together.
            </p>
          </div>
          <div className="approach-note" data-reveal="right">
            <span className="note-mark">“</span>
            <p>We don’t start with answers.<br />We start by paying attention.</p>
            <span className="note-caption">A way of working, not a formula</span>
          </div>
        </div>
        <div className="process-band">
          <div className="process-title" data-reveal="up">
            <p className="eyebrow">A considered process</p>
            <h3>Make space<br />for the right thing.</h3>
          </div>
          <div className="process-steps">
            <div data-reveal="up"><span>01</span><strong>Notice</strong><p>Listen closely. Gather what is already there.</p></div>
            <div data-reveal="up"><span>02</span><strong>Connect</strong><p>Find the thread that brings it all together.</p></div>
            <div data-reveal="up"><span>03</span><strong>Shape</strong><p>Make it tangible, useful, and unmistakable.</p></div>
          </div>
        </div>
      </section>

      <section className="service-index section-pad" aria-labelledby="services-title" data-scroll-story="service-index">
        <div className="service-index-heading" data-reveal="left">
          <span className="section-index">04 — What we do</span>
          <p className="eyebrow">A connected practice</p>
          <h2 id="services-title">One clear idea.<br /><em>Many ways to meet it.</em></h2>
          <p>Explore the parts of the work, or move between them as your project needs.</p>
        </div>
        <nav className="index-links" aria-label="Services" data-reveal="right">
          {services.map((service) => (
            <a href={`#${service.id}`} key={service.id}>
              <span>{service.number}</span>
              <strong>{service.name}</strong>
              <i aria-hidden="true">↘</i>
            </a>
          ))}
        </nav>
      </section>

      <section className="services" aria-label="Our services" data-scroll-story="services">
        {services.map((service) => (
          <article className={`service-row ${service.art}`} id={service.id} key={service.id}>
            <div className="service-art" aria-hidden="true" data-scroll-zoom data-reveal="up">
              <div className="service-art-visual">
                <span className="service-shape shape-a" />
                <span className="service-shape shape-b" />
                <span className="service-shape shape-c" />
              </div>
              <span className="service-art-label">{service.number} / TIAZ COLLECTIVE</span>
            </div>
            <div className="service-copy" data-reveal="up">
              <span className="service-number">{service.number} / 03</span>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <div className="tag-list">
                {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <a className="round-link" href="#contact" aria-label={`Ask us about ${service.name}`}>↗</a>
            </div>
          </article>
        ))}
      </section>

      <section className="manifesto section-pad" data-scroll-story="manifesto">
        <span className="section-index">05 — The way we see it</span>
        <div className="manifesto-content" data-reveal="up">
          <p className="eyebrow">What we shape</p>
          <h2>Not something new.<br />Something <em>more true.</em></h2>
          <p className="jp-line">そのものらしい、在り方へ。</p>
          <p className="manifesto-body">
            We believe the best identities don’t add noise. They make the
            essential easier to see. With curiosity, care, and a little
            patience, we help what is already meaningful come into focus.
          </p>
          <div className="manifesto-orbit" aria-hidden="true"><span>✳</span></div>
        </div>
      </section>

      <section className="work section-pad" id="work" data-scroll-story="projects">
        <div className="section-heading">
          <div data-reveal="left">
            <span className="section-index">06 — Selected work</span>
            <p className="eyebrow">Projects</p>
            <h2>Small worlds,<br /><em>carefully made.</em></h2>
          </div>
          <p className="heading-aside">A few things we’ve helped<br />find their form.</p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article
              className={`project-card ${index % 2 === 1 ? "project-offset" : ""}`}
              data-reveal="up"
              key={project.name}
              style={{ transitionDelay: `${(index % 2) * 100}ms` }}
            >
                <div className={`project-art ${project.art}`} data-scroll-zoom>
                  <div className="project-visual">
                    <span className="project-logo">{project.initials}</span>
                    <i className="project-orb" />
                  </div>
                <span className="project-art-caption">Tiaz Collective&nbsp; / &nbsp;{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="project-info">
                <div><h3>{project.name}</h3><p>{project.title}</p></div>
                <span className="project-discipline">{project.discipline}</span>
              </div>
            </article>
          ))}
        </div>
        <a className="round-cta" href="#contact">Start a conversation <span>↗</span></a>
      </section>

      <section className="people section-pad" id="people" data-scroll-story="collective">
        <div className="people-heading" data-reveal="left">
          <span className="section-index">07 — The people</span>
          <p className="eyebrow">Collective, by nature</p>
          <h2>Many hands.<br /><em>One shared care.</em></h2>
          <p>Independent minds, working side by side. We build the team around the work—not the other way around.</p>
        </div>
        <div className="people-grid">
          <article className="person person-founder" data-reveal="up">
            <div className="person-portrait portrait-founder" data-scroll-zoom><div className="portrait-visual"><span>AK</span><i /></div></div>
            <div className="person-meta"><span>Founder / Creative direction</span><h3>Aya Kondo</h3><p>Brand designer &amp; listener</p></div>
          </article>
          <article className="person person-member" data-reveal="up">
            <div className="person-portrait portrait-editor" data-scroll-zoom><div className="portrait-visual"><span>MI</span><i /></div></div>
            <div className="person-meta"><span>Words / Editorial</span><h3>Mei Ito</h3><p>Writer &amp; editor</p></div>
          </article>
          <article className="person person-member" data-reveal="up">
            <div className="person-portrait portrait-digital" data-scroll-zoom><div className="portrait-visual"><span>RT</span><i /></div></div>
            <div className="person-meta"><span>Digital / Development</span><h3>Ren Takahashi</h3><p>Designer &amp; maker</p></div>
          </article>
          <div className="people-footnote" data-reveal="up"><span>+</span><p>And a circle of thoughtful collaborators,<br />gathered around each new question.</p></div>
        </div>
      </section>

      <section className="journal section-pad" id="journal" data-scroll-story="journal">
        <div className="section-heading journal-heading">
          <div data-reveal="left">
            <span className="section-index">08 — Notes from the studio</span>
            <p className="eyebrow">Journal</p>
            <h2>Thoughts in<br /><em>the making.</em></h2>
          </div>
          <p className="heading-aside">A place for things we’re<br />still thinking about.</p>
        </div>
        <div className="journal-grid">
          {journal.map((entry) => (
            <article className="journal-card" data-reveal="up" key={entry.number}>
              <div className={`journal-art ${entry.color}`} data-scroll-zoom><div className="journal-art-visual"><span>{entry.number.replace("NOTE ", "N—")}</span><i>✳</i></div></div>
              <span className="journal-number">{entry.number} <i>·</i> FIELD NOTES</span>
              <h3>{entry.title}</h3>
              <p>{entry.summary}</p>
              <a href="#contact" aria-label={`Ask us about: ${entry.title}`}>Read the note <span>↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="news section-pad" id="news" data-scroll-story="news">
        <div className="news-title" data-reveal="left">
          <span className="section-index">09 — Studio news</span>
          <p className="eyebrow">Around the collective</p>
          <h2>Little things<br /><em>happening.</em></h2>
        </div>
        <div className="news-list" data-reveal="right">
          <a href="#contact"><time>2025.04.18</time><span>We opened our doors and made a little space for ideas.</span><i>↗</i></a>
          <a href="#contact"><time>2025.02.06</time><span>A conversation on building brands with a point of view.</span><i>↗</i></a>
          <a href="#contact"><time>2024.11.21</time><span>Field notes from a weekend in the mountains.</span><i>↗</i></a>
        </div>
      </section>

      <section className="contact section-pad" id="contact" data-scroll-story="contact">
        <div className="contact-heading" data-reveal="left">
          <span className="section-index">10 — Begin anywhere</span>
          <p className="eyebrow">Contact</p>
          <h2>Let’s start<br /><em>with a feeling.</em></h2>
          <p className="jp-line">言葉になる前に。</p>
          <p className="contact-blurb">
            A half-formed thought is a good place to begin. Tell us what you’re
            thinking about, and we’ll take it from there.
          </p>
          <a className="contact-email" href="mailto:hello@tiaz-collective.example">hello@tiaz-collective.example <span>↗</span></a>
        </div>
        <form className="contact-form" onSubmit={submitContact} data-reveal="right">
          <label>
            <span>Your name <i>*</i></span>
            <input name="name" placeholder="How should we call you?" required />
          </label>
          <label>
            <span>Email address <i>*</i></span>
            <input type="email" name="email" placeholder="you@example.com" required />
          </label>
          <label>
            <span>What are you thinking about? <i>*</i></span>
            <textarea name="message" rows={3} placeholder="A few words is plenty." required />
          </label>
          <label className="consent"><input type="checkbox" required /><span>I agree to the <a href="#privacy">privacy note</a>.</span></label>
          <button className="submit-button" type="submit">Send a note <span>↗</span></button>
          {formMessage && <p className="form-message" role="status">{formMessage}</p>}
        </form>
      </section>

      <footer className="footer" id="privacy">
        <div className="footer-top">
          <a className="footer-brand" href="#home"><BrandMark /><span>tiaz<br />collective</span></a>
          <div className="footer-note"><p>Independent by design.<br />Connected by curiosity.</p><span>Tokyo, Japan / Working everywhere</span></div>
          <div className="footer-links">
            <div><span>Explore</span><a href="#about">About</a><a href="#work">Selected work</a><a href="#people">Collective</a></div>
            <div><span>Say hello</span><a href="#contact">Contact</a><button type="button" onClick={copyEmail}>{emailCopied ? "Email copied ✓" : "Copy email ↗"}</button></div>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2025 Tiaz Collective</span><span>Made with attention, in Tokyo.</span><a href="#home">Back to top ↑</a></div>
      </footer>
      <aside className={`section-dock ${sectionsOpen ? "is-open" : ""}`}>
        <button
          className="section-dock-toggle"
          type="button"
          aria-expanded={sectionsOpen}
          aria-controls="section-dock-links"
          onClick={() => setSectionsOpen((open) => !open)}
        >
          <span aria-hidden="true">{sectionsOpen ? "−" : "+"}</span>
          Sections
        </button>
        <nav id="section-dock-links" aria-label="Page sections">
          {sectionLinks.map((section, index) => (
            <a
              className={activeSection === section.id ? "is-active" : ""}
              href={`#${section.id}`}
              key={section.id}
              onClick={() => setSectionsOpen(false)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {section.label}
            </a>
          ))}
        </nav>
      </aside>
    </main>
  );
}
