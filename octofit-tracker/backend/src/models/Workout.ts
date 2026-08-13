import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  type: string;
  durationMinutes: number;
  difficulty: 'easy' | 'moderate' | 'advanced';
  equipment: string[];
  focus: string;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 10 },
    difficulty: {
      type: String,
      enum: ['easy', 'moderate', 'advanced'],
      default: 'moderate',
    },
    equipment: [{ type: String }],
    focus: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export default mongoose.model<IWorkout>('Workout', workoutSchema);
