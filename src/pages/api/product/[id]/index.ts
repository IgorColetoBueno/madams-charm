import connectMongo from "@/config/db";
import Product, { IProduct } from "@/models/product";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    await connectMongo();

    const product: IProduct = await Product.findById(id).exec();

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).send(error);
  }
}
