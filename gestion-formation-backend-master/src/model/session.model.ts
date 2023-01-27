import mongoose, { PopulatedDoc, Schema } from 'mongoose'
import { ISeance, IFormation } from '.'

export interface ISession {
   name: string
   dateStart: Date
   dateFin: Date
   className: string
   nbrPlace: number
   seance: PopulatedDoc<ISeance & Document>[]
   formation: PopulatedDoc<IFormation & Document>
}

const sessionSchema = new mongoose.Schema(
   {
      name: { type: String },
      dateStart: { type: Date },
      dateFin: { type: Date },
      className: { type: String },
      nbrPlace: { type: Number },
      seance: [{ type: Schema.Types.ObjectId, ref: 'Seance' }],
      formation: { type: Schema.Types.ObjectId, ref: 'Formation' },
   },
   { versionKey: false, timestamps: true }
)
const SessionModel = mongoose.model<ISession & Document>(
   'Session',
   sessionSchema
)
export { SessionModel }
