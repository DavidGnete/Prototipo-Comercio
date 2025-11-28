// app/api/products/route.ts
import { NextResponse } from "next/server";
import { Product } from "@/models/products";
import { MongoConnection } from "@/lib/conection/db";

export async function GET(req: Request) {
  await MongoConnection();

  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "4");
  const category = url.searchParams.get("category");

  // If category filter present, count documents matching it.
  const filter: any = {};
  if (category) {

    const mongoose = (await import('mongoose')).default;
    if (mongoose.isValidObjectId(category)) {
      filter.category = category;
    } else {
      // try to resolve slug to category _id
      const Category = (await import('@/models/category')).default;
      const found = await Category.findOne({ slug: category });
      if (found) filter.category = found._id;
      else {
        // if not found by slug, keep a filter that will match nothing
        filter.category = null;
      }
    }
  }

  try {
    /* ADDED */
    // wrap DB calls in try/catch so errors are reported clearly
    const mongoose = (await import('mongoose')).default; /* ADDED */
    if (mongoose.connection.readyState !== 1) {
      console.error('MongoDB connection not ready', mongoose.connection.readyState);
      return NextResponse.json({ error: 'Database connection not established' }, { status: 500 });
    }
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    // query and populate category inline (avoid using Product.populate on plain arrays)
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({ path: "category", select: "name slug" });

    return NextResponse.json({ products, totalPages, page });
  } catch (err: any) {
    console.error('Failed to fetch products', err);
    return NextResponse.json({ error: err?.message || 'Failed to fetch products' }, { status: 500 });
  }
}
