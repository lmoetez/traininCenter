import mongoose, { PopulatedDoc, Schema } from 'mongoose'
import { IDevoir, IQuestion, IUser } from '.'

export interface IFeuilleDevoir {
   devoir: PopulatedDoc<IDevoir & Document>[]
   questions: {
      question: PopulatedDoc<IQuestion & Document>
      response: string
   }[]
   user: PopulatedDoc<IUser & Document>
   note: number
}

const feuilleDevoirSchema = new mongoose.Schema(
   {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      devoir: { type: Schema.Types.ObjectId, ref: 'Devoir' },
      questions: [
         {
            question: { type: Schema.Types.ObjectId, ref: 'Question' },
            reponse: String,
         },
      ],
      note: { type: Number },
   },
   { versionKey: false, timestamps: true }
)
const FeuilleDevoirModel = mongoose.model<IFeuilleDevoir & Document>(
   'FeuilleDevoir',
   feuilleDevoirSchema
)
export { FeuilleDevoirModel }
