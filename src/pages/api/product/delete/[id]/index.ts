import connectMongo from "@/config/db";
import Product from "@/models/product";
import { NextApiRequest, NextApiResponse } from "next";

export default async function DELETE(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    await connectMongo();

    await Product.findByIdAndDelete(id).exec();

    return res.status(204).json({});
  } catch (error) {
    return res.status(500).send({ error });
  }
}
