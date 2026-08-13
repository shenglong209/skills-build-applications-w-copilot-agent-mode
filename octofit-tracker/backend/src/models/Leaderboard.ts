import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  teamName?: string;
  points: number;
  rank: number;
  streak: number;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    teamName: { type: String, trim: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    streak: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

export default mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
