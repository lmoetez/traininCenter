import mongoose from 'mongoose'

export interface IQuestion {
   question: string
   choix: string[]
   reponse: string
}

const questionSchema = new mongoose.Schema(
   {
      question: { type: String },
      choix: [{ type: String }],
      reponse: { type: String },
   },
   { versionKey: false, timestamps: true }
)
const QuestionModel = mongoose.model<IQuestion & Document>(
   'Question',
   questionSchema
)
export { QuestionModel }
