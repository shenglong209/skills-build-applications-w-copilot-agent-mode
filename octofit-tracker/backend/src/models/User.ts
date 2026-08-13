import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  teamId?: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      default: 'demo-password-hash',
    },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    goals: [{ type: String }],
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IUser>('User', userSchema);
