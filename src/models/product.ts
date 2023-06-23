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

export type ProductSize =
  | "PP"
  | "PP/P"
  | "P"
  | "P/M"
  | "M"
  | "M/G"
  | "G"
  | "G/GG"
  | "GG"
  | "GG/XG"
  | "XG"
  | "P/GG"
  | "M/G/GG"
  | "P/G"
  | "P/M/G/GG"
  | "P/M/GG"
  | "P/G/GG"
  | "M/GG";

export const PRODUCT_SIZE_LIST: ProductSize[] = [
  "PP",
  "PP/P",
  "P",
  "P/M",
  "M",
  "M/G",
  "G",
  "G/GG",
  "GG",
  "GG/XG",
  "XG",
  "P/GG",
  "M/G/GG",
  "P/G",
  "P/M/G/GG",
  "P/M/GG",
  "P/G/GG",
  "M/GG",
];

export interface IProduct {
  _id: string;
  name: string;
  promotionalMessage: string;
  value: number;
  buyValue: number;
  buyDate: Date;
  category: ProductCategory;
  size: ProductSize;
  photos: string[];
}
const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  promotionalMessage: String,
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
  buyValue: {
    type: Number,
    required: true,
  },
  buyDate: {
    type: Date,
    required: true,
  },
  photos: {
    type: [String],
    required: true,
  },
});

const Product = models?.Product || model<IProduct>("Product", productSchema);

export default Product;
