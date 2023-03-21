import AWS from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";
import Busboy from "busboy";
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

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const contentType = req.headers["content-type"];

  if (!contentType || !contentType.includes("multipart/form-data")) {
    res.status(400).json({ error: "Invalid content type" });
    return;
  }

  const busboy = Busboy({ headers: req.headers });
  const files: any = {};
  const fields: any = {};

  busboy.on(
    "file",
    async (
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
        const result = await s3.upload(params).promise();

        files[fieldname] = result.Location;
      } catch (error) {
        res.status(500).json(error);
      }
    }
  );

  busboy.on("field", (fieldname, val) => {
    fields[fieldname] = val;
  });

  busboy.on("finish", () => {
    // Log the other form values
    console.log("Name:", fields.name);
    console.log("Email:", fields.email);

    // Log the uploaded files URLs
    Object.keys(files).forEach((key) => {
      console.log(`${key}: ${files[key]}`);
    });

    res.status(200).json({ success: true });
  });

  req.pipe(busboy);
}
