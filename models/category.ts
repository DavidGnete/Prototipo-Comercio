import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },        // "Bebidas"
  slug: { type: String, required: true, unique: true }, // "bebidas"
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);