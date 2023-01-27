import mongoose, { PopulatedDoc, Schema } from 'mongoose'
import { IQuestion, ISession } from '.'

export interface IDocument {
   name: string
   url: string
   session: PopulatedDoc<ISession & Document>
}

const documentSchema = new mongoose.Schema(
   {
      name: { type: String },
      url: { type: String },
      session: { type: Schema.Types.ObjectId, ref: 'Session' },
   },
   { versionKey: false, timestamps: true }
)
const DocumentModel = mongoose.model<IDocument & Document>(
   'Document',
   documentSchema
)
export { DocumentModel }
