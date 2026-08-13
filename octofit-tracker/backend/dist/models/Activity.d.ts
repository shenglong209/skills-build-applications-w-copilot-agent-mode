import mongoose, { Document } from 'mongoose';
export interface IActivity extends Document {
    userId: mongoose.Types.ObjectId;
    type: string;
    durationMinutes: number;
    distanceKm?: number;
    caloriesBurned?: number;
    date: Date;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IActivity, {}, {}, {}, mongoose.Document<unknown, {}, IActivity, {}, mongoose.DefaultSchemaOptions> & IActivity & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IActivity>;
export default _default;
//# sourceMappingURL=Activity.d.ts.map