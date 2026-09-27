/**
 * Single source of truth for all portfolio content — sections read from here
 * so copy, tags and links stay consistent end-to-end.
 */

export const site = {
  name: 'Elizabeth Hayati',
  monogram: 'EH',
  title: 'Creative Director & Digital Designer',
  email: 'hello@elizabethhayati.com',
  location: 'Amsterdam, NL — working worldwide',
} as const

/** Split subtitle row that flanks the hero subject */
export const heroSubLeft = ['CREATIVE DIRECTOR', 'DIGITAL DESIGNER'] as const
export const heroSubRight = ['ANIMATION ENTHUSIAST'] as const

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
] as const

export type WorkArt = 'brand' | 'reel' | 'app'

export interface WorkProject {
  id: string
  index: string
  title: string
  blurb: string
  year: string
  tags: string[]
  art: WorkArt
}

export const workProjects: WorkProject[] = [
  {
    id: 'brand-identity',
    index: '01',
    title: 'Brand Identity',
    blurb:
      'A minimal identity system built on confident typography, warm neutrals and a monogram that behaves like a signature.',
    year: '2025',
    tags: ['Logo Systems', 'Art Direction', 'Guidelines'],
    art: 'brand',
  },
  {
    id: 'motion-reel',
    index: '02',
    title: 'Motion Graphics Reel',
    blurb:
      'A fast-cut reel of kinetic typography, seamless transitions and playful 3D moments — rhythm you can feel.',
    year: '2026',
    tags: ['After Effects', 'Kinetic Type', '3D'],
    art: 'reel',
  },
  {
    id: 'app-design',
    index: '03',
    title: 'App Design',
    blurb:
      'A calm, content-first mobile experience with a crisp component library and motion that guides, never distracts.',
    year: '2024',
    tags: ['UX / UI', 'Design System', 'Prototyping'],
    art: 'app',
  },
]

export const marqueeItems = [
  'BRAND IDENTITY',
  'MOTION DESIGN',
  'ART DIRECTION',
  'UX / UI',
  'TYPOGRAPHY',
  'ANIMATION',
] as const

export const about = {
  eyebrow: '( 02 ) — ABOUT ME',
  headlineLead: 'Design with',
  headlineAccent: 'a pulse.',
  paragraphs: [
    "I'm Elizabeth — a creative director and digital designer who believes great work should feel effortless and look inevitable. For the past seven years I've helped brands find their voice, then taught it to move.",
    'My sweet spot lives between identity and motion: building systems in the morning and animating them by afternoon. Warm palettes, sharp grids, and rhythm baked into every frame.',
  ],
  stats: [
    { value: '7+', label: 'Years of practice' },
    { value: '40+', label: 'Projects shipped' },
    { value: '12', label: 'Design awards' },
  ],
  skills: [
    'Brand Strategy',
    'Art Direction',
    'Visual Identity',
    'Motion Design',
    'Kinetic Typography',
    'UX / UI',
    'Design Systems',
    'Prototyping',
    'Figma',
    'After Effects',
    'Blender',
    'Webflow',
  ],
  experience: [
    { role: 'Creative Director', place: 'Studio Hayati — Independent', period: '2023 — Now' },
    { role: 'Senior Digital Designer', place: 'Northwind Agency', period: '2021 — 2023' },
    { role: 'Motion Designer', place: 'Frame & Field', period: '2019 — 2021' },
    { role: 'Visual Design Intern', place: 'Kiosk Creative', period: '2018 — 2019' },
  ],
} as const

export interface Social {
  id: string
  label: string
  handle: string
  href: string
}

export const socials: Social[] = [
  { id: 'linkedin', label: 'LinkedIn', handle: '@elizabethhayati', href: 'https://www.linkedin.com/' },
  { id: 'behance', label: 'Behance', handle: '@elizabethhayati', href: 'https://www.behance.net/' },
  { id: 'dribbble', label: 'Dribbble', handle: '@elizabethhayati', href: 'https://dribbble.com/' },
]
