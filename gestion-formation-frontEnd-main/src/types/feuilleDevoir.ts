import { IDevoir, IQuestion, IUser } from '.'

export interface IFeuilleDevoir {
   _id: string
   devoir: IDevoir
   questions: {
      question: IQuestion
      response: string
   }[]
   user: IUser
   note: number
}
