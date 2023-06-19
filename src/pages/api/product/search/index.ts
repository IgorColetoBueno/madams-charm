import connectMongo from "@/config/db";
import Product, { IProduct } from "@/models/product";
import { SortItem } from "@/models/sort";
import { NextApiRequest, NextApiResponse } from "next";

const EMPTY_FILTER = { $regex: "", $options: "i" };

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { category = "", size, price } = req.query;

  try {
    await connectMongo();

    const valueSort = price
      ? (price as SortItem) === "asc"
        ? 1
        : -1
      : undefined;

    console.log(size);
    const products: IProduct[] = await Product.find({
      category: { $regex: category as string, $options: "i" },
      size: size ?? EMPTY_FILTER,
    })
      .sort({
        value: valueSort as any,
      })
      .exec();

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).send(error);
  }
}
