import { NextResponse } from "next/server";
import Category from "@/models/category";
import { MongoConnection } from "@/lib/conection/db";

export async function GET() {
  await MongoConnection();

  const categories = await Category.find().sort({ name: 1 }).select("name slug");

  return NextResponse.json({ categories });
}
