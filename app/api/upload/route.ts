import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { Product } from "@/models/products";
import { MongoConnection } from "@/lib/conection/db";

export async function POST(request: Request) {
    await MongoConnection();

  const data = await request.formData();

  const image = data.get("file");
  const name = data.get("name");
  const price = data.get("price");

  if (!image || !(image instanceof File)) {
    return NextResponse.json(
      { error: "No se ha subido ninguna imagen" },
      { status: 400 }
    );
  }

  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

   const uploadResult: any = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "productos" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    stream.end(buffer);
  });

  const product = await Product.create({
    name,
    price,
    image_url:uploadResult.secure_url,
    public_id: uploadResult.public_id
  });

  return NextResponse.json({
    message: "Imagen subida",
    product
  });
}
