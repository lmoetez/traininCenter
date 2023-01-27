import mongoose, { PopulatedDoc, Schema, Document } from 'mongoose'
import { IUser } from '.'

export interface IFormation {
   name: string
   niveau: string
   sessionNumber: number
   owner: PopulatedDoc<IUser & Document>
   formateur: PopulatedDoc<IUser & Document>
}

const formationSchema = new mongoose.Schema(
   {
      name: { type: String },
      niveau: { type: String },
      sessionNumber: { type: Number, default: 0 },
      owner: { type: Schema.Types.ObjectId, ref: 'User' },
      formateur: { type: Schema.Types.ObjectId, ref: 'User' },
   },
   { versionKey: false, timestamps: true }
)
const FormationModel = mongoose.model<IFormation & Document>(
   //nom de collection
   'Formation',
   //schema de collection
   formationSchema
)
export { FormationModel }
