import connectMongo from "@/config/db";
import Product, { IProduct } from "@/models/product";
import { IProductResponse } from "@/models/product-response";
import { SortItem } from "@/models/sort";
import { NextApiRequest, NextApiResponse } from "next";

const EMPTY_FILTER = { $regex: "", $options: "i" };
const PAGE_SIZE = 16;

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { category = "", size, price, page = "0" } = req.query;

  const skip = Number(page) * PAGE_SIZE;

  try {
    await connectMongo();

    const valueSort = price
      ? (price as SortItem) === "asc"
        ? 1
        : -1
      : undefined;

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / PAGE_SIZE);

    const products: IProduct[] = await Product.find({
      category: { $regex: category as string, $options: "i" },
      size: size ?? EMPTY_FILTER,
    })
      .sort({
        value: valueSort as any,
      })
      .skip(skip)
      .limit(PAGE_SIZE)
      .exec();

    return res.status(200).json({
      hasPreviousPage: Number(page) > 0,
      hasNextPage: Number(page) + 1 < totalPages,
      data: products,
    } as IProductResponse);
  } catch (error) {
    return res.status(500).send(error);
  }
}
