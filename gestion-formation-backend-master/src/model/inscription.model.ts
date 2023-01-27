import mongoose, { Document, PopulatedDoc, Schema } from 'mongoose'
import { IUser, ISession } from '.'

export interface IInscription {
   user: PopulatedDoc<IUser & Document>
   session: PopulatedDoc<ISession & Document>
   isConfirmed: boolean
   isRefused: boolean
}

const inscriptionSchema = new mongoose.Schema(
   {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      session: { type: Schema.Types.ObjectId, ref: 'Session' },
      isConfirmed: { type: Boolean, default: false },
      isRefused: { type: Boolean, default: false },
   },
   { versionKey: false, timestamps: true }
)
const InscriptionModel = mongoose.model<IInscription & Document>(
   'Inscription',
   inscriptionSchema
)
export { InscriptionModel }
