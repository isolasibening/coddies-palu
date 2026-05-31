import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    id: "stroller",
    name: "Stroller",
    slug: "stroller",
    icon: "Baby",
    priority: 1,
    featured: true,
  },
  {
    id: "car-seat",
    name: "Car Seat",
    slug: "car-seat",
    icon: "Car",
    priority: 2,
    featured: true,
  },
  {
    id: "box-bayi",
    name: "Box Bayi",
    slug: "box-bayi",
    icon: "BedDouble",
    priority: 3,
    featured: true,
  },
  {
    id: "high-chair",
    name: "High Chair",
    slug: "high-chair",
    icon: "Armchair",
    priority: 4,
    featured: true,
  },
  {
    id: "baby-walker",
    name: "Baby Walker",
    slug: "baby-walker",
    icon: "Footprints",
    priority: 5,
    featured: true,
  },
  {
    id: "mainan-besar",
    name: "Mainan Besar",
    slug: "mainan-besar",
    icon: "Puzzle",
    priority: 6,
    featured: true,
  },
  {
    id: "sepeda-anak",
    name: "Sepeda Anak",
    slug: "sepeda-anak",
    icon: "Bike",
    priority: 7,
    featured: true,
  },
  {
    id: "tidur",
    name: "Perlengkapan Tidur",
    slug: "perlengkapan-tidur",
    icon: "Moon",
    priority: 8,
  },
  {
    id: "makan",
    name: "Perlengkapan Makan",
    slug: "perlengkapan-makan",
    icon: "Soup",
    priority: 9,
  },
  {
    id: "baju-bayi",
    name: "Baju Bayi",
    slug: "baju-bayi",
    icon: "Shirt",
    priority: 10,
  },
];

export const getCategoryById = (id: string) =>
  categories.find((category) => category.id === id);
