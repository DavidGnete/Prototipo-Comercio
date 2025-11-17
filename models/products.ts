import mongoose, {Document, Model} from "mongoose";


export interface IUser extends Document {
  name: string;
  price: string;
  image_url: string;
  public_id: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true, trim: true },
  price: { type: String, required: true, trim: true },
  image_url: { type: String, required: true, trim: true },
  public_id: { type: String, required: true, trim: true }
  
 
}, {
  timestamps: { createdAt: "createdAt", updatedAt: false }
});

// avoid model overwrite in dev
export const Product: Model<IUser> = mongoose.models.Product || mongoose.model<IUser>("Product", UserSchema);
