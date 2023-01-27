import { ISession, IUser } from '.'

export interface IInscription {
   _id: string
   user: IUser
   session: ISession
   isConfirmed: boolean
   isRefused: boolean
   createdAt: string
}
