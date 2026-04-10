
export interface Product {
  id: string;
  name: string;
  label?: string;
  shortDesc: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  rating?: number;
  reviewsCount?: number;
  botanicals?: {
    name: string;
    desc: string;
    image: string;
  }[];
  ritual?: {
    title: string;
    desc: string;
  }[];
  results?: {
    percentage: string;
    text: string;
  }[];
  features?: {
    title: string;
    desc: string;
    icon: string;
  }[];
  banner?: {
    title: string;
    subtitle: string;
    desc: string;
    image: string;
    stats: { label: string; icon: string }[];
  };
  quote?: {
    text: string;
    author: string;
  };
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  verified: boolean;
  articleCount: number;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  doctor: Doctor;
  date: string;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}
