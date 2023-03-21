import { Schema, model, models } from "mongoose";

export interface IProduct {
  name: string;
  promotionalMessage: string;
  value: number;
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
  value: {
    type: Number,
    required: true,
  },
  photos: {
    type: [String],
    required: true,
  },
});

const Product = models.Product || model<IProduct>("Product", productSchema);

export default Product;
