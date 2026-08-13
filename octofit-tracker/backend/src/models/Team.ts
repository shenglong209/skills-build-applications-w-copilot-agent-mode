import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  sport: string;
  captainId?: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, trim: true },
    sport: { type: String, required: true, trim: true },
    captainId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export default mongoose.model<ITeam>('Team', teamSchema);
