export type Project = {
  slug: string;
  title: string;
  category: "Web" | "Mobile" | "Print";
  description: string;
  images: string[];
  year: number;
};

export const projects: Project[] = [
  {
    slug: "atlas-dashboard",
    title: "Atlas Dashboard",
    category: "Web",
    description:
      "A data-rich analytics dashboard with modular widgets and dark mode.",
    images: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&q=80&auto=format&fit=crop",
    ],
    year: 2024,
  },
  {
    slug: "breeze-store",
    title: "Breeze Store",
    category: "Web",
    description:
      "An e-commerce storefront focused on delightful product pages and checkout UX.",
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1600&q=80&auto=format&fit=crop",
    ],
    year: 2023,
  },
  {
    slug: "pocket-photo",
    title: "Pocket Photo",
    category: "Mobile",
    description: "A mobile-first photo-editing app with real-time filters.",
    images: [
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1600&q=80&auto=format&fit=crop",
    ],
    year: 2022,
  },
  {
    slug: "paper-goods",
    title: "Paper Goods",
    category: "Print",
    description:
      "Branding and print collateral for a boutique stationery label.",
    images: [
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=1600&q=80&auto=format&fit=crop",
    ],
    year: 2021,
  },
  {
    slug: "loom-chat",
    title: "Loom Chat",
    category: "Mobile",
    description: "A lightweight messaging app with expressive reactions.",
    images: [
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1600&q=80&auto=format&fit=crop",
    ],
    year: 2024,
  },
  {
    slug: "folio-print",
    title: "Folio Print",
    category: "Print",
    description: "A printed portfolio series exploring type and layout.",
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=80&auto=format&fit=crop",
    ],
    year: 2020,
  },
  {
    slug: "north-star",
    title: "North Star",
    category: "Web",
    description: "A landing page template for startups and product launches.",
    images: [
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=1600&q=80&auto=format&fit=crop",
    ],
    year: 2025,
  },
];

export function getAllProjects() {
  return projects;
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug) ?? null;
}
