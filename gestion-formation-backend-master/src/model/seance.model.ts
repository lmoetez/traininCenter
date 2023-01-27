import mongoose from 'mongoose'

export interface ISeance {
   numero: number
   date: Date
}

const seanceSchema = new mongoose.Schema(
   {
      numero: { type: Number },
      date: { type: Date },
   },
   { versionKey: false, timestamps: true }
)
const SeanceModel = mongoose.model<ISeance & Document>('Seance', seanceSchema)
export { SeanceModel }
