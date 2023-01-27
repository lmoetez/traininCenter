import { ISession } from '.'

export interface IDocument {
   _id: string
   name: string
   url: string
   session: ISession
   createdAt: string
}
