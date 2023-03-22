import Product, { IProduct } from "@/models/product";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { category, size } = req.query;

  try {
    const products: IProduct[] = await Product.find({
      category: { $regex: category as string, $options: "i" },
      size: { $regex: size as string, $options: "i" },
    });

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).send("Error retrieving products from database");
  }
}
