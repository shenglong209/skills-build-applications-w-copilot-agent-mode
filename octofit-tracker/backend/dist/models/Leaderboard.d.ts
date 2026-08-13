import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<ILeaderboard, {}, {}, {}, mongoose.Document<unknown, {}, ILeaderboard, {}, mongoose.DefaultSchemaOptions> & ILeaderboard & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ILeaderboard>;
export default _default;
//# sourceMappingURL=Leaderboard.d.ts.map