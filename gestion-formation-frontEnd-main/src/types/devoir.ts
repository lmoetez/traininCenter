import { ISession } from '.'

export interface IDevoir {
   _id: string
   name: string
   type: EType
   questions: IQuestion[]
   session: ISession
}

enum EType {
   examen = 'examen',
   test = 'test',
}

export interface IQuestion {
   _id?: string
   question: string
   choix: string[]
   reponse: string
}
