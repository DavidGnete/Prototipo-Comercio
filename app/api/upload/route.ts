// app/api/products/route.ts
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
/* ADDED */
import * as yup from 'yup';
import { Product } from "@/models/products";
import Category from "@/models/category";
import { MongoConnection } from "@/lib/conection/db";

export async function POST(request: Request) {
  await MongoConnection();

  const data = await request.formData();

  const image = data.get("file");
  const category = data.get("category");
  const name = data.get("name");
  const price = data.get("price");

  const productSchema = yup.object({
    name: yup.string().required('El nombre es obligatorio'),
    price: yup.number().typeError('Precio inválido').required('El precio es obligatorio').positive('El precio debe ser mayor que 0'),
    category: yup.string().required('La categoría es obligatoria')
  });

  try {
    // formData values might be non-string, coerce as needed
    await productSchema.validate({ name: String(name || ''), price: Number(price), category: String(category || '') });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Datos inválidos' }, { status: 400 });
  }

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

  
  let categoryId: any = category;
  let categorySlug: string | null = null;

  if (typeof category === 'string' && category.length > 0) {
    categorySlug = category;
    
    let found = await Category.findOne({ slug: categorySlug });
    if (!found) {
  
      const nameFromSlug = categorySlug.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      found = await Category.create({ name: nameFromSlug, slug: categorySlug });
    }
    categoryId = found._id;
  }

  const product = await Product.create({
    name,
    category: categoryId,
    price,
    image_url: uploadResult.secure_url,
    public_id: uploadResult.public_id,
  });


  try {
    if (categorySlug) {
      const mongoose = (await import('mongoose')).default;
      const db = mongoose.connection.db;
      // Insert a copy of the product into a collection named after the slug
      const productObj = JSON.parse(JSON.stringify(product));
    
      if (db) await db.collection(categorySlug).insertOne(productObj as any);
    }
  } catch (err) {

    console.error('Failed to write to category collection:', err);
  }

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
