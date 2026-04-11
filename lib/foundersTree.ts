export type FounderNode = {
  slug: string;
  name: string;
  role: string;
  era: string;
  summary: string;
  bio?: string[];
  quote?: string;
  linkedInUrl?: string;
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
    bio: [
      'Late Dr. Jammi Venkataramanayya founded the Jammi healing tradition in 1897, creating authentic Ayurvedic preparations rooted in classical texts and practical patient outcomes.',
      'His treatment methods became the foundation for generations of Jammi physicians and continue to guide both formulation discipline and ethical care standards.',
    ],
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
    bio: [
      'As a direct descendant of the legendary Dr. Jammi Venkataramanayya, Dr. Narasimham Jammi bears the mantle of a 128-year-old healing legacy. His life’s work is dedicated to standardizing ancient Ayurvedic formulations while preserving their intrinsic holistic potency.',
      'Trained deeply in classical texts and modern analytical techniques, he has spearheaded the company\'s transition from an apothecary model into a modern, compliance-driven pharmaceutical powerhouse without ever compromising the core tenets of Ayurveda.',
    ],
    quote: 'Our ancestors mapped the human body through the lens of nature. It is our duty to validate this map for the modern world.',
    linkedInUrl: 'https://www.linkedin.com/in/narasimham-jammi/',
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
    bio: [
      'Dr. Anitha Balachander is the clinical mind driving the efficacy and patient-centric approach of Jammi Pharmaceuticals. With decades of clinical experience, she bridges the gap between classical Ayurvedic diagnosis and contemporary patient care.',
      'She oversees the profound clinical protocols at our fortitudes, ensuring that whether a patient comes for pediatric care (like our famous Livercure) or geriatric neuromuscular rehabilitation, they receive the highest standard of personalized Ayurvedic medicine.',
    ],
    quote: 'Ayurveda is not an alternative medicine; for centuries, it has been the primary science of life, health, and profound healing.',
    linkedInUrl: 'https://www.linkedin.com/in/anitha-balachander-2ab7132/',
    image: '/images/founder_2.jpg',
  },
];

export const FOUNDERS_BY_SLUG: Record<string, FounderNode> = Object.fromEntries(
  FOUNDERS_TREE.map((node) => [node.slug, node]),
);
