import connectMongo from "@/config/db";
import Product, { IProduct } from "@/models/product";
import AWS from "aws-sdk";
import Busboy from "busboy";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

interface IFileMetaData {
  encoding: string;
  filename: string;
  mimeType: string;
}

export default async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const contentType = req.headers["content-type"];

  if (!contentType || !contentType.includes("multipart/form-data")) {
    res.status(400).json({ error: "Invalid content type" });
    return;
  }

  await connectMongo();

  const busboy = Busboy({ headers: req.headers });
  const files: Promise<AWS.S3.ManagedUpload.SendData>[] = [];
  const fields: any = {};

  busboy.on(
    "file",
    (
      fieldname: string,
      file: any,
      fileMetaData: IFileMetaData,
      encoding: string,
      mimetype: string
    ) => {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: uuidv4() + fileMetaData.filename,
        Body: file,
        ContentType: mimetype,
      };

      try {
        const response = s3.upload(params).promise();

        files.push(response);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
  );

  busboy.on("field", (fieldname, val) => {
    fields[fieldname] = val;
  });

  busboy.on("finish", async () => {
    const savedFiles = await Promise.all(files);

    const product = Product.findByIdAndUpdate(fields._id, {
      name: fields.name,
      promotionalMessage: fields.promotionalMessage,
      value: fields.value,
      size: fields.size,
      category: fields.category,
      buyValue: fields.buyValue,
      buyDate: new Date(fields.buyDate),
      photos: [...fields.photos, ...savedFiles.map((file) => file.Location)],
    } as IProduct);

    return res.status(200).json({ product });
  });

  req.pipe(busboy);
}
