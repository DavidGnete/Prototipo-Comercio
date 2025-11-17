import { NextResponse } from "next/server";
import { Product } from "@/models/products";
import { MongoConnection } from "@/lib/conection/db";

export async function GET() {
  await MongoConnection();
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json(products);
}
