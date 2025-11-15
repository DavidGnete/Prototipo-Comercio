import mongoose, {Document, Model} from "mongoose";


export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  password: string; // hashed
  createdAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true, lowercase: true },
  phone: { type: String, required: false, trim: true },
  password: { type: String, required: true },
}, {
  timestamps: { createdAt: "createdAt", updatedAt: false }
});

// avoid model overwrite in dev
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
