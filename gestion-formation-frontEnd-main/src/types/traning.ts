import { IUser } from '.'

export interface ITraning {
   _id: string
   name: string
   niveau: string
   sessionNumber: number
   owner: IUser
   formateur: IUser
   createdAt: string
}
