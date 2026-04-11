export type FounderNode = {
  slug: string;
  name: string;
  role: string;
  era: string;
  summary: string;
  lineageFrom?: string;
  image?: string;
};

export const FOUNDERS_TREE: FounderNode[] = [
  {
    slug: 'dr-jammi-venkataramanayya',
    name: 'Dr. Jammi Venkataramanayya',
    role: 'Founder and Legacy Architect',
    era: 'Since 1897',
    summary:
      'Established the Jammi healing legacy and codified core formulations that continue to guide the institution.',
    image: '/images/Thatha%20Logo%20-Since%201897.png',
  },
  {
    slug: 'dr-narasimham-jammi',
    name: 'Dr. Narasimham Jammi',
    role: 'Visionary and Co-Founder',
    era: 'Modern Expansion',
    lineageFrom: 'dr-jammi-venkataramanayya',
    summary:
      'Carried forward the classical lineage and standardized Jammi therapeutics for contemporary healthcare practice.',
    image: '/images/founder_1.png',
  },
  {
    slug: 'dr-anitha-balachander',
    name: 'Dr. Anitha Balachander',
    role: 'Co-Founder and Chief Medical Officer',
    era: 'Clinical Leadership',
    lineageFrom: 'dr-jammi-venkataramanayya',
    summary:
      'Leads patient-centered clinical protocols, integrating rigorous diagnostics with classical Ayurvedic care.',
    image: '/images/founder_2.jpg',
  },
];

export const FOUNDERS_BY_SLUG: Record<string, FounderNode> = Object.fromEntries(
  FOUNDERS_TREE.map((node) => [node.slug, node]),
);
