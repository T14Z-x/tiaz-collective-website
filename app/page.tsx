"use client";

import Image from "next/image";
import {
  FormEvent,
  MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const HERO_VIDEO = "/images/lv_7366645607231933703_20241113011715.MP4";
const APPROACH_VIDEO = "/images/approach-boat-web.mp4";
const PROCESS_VIDEO = "/images/process-horses-web.mp4";

const services = [
  {
    number: "01",
    id: "photography",
    name: "Still Photography",
    description:
      "Quiet frames shaped by natural light—from misty highland roads and rocky coastlines to late-night fog.",
    tags: ["Landscape", "Street", "Nocturne"],
    art: "foundation-art",
    image: "/images/IMG_2780.JPG",
    frame: "frame-portrait",
    objectPosition: "50% 48%",
  },
  {
    number: "02",
    id: "motion",
    name: "Motion & Short Films",
    description:
      "Atmospheric visual reels and short-form films cut with unhurried rhythm, sound texture, and presence.",
    tags: ["Direction", "Short Film", "Reels"],
    art: "identity-art",
    image: "/images/IMG_8501.jpg",
    frame: "frame-portrait",
    objectPosition: "50% 62%",
  },
  {
    number: "03",
    id: "direction",
    name: "Color & Visual Essays",
    description:
      "Sequencing, color grading, and editorial storytelling that turn scattered journeys into cohesive bodies of work.",
    tags: ["Color Grade", "Sequencing", "Editorial"],
    art: "experience-art",
    image: "/images/IMG_1590.jpg",
    frame: "frame-landscape",
    objectPosition: "50% 55%",
  },
];

type ProjectCategory = "All" | "Motion" | "Nocturne" | "Landscape";

type ProjectItem = {
  name: string;
  title: string;
  discipline: string;
  category: Exclude<ProjectCategory, "All">;
  art: string;
  image: string;
  frame: "frame-portrait" | "frame-landscape";
  objectPosition: string;
  video?: string;
  year: string;
  overview: string;
  outcome: string;
  deliverables: string[];
  gallery: { src: string; caption: string }[];
};

const projectCategories: ProjectCategory[] = ["All", "Motion", "Nocturne", "Landscape"];

const projects: ProjectItem[] = [
  {
    name: "Highland Roads",
    title: "Two wheels, open sky, and mountain air.",
    discipline: "Motion Reel · Road Photography",
    category: "Motion",
    art: "project-botanics",
    image: "/images/IMG_8503.JPG",
    frame: "frame-portrait",
    objectPosition: "50% 72%",
    video: HERO_VIDEO,
    year: "2025",
    overview:
      "Captured across winding hill passes and shaded forest highways. This series pairs handheld motion clips with still frames taken whenever the clouds broke over the ridge.",
    outcome:
      "A short visual film and companion photo sequence exploring solitude, speed, and the quiet stops between towns.",
    deliverables: ["Short Film", "Road Stills", "Color Grading", "Sound Design"],
    gallery: [
      { src: "/images/IMG_8503.JPG", caption: "Pause along the highland ridge" },
      { src: "/images/IMG_8501.jpg", caption: "Tree-lined avenue before the climb" },
      { src: "/images/IMG_5442.JPG", caption: "Panning study in motion" },
    ],
  },
  {
    name: "After Dark",
    title: "Smoke, mist, and sodium light.",
    discipline: "Nocturne · Atmosphere · Stills",
    category: "Nocturne",
    art: "project-still",
    image: "/images/IMG_4104.jpg",
    frame: "frame-portrait",
    objectPosition: "50% 70%",
    year: "2025",
    overview:
      "When the temperature drops and winter fog settles over the road, ordinary corners turn cinematic. Shot handheld in available light—campfires, streetlamps, and the last color of dusk.",
    outcome:
      "An intimate night series focused on warmth against darkness, grain, and quiet human silhouettes.",
    deliverables: ["Night Photography", "Available Light", "Editorial Sequence"],
    gallery: [
      { src: "/images/IMG_4104.jpg", caption: "Warmth by the roadside fire in winter mist" },
      { src: "/images/IMG_4111.JPG", caption: "Streetlamps fading into dense fog" },
      { src: "/images/IMG_2780.JPG", caption: "First star over dusk clouds" },
    ],
  },
  {
    name: "Still Waters",
    title: "Slow crossings beneath overhanging leaves.",
    discipline: "Editorial · Nature · Composition",
    category: "Landscape",
    art: "project-ground",
    image: "/images/IMG_2494.JPG",
    frame: "frame-portrait",
    objectPosition: "50% 52%",
    year: "2024",
    overview:
      "A study of waterlines, wooden boats, and quiet paths along the shore. Framed through foliage and wide overcast skies to hold onto the stillness of the morning.",
    outcome:
      "A calm photographic essay balancing turquoise water, lush canopy silhouettes, and open horizons.",
    deliverables: ["Landscape", "Framing Study", "Print Series"],
    gallery: [
      { src: "/images/IMG_2494.JPG", caption: "Wooden boat framed by riverside branches" },
      { src: "/images/20241015_072016 (2).JPG", caption: "Footpath curving beside the river" },
      { src: "/images/IMG_6567.JPG", caption: "Wide clouds reflected over calm water" },
    ],
  },
  {
    name: "Above the Valley",
    title: "Passing weather across green ridges.",
    discipline: "Travel · Landscape · Light",
    category: "Landscape",
    art: "project-fieldnotes",
    image: "/images/IMG_8250.JPG",
    frame: "frame-landscape",
    objectPosition: "50% 52%",
    year: "2024",
    overview:
      "High vantage points where rivers trace thin lines through the valley below. Shot while chasing shifting cloud shadows across remote hilltops and quiet outposts.",
    outcome:
      "Wide-format landscape frames celebrating scale, weather, and the deep greens of the hills.",
    deliverables: ["Travel Essay", "Wide Landscapes", "Color Palette"],
    gallery: [
      { src: "/images/IMG_8250.JPG", caption: "Valley river winding beneath cloud cover" },
      { src: "/images/IMG_8504.JPG", caption: "Red-roofed shelter on the crest" },
      { src: "/images/IMG_8239 2.JPG", caption: "Mountain pass under building clouds" },
    ],
  },
];

const soloFrames = [
  {
    role: "Behind the lens / Solo",
    name: "Walking into the quiet",
    bio: "Photographer & visual filmmaker documenting quiet roads, shifting weather, and everyday stillness.",
    image: "/images/IMG_5959.jpg",
    className: "person-founder",
    portraitClass: "portrait-founder",
  },
  {
    role: "On the road / Motion",
    name: "Chasing light between places",
    bio: "Most of my favorite frames happen five minutes after I stop rushing and let the scene settle.",
    image: "/images/IMG_5442.JPG",
    className: "person-member",
    portraitClass: "portrait-digital",
  },
];

const journal = [
  {
    number: "NOTE 01",
    date: "April 2025",
    readTime: "3 min read",
    title: "Why fog is my favorite lens filter",
    summary: "How mist strips away distraction and turns a single lamp into a whole story.",
    color: "note-peach",
    image: "/images/IMG_4111.JPG",
    body: [
      "Clear daylight shows everything at once, which can make a frame feel crowded before you even press the shutter.",
      "Fog does the editing for you. It softens the background, catches every beam of light, and leaves only the essential silhouettes standing.",
      "Some of my favorite frames—like a small roadside fire or a row of lamps disappearing into the night—only exist because I stepped outside when the weather looked too quiet to shoot.",
    ],
  },
  {
    number: "NOTE 02",
    date: "February 2025",
    readTime: "4 min read",
    title: "Cutting motion like a photograph",
    summary: "Holding a shot two seconds longer than feels comfortable.",
    color: "note-blue",
    image: "/images/IMG_8239 2.JPG",
    body: [
      "Modern reels push for fast cuts every half second, but the clips people actually replay are the ones that give them room to breathe.",
      "When I edit travel or road footage, I try to treat every clip like a moving still—letting the wind, engine hum, or passing clouds carry the pace instead of rushing to the next transition.",
    ],
  },
  {
    number: "NOTE 03",
    date: "November 2024",
    readTime: "3 min read",
    title: "Traveling light, noticing more",
    summary: "Why carrying less gear leads to more honest frames.",
    color: "note-yellow",
    image: "/images/IMG_8504.JPG",
    body: [
      "When you pack every lens and rig, you spend half the trip managing equipment instead of watching how the light changes across a valley.",
      "Riding out with a minimal kit forces you to move your feet, wait for the clouds, and stay present with the place in front of you.",
    ],
  },
];

const processSteps = [
  {
    num: "01",
    title: "Observe",
    summary: "Arrive early. Watch how the light and weather move.",
    detail:
      "Every frame starts with waiting—noticing reflections, silhouettes, and the quiet rhythm of a place.",
  },
  {
    num: "02",
    title: "Capture",
    summary: "Shoot both stills and motion with the same restraint.",
    detail:
      "Handheld, unobtrusive, and grounded in natural light so nothing feels staged or over-produced.",
  },
  {
    num: "03",
    title: "Sequence",
    summary: "Grade and edit into a story you can feel.",
    detail:
      "Color, pacing, and breathing room bring individual clips and frames together into one cohesive world.",
  },
];

const sectionLinks = [
  { id: "about", label: "Point of view" },
  { id: "services", label: "What I shoot" },
  { id: "work", label: "Selected work" },
  { id: "people", label: "Behind the lens" },
  { id: "journal", label: "Notes" },
  { id: "contact", label: "Contact" },
];

type DrawerState =
  | { type: "project"; index: number }
  | { type: "journal"; index: number }
  | { type: "privacy" }
  | null;

type ContactField = "name" | "email" | "message" | "consent";
type ContactErrors = Partial<Record<ContactField, string>>;

function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg
      className="ui-icon"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUp({ size = 13 }: { size?: number }) {
  return (
    <svg
      className="ui-icon"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 12.5v-9M4.5 7 8 3.5 11.5 7"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      className="ui-icon"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 3.5 12.5 12.5M12.5 3.5 3.5 12.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="ui-icon"
      width={14}
      height={14}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 8h9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {!open && (
        <path
          d="M8 3.5v9"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

function SparkIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      className="ui-icon spark-icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2.5v19M2.5 12h19M5.3 5.3l13.4 13.4M18.7 5.3 5.3 18.7"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      className="ui-icon"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 8.5 6.5 11.5 12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayBadgeIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      className="ui-icon"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4.5 3.2 12.8 8 4.5 12.8V3.2Z" />
    </svg>
  );
}

function RangefinderCamera({ flashing }: { flashing: boolean }) {
  return (
    <svg
      className={`footer-camera-svg ${flashing ? "is-flashing" : ""}`}
      viewBox="0 0 220 132"
      fill="none"
      aria-hidden="true"
    >
      {/* Top plate & shutter button */}
      <rect x="40" y="14" width="24" height="10" rx="3" stroke="currentColor" strokeWidth="1.4" />
      <rect className="camera-shutter-btn" x="46" y="7" width="12" height="7" rx="2" fill="currentColor" />
      <path d="M84 24 94 12h42l10 12" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      {/* Camera body */}
      <rect x="18" y="24" width="184" height="94" rx="14" stroke="currentColor" strokeWidth="1.5" fill="rgba(22, 27, 22, 0.72)" />
      {/* Grip accent */}
      <line x1="18" y1="48" x2="202" y2="48" stroke="currentColor" strokeOpacity="0.32" strokeWidth="1" />
      {/* Flash window */}
      <rect className="camera-flash-window" x="34" y="32" width="28" height="11" rx="3" stroke="currentColor" strokeWidth="1.2" />
      {/* Viewfinder */}
      <rect x="160" y="32" width="22" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.2" />
      {/* Lens barrel & aperture rings */}
      <circle cx="115" cy="74" r="34" stroke="currentColor" strokeWidth="1.5" fill="rgba(16, 20, 16, 0.85)" />
      <circle cx="115" cy="74" r="25" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.1" />
      <circle cx="115" cy="74" r="15" stroke="#d3eb91" strokeOpacity="0.85" strokeWidth="1.2" />
      <circle cx="115" cy="74" r="5" fill="#d3eb91" fillOpacity="0.8" />
      {/* Lens glint */}
      <path d="M104 63a14 14 0 0 1 11-5" stroke="#ffffff" strokeOpacity="0.65" strokeWidth="1.4" strokeLinecap="round" />
      {/* Record / status LED */}
      <circle cx="182" cy="64" r="3" fill="#d3eb91" />
    </svg>
  );
}

function BrandMark() {
  return (
    <svg
      className="brand-mark"
      viewBox="0 0 40 40"
      role="img"
      aria-label="Tiaz Portfolio"
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
  const [emailCopied, setEmailCopied] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<DrawerState>(null);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [cursorLabel, setCursorLabel] = useState("");
  const [cursorActive, setCursorActive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const [cameraFlashing, setCameraFlashing] = useState(false);
  const [frameCount, setFrameCount] = useState(36);
  const [workFilter, setWorkFilter] = useState<ProjectCategory>("All");
  const [lightbox, setLightbox] = useState<{
    items: { src: string; caption: string }[];
    index: number;
  } | null>(null);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
    consent: false,
  });
  const [formErrors, setFormErrors] = useState<ContactErrors>({});
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent">("idle");
  const [formMessage, setFormMessage] = useState("");

  const cursorRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const flashTimerRef = useRef<number | null>(null);
  const hasAutoFlashedRef = useRef(false);
  const drawerPanelRef = useRef<HTMLDivElement>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

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
    let lastScrollY = window.scrollY;
    const updateZoom = () => {
      frame = 0;
      const viewportCenter = window.innerHeight * 0.52;
      const focusRange = window.innerHeight * 0.8;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      const currentY = window.scrollY;
      const velocity = Math.max(-40, Math.min(40, currentY - lastScrollY));
      lastScrollY = currentY;

      const pageProgress = Math.max(0, Math.min(1, currentY / maxScroll));
      main.style.setProperty("--page-progress", pageProgress.toFixed(3));
      main.style.setProperty("--scroll-velocity", velocity.toFixed(2));

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

        const focusWave = Math.sin(progress * Math.PI);
        item.style.setProperty("--story-progress", progress.toFixed(3));
        item.style.setProperty("--story-opening", opening.toFixed(3));
        item.style.setProperty("--story-middle", middle.toFixed(3));
        item.style.setProperty("--story-focus", focusWave.toFixed(3));
        item.style.setProperty("--story-scale", (1 + progress * 0.2).toFixed(3));
        item.style.setProperty("--story-shift", `${(-progress * 42).toFixed(1)}px`);
        item.style.setProperty(
          "--story-middle-shift",
          `${((1 - middle) * 24).toFixed(1)}px`,
        );
        item.style.setProperty("--story-rotation", `${(progress * 240).toFixed(1)}deg`);
      });

      visibleZoomItems.forEach((item) => {
        const bounds = item.getBoundingClientRect();
        const distance = bounds.top + bounds.height / 2 - viewportCenter;
        const focus = Math.max(0, 1 - Math.abs(distance) / focusRange);
        const scale = 1.05 + focus * 0.14;
        const offset = Math.max(-18, Math.min(18, -distance * 0.028));
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
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId = 0;

    const tick = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;
      }
      rafId = window.requestAnimationFrame(tick);
    };

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      setCursorActive(true);

      const target = event.target as HTMLElement | null;
      const cursorTarget = target?.closest<HTMLElement>("[data-cursor]");
      setCursorLabel(cursorTarget?.dataset.cursor ?? "");
    };

    const onLeave = () => setCursorActive(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.cancelAnimationFrame(rafId);
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
      if (event.key === "Escape") {
        setLightbox((current) => {
          if (current) return null;
          setSectionsOpen(false);
          setActiveDrawer(null);
          setMenuOpen(false);
          return null;
        });
      } else if (event.key === "ArrowRight") {
        setLightbox((current) =>
          current
            ? { ...current, index: (current.index + 1) % current.items.length }
            : null,
        );
      } else if (event.key === "ArrowLeft") {
        setLightbox((current) =>
          current
            ? {
                ...current,
                index:
                  (current.index - 1 + current.items.length) %
                  current.items.length,
              }
            : null,
        );
      }
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  // Auto-pause ambient background videos when scrolled offscreen
  useEffect(() => {
    if (reducedMotion || !("IntersectionObserver" in window)) return;
    const videos = Array.from(
      document.querySelectorAll<HTMLVideoElement>("[data-ambient-video]"),
    );
    if (videos.length === 0) return;

    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { rootMargin: "15% 0px" },
    );
    videos.forEach((video) => videoObserver.observe(video));
    return () => videoObserver.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (!activeDrawer) {
      document.body.style.overflow = "";
      lastFocusedRef.current?.focus?.();
      return;
    }

    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => drawerCloseRef.current?.focus());

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !drawerPanelRef.current) return;
      const focusable = Array.from(
        drawerPanelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), video, [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", trapFocus);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", trapFocus);
    };
  }, [activeDrawer]);

  function validateField(field: ContactField, values = formValues): string | undefined {
    if (field === "name" && !values.name.trim()) {
      return "Please enter your name.";
    }
    if (field === "email") {
      if (!values.email.trim()) return "Please enter your email address.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
        return "Please enter a valid email address (e.g. you@example.com).";
      }
    }
    if (field === "message" && values.message.trim().length < 5) {
      return "Please share a few words about your project or shoot.";
    }
    if (field === "consent" && !values.consent) {
      return "Please agree to the privacy note before sending.";
    }
    return undefined;
  }

  function handleFieldBlur(field: ContactField) {
    const err = validateField(field);
    setFormErrors((prev) => {
      const next = { ...prev };
      if (err) next[field] = err;
      else delete next[field];
      return next;
    });
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields: ContactField[] = ["name", "email", "message", "consent"];
    const nextErrors: ContactErrors = {};
    fields.forEach((field) => {
      const err = validateField(field);
      if (err) nextErrors[field] = err;
    });

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      setFormMessage("");
      window.requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    setFormErrors({});
    setSubmitState("sending");
    setFormMessage("");

    window.setTimeout(() => {
      setSubmitState("sent");
      setFormMessage(
        "Thanks for reaching out. Your note is queued—this demo form is ready to connect to your inbox.",
      );
      setFormValues({ name: "", email: "", message: "", consent: false });
      window.setTimeout(() => setSubmitState("idle"), 2600);
    }, 450);
  }

  function handleHeroPointerMove(event: ReactMouseEvent<HTMLElement>) {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    heroRef.current.style.setProperty("--mx", nx.toFixed(3));
    heroRef.current.style.setProperty("--my", ny.toFixed(3));
  }

  useEffect(() => {
    const footerEl = footerRef.current;
    if (!footerEl || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFooterInView(true);
            if (
              !hasAutoFlashedRef.current &&
              !window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ) {
              hasAutoFlashedRef.current = true;
              window.setTimeout(() => {
                setCameraFlashing(true);
                flashTimerRef.current = window.setTimeout(() => {
                  setCameraFlashing(false);
                }, 520);
              }, 460);
            }
          }
        });
      },
      { threshold: 0.25 },
    );
    observer.observe(footerEl);
    return () => {
      observer.disconnect();
      if (flashTimerRef.current) window.clearTimeout(flashTimerRef.current);
    };
  }, []);

  function triggerCameraFlash() {
    if (reducedMotion) {
      setFrameCount((n) => n + 1);
      return;
    }
    if (flashTimerRef.current) window.clearTimeout(flashTimerRef.current);
    setCameraFlashing(false);
    window.requestAnimationFrame(() => {
      setCameraFlashing(true);
      setFrameCount((n) => n + 1);
      flashTimerRef.current = window.setTimeout(() => {
        setCameraFlashing(false);
      }, 520);
    });
  }

  function handleCardVideoEnter(event: ReactMouseEvent<HTMLElement>) {
    if (reducedMotion) return;
    const video = event.currentTarget.querySelector<HTMLVideoElement>("video");
    if (video) {
      video.play().catch(() => {});
    }
  }

  function handleCardVideoLeave(event: ReactMouseEvent<HTMLElement>) {
    const video = event.currentTarget.querySelector<HTMLVideoElement>("video");
    if (video) {
      video.pause();
    }
  }

  function handleMagneticMove(event: ReactMouseEvent<HTMLElement>) {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) * 0.28;
    const dy = (event.clientY - (rect.top + rect.height / 2)) * 0.28;
    el.style.setProperty("--mag-x", `${dx.toFixed(1)}px`);
    el.style.setProperty("--mag-y", `${dy.toFixed(1)}px`);
  }

  function handleMagneticLeave(event: ReactMouseEvent<HTMLElement>) {
    const el = event.currentTarget;
    el.style.setProperty("--mag-x", "0px");
    el.style.setProperty("--mag-y", "0px");
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("hello@tiaz-portfolio.example");
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2000);
    } catch (error) {
      console.error("Could not copy the contact email.", error);
      setFormMessage("Copy didn’t work. Reach me at hello@tiaz-portfolio.example.");
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function jumpToContactFromDrawer() {
    setActiveDrawer(null);
    window.setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  }

  const drawerProject =
    activeDrawer?.type === "project" ? projects[activeDrawer.index] : null;
  const drawerJournal =
    activeDrawer?.type === "journal" ? journal[activeDrawer.index] : null;
  const errorEntries = Object.entries(formErrors) as [ContactField, string][];
  const filteredProjects =
    workFilter === "All"
      ? projects
      : projects.filter((project) => project.category === workFilter);
  const activeSectionMeta =
    sectionLinks.find((section) => section.id === activeSection) ?? sectionLinks[0];
  const activeSectionNumber = String(
    sectionLinks.findIndex((section) => section.id === activeSection) + 1,
  ).padStart(2, "0");

  return (
    <main className="site-content">
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <div className="paper-grain" aria-hidden="true" />
      <div
        ref={cursorRef}
        className={`editorial-cursor ${cursorActive ? "is-active" : ""} ${cursorLabel ? "has-label" : ""}`}
        aria-hidden="true"
      >
        <span>{cursorLabel}</span>
      </div>

      <section
        ref={heroRef}
        className="hero"
        id="home"
        data-scroll-story="hero"
        onMouseMove={handleHeroPointerMove}
      >
        <div className="hero-video-wrap" aria-hidden="true">
          {!reducedMotion ? (
            <video
              className="hero-video"
              data-ambient-video
              src={HERO_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          ) : (
            <Image
              src="/images/IMG_8250.JPG"
              alt=""
              fill
              priority
              sizes="100vw"
              className="hero-video"
            />
          )}
          <div className="hero-video-scrim" />
        </div>
        <div className="hero-grain" />
        <header className={`site-header hero-header ${menuOpen ? "is-menu-open" : ""}`}>
          <a className="wordmark" href="#home" aria-label="Tiaz portfolio home">
            <BrandMark />
            <span>tiaz</span>
          </a>
          <button
            className="menu-toggle"
            type="button"
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
            <a href="#services" onClick={closeMenu}>Craft</a>
            <a href="#work" onClick={closeMenu}>Work</a>
            <a href="#people" onClick={closeMenu}>Behind the lens</a>
            <a href="#contact" onClick={closeMenu}>
              Contact <ArrowUpRight size={12} />
            </a>
          </nav>
        </header>

        <div className="hero-content">
          <div className="hero-orbit-stage">
            <OrbitalDrawing />
          </div>
          <div className="hero-opening">
            <div className="hero-emblem">
              <div className="emblem-ring"><BrandMark /></div>
              <div className="emblem-type">tiaz<br />visuals</div>
            </div>
            <p className="hero-kicker">Solo Photographer &amp; Filmmaker · Stills &amp; Motion</p>
            <h1 className="split-headline">
              <span className="split-line">
                <span style={{ animationDelay: "0.18s" }}>Light</span>{" "}
                <span style={{ animationDelay: "0.26s" }}>finds</span>
              </span>
              <span className="split-line">
                <span style={{ animationDelay: "0.34s" }}>its</span>{" "}
                <em style={{ animationDelay: "0.42s" }}>frame.</em>
              </span>
            </h1>
            <p className="hero-intro">
              Quiet photographs and short films gathered along open roads,
              <br />misty nights, and places worth slowing down for.
            </p>
          </div>
          <div className="hero-midpoint" aria-hidden="true">
            <p className="eyebrow">A practice of paying attention</p>
            <h2>Every frame<br />holds a moment.</h2>
            <span>Watch closely. Let it linger.</span>
          </div>
          <a className="scroll-cue" href="#about">
            <span>Scroll to explore</span>
            <i aria-hidden="true" />
          </a>
        </div>
        <span className="hero-side-note">PHOTOGRAPHY &amp; MOTION PORTFOLIO</span>
      </section>

      <section className="philosophy section-pad" id="about" data-scroll-story="philosophy">
        <div className="philosophy-bg" aria-hidden="true">
          <Image
            src="/images/IMG_8250.JPG"
            alt=""
            fill
            sizes="100vw"
            className="philosophy-bg-img"
          />
          <div className="philosophy-bg-scrim" />
        </div>
        <span className="section-index">01 — A point of view</span>
        <div className="philosophy-content" data-reveal="up">
          <p className="eyebrow">Visual philosophy</p>
          <h2>Before it becomes<br /><em>a frame,</em> it is a feeling.</h2>
          <div className="philosophy-copy">
            <p className="jp-line">まだ名前のない景色に、輪郭を。</p>
            <p>
              Whether it is a ten-second road clip or a single still in winter
              mist, I look for atmosphere first—the light, weather, and silence
              that make a place feel alive long after you leave it.
            </p>
          </div>
          <div className="orbit-stamp" aria-hidden="true">
            <span>OBSERVE · CAPTURE · FRAME ·</span>
            <SparkIcon size={20} />
          </div>
        </div>
      </section>

      <section className="introduction section-pad" data-scroll-story="introduction">
        <div className="intro-heading" data-reveal="left">
          <span className="section-index">02 — Who I am</span>
          <p className="eyebrow">Solo practice</p>
          <h2>Good frames start<br />with <em>slowing down.</em></h2>
          <figure className="intro-portrait" data-scroll-zoom>
            <div className="intro-portrait-visual">
              <Image
                src="/images/42BE51DC-CEAE-406E-8879-3EF8E90BC2AD.JPG"
                alt="Resting beside the river beneath red blossoms"
                fill
                sizes="(max-width: 760px) 92vw, 38vw"
              />
            </div>
            <figcaption>Stillness before the shutter · Riverside</figcaption>
          </figure>
        </div>
        <div className="intro-copy" data-reveal="up">
          <p className="jp-line">光と静けさをつなぎ、記憶の風景をつくる。</p>
          <p>
            I’m an independent photographer and visual filmmaker working across
            still photography, short films, and atmospheric travel essays. My
            work lives between open landscapes, night streets, and unhurried
            human moments.
          </p>
          <p>
            Available for commissioned shoots, visual storytelling, and
            creative collaborations—bringing a calm, cinematic eye from the
            first scout to the final grade.
          </p>
          <a className="text-link" href="#work">
            Explore selected work <ArrowUpRight />
          </a>
        </div>
      </section>

      <section className="approach" data-scroll-story="process">
        <div className="approach-top section-pad">
          <div className="approach-bg" aria-hidden="true">
            {!reducedMotion ? (
              <video
                className="approach-bg-video"
                data-ambient-video
                src={APPROACH_VIDEO}
                poster="/images/IMG_2494.JPG"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : (
              <Image
                src="/images/IMG_2494.JPG"
                alt=""
                fill
                sizes="100vw"
                className="approach-bg-video"
              />
            )}
            <div className="approach-bg-scrim" />
          </div>
          <div className="approach-intro" data-reveal="left">
            <span className="section-index">03 — How I shoot</span>
            <p className="eyebrow">Behind the camera</p>
            <h2>First the light.<br />Then the <em>shutter.</em></h2>
            <p className="approach-description">
              A strong image rarely comes from rushing. I give each location
              time to reveal its rhythm before pressing record.
            </p>
          </div>
          <div className="approach-note" data-reveal="right">
            <span className="note-mark">“</span>
            <p>I don’t stage the moment.<br />I wait until it feels true.</p>
            <span className="note-caption">A way of seeing, not a formula</span>
          </div>
        </div>
        <div className="process-band">
          <div className="process-bg" aria-hidden="true">
            {!reducedMotion ? (
              <video
                className="process-bg-video"
                data-ambient-video
                src={PROCESS_VIDEO}
                poster="/images/IMG_6567.JPG"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : (
              <Image
                src="/images/IMG_6567.JPG"
                alt=""
                fill
                sizes="100vw"
                className="process-bg-video"
              />
            )}
            <div className="process-bg-scrim" />
          </div>
          <div className="process-title" data-reveal="up">
            <p className="eyebrow">A considered process</p>
            <h3>Make space<br />for the right light.</h3>
            <p className="process-active-detail" aria-live="polite">
              {processSteps[activeProcessStep].detail}
            </p>
          </div>
          <div className="process-steps" role="tablist" aria-label="Process steps">
            {processSteps.map((step, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeProcessStep === index}
                key={step.num}
                className={`process-step-btn ${activeProcessStep === index ? "is-selected" : ""}`}
                onMouseEnter={() => setActiveProcessStep(index)}
                onClick={() => setActiveProcessStep(index)}
                data-reveal="up"
              >
                <span>{step.num}</span>
                <strong>{step.title}</strong>
                <p>{step.summary}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="services" id="services" aria-label="What I shoot" data-scroll-story="services">
        <div className="services-header">
          <span className="section-index">04 — What I shoot</span>
        </div>
        {services.map((service) => (
          <article className={`service-row ${service.art}`} id={service.id} key={service.id}>
            <div
              className={`service-art ${service.frame}`}
              data-scroll-zoom
              data-reveal="up"
            >
              <div className="service-art-visual">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  sizes="(max-width: 760px) 92vw, 48vw"
                  style={{ objectPosition: service.objectPosition }}
                />
              </div>
              <span className="service-art-label">{service.number} / TIAZ VISUALS</span>
            </div>
            <div className="service-copy" data-reveal="up">
              <span className="service-number">{service.number} / 03</span>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <div className="tag-list">
                {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <a
                className="round-link magnetic-btn"
                href="#contact"
                aria-label={`Inquire about ${service.name}`}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
              >
                <ArrowUpRight size={15} />
              </a>
            </div>
          </article>
        ))}
      </section>

      <div className="kinetic-marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>STILL PHOTOGRAPHY</span><SparkIcon size={16} />
          <span>SHORT FILMS</span><i>·</i>
          <span>NOCTURNES</span><i>·</i>
          <span>ROAD STORIES</span><SparkIcon size={16} />
          <span>COLOR &amp; MOTION</span><i>·</i>
          <span>AVAILABLE LIGHT</span><SparkIcon size={16} />
          <span>STILL PHOTOGRAPHY</span><SparkIcon size={16} />
          <span>SHORT FILMS</span><i>·</i>
          <span>NOCTURNES</span><i>·</i>
          <span>ROAD STORIES</span><SparkIcon size={16} />
          <span>COLOR &amp; MOTION</span><i>·</i>
          <span>AVAILABLE LIGHT</span><SparkIcon size={16} />
        </div>
      </div>

      <section className="work section-pad" id="work" data-scroll-story="projects">
        <div className="section-heading">
          <div data-reveal="left">
            <span className="section-index">05 — Selected work</span>
            <p className="eyebrow">Stills &amp; Motion</p>
            <h2>Quiet worlds,<br /><em>in light &amp; motion.</em></h2>
          </div>
          <p className="heading-aside">Selected photo essays &amp;<br />motion reels.</p>
        </div>
        <div className="work-filters" role="tablist" aria-label="Filter selected work">
          {projectCategories.map((category) => (
            <button
              type="button"
              role="tab"
              aria-selected={workFilter === category}
              key={category}
              className={`work-filter-pill ${workFilter === category ? "is-active" : ""}`}
              onClick={() => setWorkFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="project-grid">
          {filteredProjects.map((project, index) => {
            const originalIndex = projects.findIndex((p) => p.name === project.name);
            return (
            <article
              className={`project-card ${index % 2 === 1 ? "project-offset" : ""}`}
              data-reveal="up"
              key={project.name}
              style={{ transitionDelay: `${(index % 2) * 100}ms` }}
            >
              <button
                type="button"
                className={`project-art ${project.art} ${project.frame} ${project.video ? "has-video" : ""}`}
                data-scroll-zoom
                data-cursor={project.video ? "PLAY" : "VIEW"}
                onClick={() => setActiveDrawer({ type: "project", index: originalIndex })}
                onMouseEnter={project.video ? handleCardVideoEnter : undefined}
                onMouseLeave={project.video ? handleCardVideoLeave : undefined}
                aria-label={`Open ${project.name} ${project.video ? "reel and gallery" : "photo gallery"}`}
              >
                <div className="project-visual">
                  <Image
                    src={project.image}
                    alt={`${project.name} — ${project.title}`}
                    fill
                    sizes="(max-width: 760px) 92vw, 52vw"
                    style={{ objectPosition: project.objectPosition }}
                  />
                  {project.video && !reducedMotion && (
                    <video
                      className="project-hover-video"
                      src={project.video}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  )}
                </div>
                {project.video && (
                  <span className="media-badge">
                    <PlayBadgeIcon size={10} /> Motion Reel
                  </span>
                )}
                <span className="project-art-caption">
                  Series&nbsp; / &nbsp;{String(originalIndex + 1).padStart(2, "0")} · {project.gallery.length} Frames
                </span>
                <span className="project-art-hint">
                  {project.video ? "Watch reel" : "View series"} <ArrowUpRight size={12} />
                </span>
              </button>
              <div className="project-info">
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.title}</p>
                  <button
                    type="button"
                    className="case-study-trigger"
                    onClick={() => setActiveDrawer({ type: "project", index: originalIndex })}
                  >
                    {project.video ? "Watch reel & frames" : "Open photo series"} <ArrowUpRight />
                  </button>
                </div>
                <span className="project-discipline">{project.discipline}</span>
              </div>
            </article>
            );
          })}
        </div>
        <a
          className="round-cta magnetic-btn"
          href="#contact"
          onMouseMove={handleMagneticMove}
          onMouseLeave={handleMagneticLeave}
        >
          Book a shoot or collaboration <ArrowUpRight />
        </a>
      </section>

      <section className="people section-pad" id="people" data-scroll-story="collective">
        <div className="people-heading" data-reveal="left">
          <span className="section-index">06 — Behind the lens</span>
          <p className="eyebrow">Solo portfolio</p>
          <h2>One eye.<br /><em>Always on the road.</em></h2>
          <p>
            Every photograph and clip on this site is shot, sequenced, and
            graded personally—from mountain highways to late-night fog.
          </p>
        </div>
        <div className="people-grid">
          {soloFrames.map((frame) => (
            <article className={`person ${frame.className}`} data-reveal="up" key={frame.name}>
              <div
                className={`person-portrait ${frame.portraitClass}`}
                data-scroll-zoom
              >
                <div className="portrait-visual">
                  <Image
                    src={frame.image}
                    alt={`${frame.name} — ${frame.role}`}
                    fill
                    sizes="(max-width: 760px) 92vw, 44vw"
                  />
                </div>
              </div>
              <div className="person-meta">
                <span>{frame.role}</span>
                <h3>{frame.name}</h3>
                <p>{frame.bio}</p>
              </div>
            </article>
          ))}
          <div className="people-footnote" data-reveal="up">
            <PlusMinusIcon open={false} />
            <p>Available for travel commissions, editorial photography,<br />and short-form visual direction worldwide.</p>
          </div>
        </div>
      </section>

      <section className="journal section-pad" id="journal" data-scroll-story="journal">
        <div className="section-heading journal-heading">
          <div data-reveal="left">
            <span className="section-index">07 — Field notes</span>
            <p className="eyebrow">Journal</p>
            <h2>Notes from<br /><em>the road.</em></h2>
          </div>
          <p className="heading-aside">Thoughts on light, pacing,<br />and shooting solo.</p>
        </div>
        <div className="journal-grid">
          {journal.map((entry, index) => (
            <article
              className="journal-card"
              data-reveal="up"
              data-cursor="READ"
              key={entry.number}
              onClick={() => setActiveDrawer({ type: "journal", index })}
            >
              <div
                className={`journal-art ${entry.color}`}
                data-scroll-zoom
              >
                <div className="journal-art-visual">
                  <Image
                    src={entry.image}
                    alt={entry.title}
                    fill
                    sizes="(max-width: 760px) 92vw, 48vw"
                  />
                </div>
                <span className="journal-art-badge">{entry.number.replace("NOTE ", "N—")}</span>
              </div>
              <span className="journal-number">{entry.number} <i>·</i> FIELD NOTES</span>
              <h3>{entry.title}</h3>
              <p>{entry.summary}</p>
              <button
                type="button"
                className="journal-trigger"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveDrawer({ type: "journal", index });
                }}
                aria-label={`Read note: ${entry.title}`}
              >
                Read the note <ArrowUpRight />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="contact section-pad" id="contact" data-scroll-story="contact">
        <div className="contact-heading" data-reveal="left">
          <span className="section-index">08 — Say hello</span>
          <p className="eyebrow">Contact</p>
          <h2>Let’s make<br /><em>something visual.</em></h2>
          <p className="jp-line">言葉になる前に。</p>
          <p className="contact-blurb">
            Looking for stills, a short film, or a visual collaborator? Share a
            few lines about your idea and let’s talk.
          </p>
          <a className="contact-email" href="mailto:hello@tiaz-portfolio.example">
            hello@tiaz-portfolio.example <ArrowUpRight />
          </a>
          <div className="social-links" aria-label="Social profiles">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={12} /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube <ArrowUpRight size={12} /></a>
            <a href="https://vimeo.com" target="_blank" rel="noreferrer">Vimeo <ArrowUpRight size={12} /></a>
          </div>
        </div>
        <form className="contact-form" onSubmit={submitContact} noValidate data-reveal="right">
          {errorEntries.length > 0 && (
            <div
              ref={errorSummaryRef}
              className="form-error-summary"
              role="alert"
              tabIndex={-1}
              aria-labelledby="form-error-title"
            >
              <p id="form-error-title">Please review the highlighted fields:</p>
              <ul>
                {errorEntries.map(([field, message]) => (
                  <li key={field}>
                    <a href={`#contact-${field}`}>{message}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <label htmlFor="contact-name">
            <span>Your name <i>*</i></span>
            <input
              id="contact-name"
              name="name"
              value={formValues.name}
              onChange={(e) => setFormValues((v) => ({ ...v, name: e.target.value }))}
              onBlur={() => handleFieldBlur("name")}
              aria-invalid={Boolean(formErrors.name)}
              aria-describedby={formErrors.name ? "contact-name-error" : undefined}
              placeholder="How should I call you?"
            />
            {formErrors.name && (
              <p id="contact-name-error" className="field-error">
                {formErrors.name}
              </p>
            )}
          </label>

          <label htmlFor="contact-email">
            <span>Email address <i>*</i></span>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={formValues.email}
              onChange={(e) => setFormValues((v) => ({ ...v, email: e.target.value }))}
              onBlur={() => handleFieldBlur("email")}
              aria-invalid={Boolean(formErrors.email)}
              aria-describedby={formErrors.email ? "contact-email-error" : undefined}
              placeholder="you@example.com"
            />
            {formErrors.email && (
              <p id="contact-email-error" className="field-error">
                {formErrors.email}
              </p>
            )}
          </label>

          <label htmlFor="contact-message">
            <span>Tell me about your shoot or idea <i>*</i></span>
            <textarea
              id="contact-message"
              name="message"
              rows={3}
              value={formValues.message}
              onChange={(e) => setFormValues((v) => ({ ...v, message: e.target.value }))}
              onBlur={() => handleFieldBlur("message")}
              aria-invalid={Boolean(formErrors.message)}
              aria-describedby={formErrors.message ? "contact-message-error" : undefined}
              placeholder="A few words is plenty."
            />
            {formErrors.message && (
              <p id="contact-message-error" className="field-error">
                {formErrors.message}
              </p>
            )}
          </label>

          <div className="consent-block">
            <label className="consent" htmlFor="contact-consent">
              <input
                id="contact-consent"
                type="checkbox"
                checked={formValues.consent}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFormValues((v) => ({ ...v, consent: checked }));
                  if (checked) {
                    setFormErrors((prev) => {
                      const next = { ...prev };
                      delete next.consent;
                      return next;
                    });
                  }
                }}
                aria-invalid={Boolean(formErrors.consent)}
                aria-describedby={formErrors.consent ? "contact-consent-error" : undefined}
              />
              <span>
                I agree to the{" "}
                <button
                  type="button"
                  className="inline-link-btn"
                  onClick={() => setActiveDrawer({ type: "privacy" })}
                >
                  privacy note
                </button>
                .
              </span>
            </label>
            {formErrors.consent && (
              <p id="contact-consent-error" className="field-error">
                {formErrors.consent}
              </p>
            )}
          </div>

          <button
            className={`submit-button magnetic-btn ${submitState === "sent" ? "is-sent" : ""}`}
            type="submit"
            disabled={submitState === "sending"}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
          >
            <span>
              {submitState === "sending"
                ? "Sending note…"
                : submitState === "sent"
                  ? "Note received"
                  : "Send a note"}
            </span>
            {submitState === "sent" ? <CheckIcon size={15} /> : <ArrowUpRight size={15} />}
          </button>
          {formMessage && (
            <p className="form-message" role="status" aria-live="polite">
              {formMessage}
            </p>
          )}
        </form>
      </section>

      <footer
        ref={footerRef}
        className={`footer ${footerInView ? "is-exposed" : ""} ${cameraFlashing ? "is-flashing" : ""}`}
        id="privacy"
      >
        <div className="footer-bg" aria-hidden="true">
          <Image
            src="/images/IMG_6648.jpg"
            alt=""
            fill
            sizes="100vw"
            className="footer-bg-img"
          />
          <div className="footer-bg-scrim" />
        </div>
        <div className="camera-flash-overlay" aria-hidden="true" />
        <div className="viewfinder-corners" aria-hidden="true">
          <i className="vf-tl" />
          <i className="vf-tr" />
          <i className="vf-bl" />
          <i className="vf-br" />
        </div>

        <div className="footer-camera-stage">
          <button
            type="button"
            className="footer-camera-btn"
            onClick={triggerCameraFlash}
            aria-label="Fire camera shutter and flash"
          >
            <RangefinderCamera flashing={cameraFlashing} />
            <span className="camera-readout">
              1/250s · f/2.8 · ISO 400 · FRAME {String(frameCount).padStart(2, "0")} — CLICK TO SHOOT
            </span>
          </button>
        </div>

        <div className="footer-top">
          <a className="footer-brand" href="#home"><BrandMark /><span>tiaz<br />visuals</span></a>
          <div className="footer-note"><p>Stills &amp; motion.<br />Captured in natural light.</p><span>Available for commissions everywhere</span></div>
          <div className="footer-links">
            <div><span>Explore</span><a href="#about">About</a><a href="#services">Craft</a><a href="#work">Selected work</a><a href="#people">Behind the lens</a></div>
            <div>
              <span>Say hello</span>
              <a href="#contact">Contact</a>
              <button type="button" className="footer-copy-btn" onClick={copyEmail}>
                {emailCopied ? (
                  <>Email copied <CheckIcon size={12} /></>
                ) : (
                  <>Copy email <ArrowUpRight size={12} /></>
                )}
              </button>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Tiaz Visuals</span>
          <span>All photographs &amp; films shot on location.</span>
          <a className="back-to-top" href="#home">Back to top <ArrowUp /></a>
        </div>
      </footer>

      <nav className="floating-nav" aria-label="Quick navigation">
        <a href="#work">Work</a>
        <a href="#contact" className="floating-nav-cta">
          Contact <ArrowUpRight size={12} />
        </a>
      </nav>

      <aside className={`section-dock ${sectionsOpen ? "is-open" : ""}`}>
        <button
          className="section-dock-toggle"
          type="button"
          aria-expanded={sectionsOpen}
          aria-controls="section-dock-links"
          onClick={() => setSectionsOpen((open) => !open)}
        >
          <PlusMinusIcon open={sectionsOpen} />
          <span className="dock-active-label">
            {activeSectionNumber} · {activeSectionMeta.label}
          </span>
          <i className="dock-progress" aria-hidden="true" />
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

      {activeDrawer && (
        <div
          className="drawer-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={
            drawerProject
              ? `${drawerProject.name} gallery`
              : drawerJournal
                ? drawerJournal.title
                : "Privacy note"
          }
          onClick={() => setActiveDrawer(null)}
        >
          <div
            ref={drawerPanelRef}
            className="drawer-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-header">
              <span className="drawer-eyebrow">
                {drawerProject
                  ? `SELECTED WORK · ${drawerProject.year}`
                  : drawerJournal
                    ? `${drawerJournal.number} · ${drawerJournal.date} · ${drawerJournal.readTime}`
                    : "PORTFOLIO POLICY · PRIVACY"}
              </span>
              <button
                ref={drawerCloseRef}
                type="button"
                className="drawer-close"
                onClick={() => setActiveDrawer(null)}
                aria-label="Close panel"
              >
                <CloseIcon />
              </button>
            </div>

            {drawerProject && (
              <div className="drawer-body">
                <h2>{drawerProject.name}</h2>
                <p className="drawer-subtitle">{drawerProject.title}</p>

                {drawerProject.video ? (
                  <div className="drawer-video-wrap">
                    <video
                      src={drawerProject.video}
                      poster={drawerProject.image}
                      controls
                      playsInline
                      preload="metadata"
                      className="drawer-video"
                    />
                  </div>
                ) : (
                  <button
                    type="button"
                    className="drawer-media drawer-media-btn"
                    onClick={() =>
                      setLightbox({ items: drawerProject.gallery, index: 0 })
                    }
                    aria-label={`Open ${drawerProject.name} full-screen`}
                  >
                    <img
                      src={drawerProject.image}
                      alt={drawerProject.name}
                      className="drawer-full-photo"
                    />
                    <span className="drawer-expand-hint">Expand ↗</span>
                  </button>
                )}

                <div className="drawer-section">
                  <h3>The story</h3>
                  <p>{drawerProject.overview}</p>
                </div>
                <div className="drawer-section">
                  <h3>The frames</h3>
                  <p>{drawerProject.outcome}</p>
                </div>

                <div className="drawer-gallery">
                  {drawerProject.gallery.map((item, galleryIdx) => (
                    <figure className="drawer-gallery-item" key={item.src}>
                      <button
                        type="button"
                        className="drawer-gallery-img drawer-media-btn"
                        onClick={() =>
                          setLightbox({
                            items: drawerProject.gallery,
                            index: galleryIdx,
                          })
                        }
                        aria-label={`View full-screen: ${item.caption}`}
                      >
                        <img
                          src={item.src}
                          alt={item.caption}
                          className="drawer-full-photo"
                          loading="lazy"
                        />
                        <span className="drawer-expand-hint">Expand ↗</span>
                      </button>
                      <figcaption>{item.caption}</figcaption>
                    </figure>
                  ))}
                </div>

                <div className="drawer-tags">
                  {drawerProject.deliverables.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <button
                  type="button"
                  className="drawer-cta"
                  onClick={jumpToContactFromDrawer}
                >
                  Inquire about prints or a shoot <ArrowUpRight />
                </button>
              </div>
            )}

            {drawerJournal && (
              <div className="drawer-body">
                <h2>{drawerJournal.title}</h2>
                <p className="drawer-subtitle">{drawerJournal.summary}</p>
                <button
                  type="button"
                  className="drawer-media drawer-media-btn"
                  onClick={() =>
                    setLightbox({
                      items: [{ src: drawerJournal.image, caption: drawerJournal.title }],
                      index: 0,
                    })
                  }
                  aria-label={`Open ${drawerJournal.title} image full-screen`}
                >
                  <img
                    src={drawerJournal.image}
                    alt={drawerJournal.title}
                    className="drawer-full-photo"
                  />
                  <span className="drawer-expand-hint">Expand ↗</span>
                </button>
                <div className="drawer-essay">
                  {drawerJournal.body.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                <button
                  type="button"
                  className="drawer-cta"
                  onClick={jumpToContactFromDrawer}
                >
                  Start a conversation <ArrowUpRight />
                </button>
              </div>
            )}

            {activeDrawer.type === "privacy" && (
              <div className="drawer-body">
                <h2>Privacy note</h2>
                <p className="drawer-subtitle">
                  How I treat the messages you share here.
                </p>
                <div className="drawer-essay">
                  <p>
                    Any name, email address, or project note you send through
                    this portfolio is used solely to reply to your inquiry. Your
                    contact details are never shared or sold.
                  </p>
                  <p>
                    If you’d like an earlier message deleted at any time, write
                    to hello@tiaz-portfolio.example.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {lightbox && (
        <div
          className="lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.items[lightbox.index].caption}
          onClick={() => setLightbox(null)}
        >
          <div className="lightbox-top" onClick={(e) => e.stopPropagation()}>
            <span className="lightbox-counter">
              {String(lightbox.index + 1).padStart(2, "0")} /{" "}
              {String(lightbox.items.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setLightbox(null)}
              aria-label="Close full-screen photo"
            >
              <CloseIcon size={18} />
            </button>
          </div>

          <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
            {lightbox.items.length > 1 && (
              <button
                type="button"
                className="lightbox-nav lightbox-prev"
                onClick={() =>
                  setLightbox((cur) =>
                    cur
                      ? {
                          ...cur,
                          index: (cur.index - 1 + cur.items.length) % cur.items.length,
                        }
                      : null,
                  )
                }
                aria-label="Previous photo"
              >
                ←
              </button>
            )}
            <img
              src={lightbox.items[lightbox.index].src}
              alt={lightbox.items[lightbox.index].caption}
              className="lightbox-img"
            />
            {lightbox.items.length > 1 && (
              <button
                type="button"
                className="lightbox-nav lightbox-next"
                onClick={() =>
                  setLightbox((cur) =>
                    cur ? { ...cur, index: (cur.index + 1) % cur.items.length } : null,
                  )
                }
                aria-label="Next photo"
              >
                →
              </button>
            )}
          </div>

          <p className="lightbox-caption" onClick={(e) => e.stopPropagation()}>
            {lightbox.items[lightbox.index].caption}
          </p>
        </div>
      )}
    </main>
  );
}
