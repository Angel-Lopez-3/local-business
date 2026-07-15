// Set de iconos SVG livianos, sin dependencias externas.
// Todos aceptan className para heredar tamano/color via Tailwind.

const base = "h-5 w-5";

export const IconHome = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 11.5 12 4l9 7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 10v9a1 1 0 0 0 1 1H9.5a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1H17.5a1 1 0 0 0 1-1v-9" />
  </svg>
);

export const IconStore = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 9.5 5 4h14l1 5.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 9.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 11v8a1 1 0 0 0 1 1H10v-5h4v5h3.5a1 1 0 0 0 1-1v-8" />
  </svg>
);

export const IconGrid = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <rect x="4" y="4" width="7" height="7" rx="1.5" />
    <rect x="13" y="4" width="7" height="7" rx="1.5" />
    <rect x="4" y="13" width="7" height="7" rx="1.5" />
    <rect x="13" y="13" width="7" height="7" rx="1.5" />
  </svg>
);

export const IconMapPin = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12Z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

export const IconHeart = ({ className = base, filled = false }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20s-7.5-4.6-9.7-9.2C.7 7.4 2.4 4 6 4c2 0 3.4 1 6 3.5C14.6 5 16 4 18 4c3.6 0 5.3 3.4 3.7 6.8C19.5 15.4 12 20 12 20Z" />
  </svg>
);

export const IconUser = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <circle cx="12" cy="8" r="3.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20c1.3-3.5 4.3-5.5 7.5-5.5s6.2 2 7.5 5.5" />
  </svg>
);

export const IconUsers = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <circle cx="9" cy="8" r="3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 19c1-2.8 3.4-4.5 6.5-4.5s5.5 1.7 6.5 4.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 5.2a3 3 0 0 1 0 5.6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 14.7c2.3.5 4 2 4.7 4.3" />
  </svg>
);

export const IconLogOut = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20H5.5a1.5 1.5 0 0 1-1.5-1.5v-13A1.5 1.5 0 0 1 5.5 4H9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 16.5 20 12l-4.5-4.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H9" />
  </svg>
);

export const IconPlus = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path strokeLinecap="round" d="M12 5v14M5 12h14" />
  </svg>
);

export const IconEdit = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 4.5 19.5 7.5 8 19H5v-3L16.5 4.5Z" />
  </svg>
);

export const IconTrash = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 7h14M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0 1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />
  </svg>
);

export const IconCheck = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 5 5L20 7" />
  </svg>
);

export const IconX = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const IconStar = ({ className = base, filled = false }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m12 3 2.9 6 6.6.9-4.8 4.6 1.1 6.5L12 17.9 6.2 21l1.1-6.5-4.8-4.6 6.6-.9L12 3Z" />
  </svg>
);

export const IconSearch = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path strokeLinecap="round" d="m19.5 19.5-4.3-4.3" />
  </svg>
);

export const IconShield = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.5 5 6v5.5c0 4.6 3 7.9 7 9.5 4-1.6 7-4.9 7-9.5V6l-7-2.5Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
  </svg>
);

export const IconFlag = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 3.5v17" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 4.5c2-1 4-1 6 0s4 1 6 0v9c-2 1-4 1-6 0s-4-1-6 0Z" />
  </svg>
);

export const IconImage = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
    <circle cx="9" cy="10" r="1.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m6 18 5-5 3 3 2-2 3 3" />
  </svg>
);

export const IconWrench = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 6.5a4 4 0 0 0-5.4 4.9L4 16.5V20h3.5l5.1-5.1a4 4 0 0 0 4.9-5.4l-2.6 2.6-2-2 2.6-2.6Z" />
  </svg>
);

export const IconChevronLeft = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m15 5-7 7 7 7" />
  </svg>
);

export const IconChevronDown = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
  </svg>
);

export const IconMenu = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const IconPhone = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 3.5h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5C11.8 18.2 5.8 12.2 4.5 6.1A1.5 1.5 0 0 1 6 3.5Z" />
  </svg>
);

export const IconMail = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <rect x="3.5" y="5" width="17" height="14" rx="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m4 6.5 8 6.5 8-6.5" />
  </svg>
);

export const IconGlobe = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path strokeLinecap="round" d="M3.5 12h17M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5s-1.2 6.2-3.4 8.5c-2.2-2.3-3.4-5.3-3.4-8.5S9.8 5.8 12 3.5Z" />
  </svg>
);

export const IconClock = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
  </svg>
);

export const IconAlert = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4.5" />
    <circle cx="12" cy="16.2" r="0.4" fill="currentColor" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.6 3.9 2.9 17.5A1.6 1.6 0 0 0 4.3 20h15.4a1.6 1.6 0 0 0 1.4-2.5L13.4 3.9a1.6 1.6 0 0 0-2.8 0Z" />
  </svg>
);

export const IconSparkles = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3.5M12 17.5V21M3 12h3.5M17.5 12H21M5.6 5.6l2.5 2.5M15.9 15.9l2.5 2.5M18.4 5.6l-2.5 2.5M8.1 15.9l-2.5 2.5" />
  </svg>
);

export const IconBriefcase = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <rect x="3.5" y="7.5" width="17" height="12" rx="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5" />
    <path strokeLinecap="round" d="M3.5 12.5h17" />
  </svg>
);
