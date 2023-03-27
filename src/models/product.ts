import { Schema, model, models } from "mongoose";

export type ProductCategory =
  | "Baby doll"
  | "Calcinha"
  | "Camisola"
  | "Corset"
  | "Lingerie"
  | "Pijama"
  | "Robe"
  | "Roupa de praia"
  | "Sutiã de amamentação"
  | "Vestido";

export const PRODUCT_CATEGORY_LIST: ProductCategory[] = [
  "Baby doll",
  "Calcinha",
  "Camisola",
  "Corset",
  "Lingerie",
  "Pijama",
  "Robe",
  "Roupa de praia",
  "Sutiã de amamentação",
  "Vestido",
];

export type ProductSize = "PP" | "P" | "M" | "G" | "GG" | "XG";

export const PRODUCT_SIZE_LIST: ProductSize[] = [
  "PP",
  "P",
  "M",
  "G",
  "GG",
  "XG",
];

export interface IProduct {
  _id: string;
  name: string;
  promotionalMessage: string;
  value: number;
  category: ProductCategory;
  size: ProductSize;
  photos: string[];
}
const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  promotionalMessage: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  photos: {
    type: [String],
    required: true,
  },
});

const Product = models?.Product || model<IProduct>("Product", productSchema);

export default Product;
