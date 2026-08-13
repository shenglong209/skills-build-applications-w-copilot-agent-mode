import mongoose, { Document } from 'mongoose';
export interface ITeam extends Document {
    name: string;
    sport: string;
    captainId?: mongoose.Types.ObjectId;
    members: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<ITeam, {}, {}, {}, mongoose.Document<unknown, {}, ITeam, {}, mongoose.DefaultSchemaOptions> & ITeam & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITeam>;
export default _default;
//# sourceMappingURL=Team.d.ts.map