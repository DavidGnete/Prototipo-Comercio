import mongoose, {Document, Model} from "mongoose";


export interface IProduct extends Document {
  name: string;
  category: mongoose.Schema.Types.ObjectId | string;
  price: string;
  image_url: string;
  public_id: string;
}

const ProductSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true, trim: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true, trim: true },
  price: { type: String, required: true, trim: true },
  image_url: { type: String, required: true, trim: true },
  public_id: { type: String, required: true, trim: true }
  
 
}, {

  timestamps: { createdAt: "createdAt", updatedAt: false },
  // explicitly use the existing MongoDB collection named 'Product'
  collection: 'Product' /* ADDED */
});


export const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
