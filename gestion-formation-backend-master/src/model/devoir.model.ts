import mongoose, { PopulatedDoc, Schema } from 'mongoose'
import { IQuestion, ISession } from '.'

export interface IDevoir {
   name: string
   type: EType
   questions: PopulatedDoc<IQuestion & Document>[]
   session: PopulatedDoc<ISession & Document>
}

enum EType {
   examen = 'examen',
   test = 'test',
}

const devoirSchema = new mongoose.Schema(
   {
      name: { type: String },
      type: { type: String },
      questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
      session: { type: Schema.Types.ObjectId, ref: 'Session' },
   },
   { versionKey: false, timestamps: true }
)
const DevoirModel = mongoose.model<IDevoir & Document>('Devoir', devoirSchema)
export { DevoirModel }
