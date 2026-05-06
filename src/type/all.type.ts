/* eslint-disable @typescript-eslint/no-explicit-any */
export type Section = {
  id: string;
  title: string;
  layoutType: LayoutType;
  items: MenuItem[];
};

export type LayoutType = "3 Image Row" | "Image List" | "List View";

export type MenuItem = {
  id: string;
  itemNumber: string;
  name: string;
  price: number;
  promoPrice?: number;
  inventory: number;
  stock: number;
  status: string;
  rating?: number;
  image?: any;
  labels?: string[];
};