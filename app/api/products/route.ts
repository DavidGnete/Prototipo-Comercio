// app/api/products/route.ts
import { NextResponse } from "next/server";
import { Product } from "@/models/products";
import { MongoConnection } from "@/lib/conection/db";

export async function GET(req: Request) {
  await MongoConnection();

  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "4");

  const totalProducts = await Product.countDocuments();
  const totalPages = Math.ceil(totalProducts / limit);

  const products = await Product.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return NextResponse.json({ products, totalPages });
}
