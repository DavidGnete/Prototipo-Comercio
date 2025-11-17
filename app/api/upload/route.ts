// app/api/products/route.ts
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
    return NextResponse.json({ error: "No se ha subido ninguna imagen" }, { status: 400 });
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
    image_url: uploadResult.secure_url,
    public_id: uploadResult.public_id,
  });

  return NextResponse.json({
    message: "Imagen subida",
    product,
  });
}

// ---------------------------------------------------
// GET para listar productos con paginación
export async function GET(request: Request) {
  await MongoConnection();

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "6"); // productos por página
  const skip = (page - 1) * limit;

  const products = await Product.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments();
  const totalPages = Math.ceil(total / limit);

  return NextResponse.json({ products, total, totalPages, page });
}
