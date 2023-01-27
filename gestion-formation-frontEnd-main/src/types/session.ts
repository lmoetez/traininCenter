import { ISeance, ITraning } from '.'

export interface ISession {
   _id: string
   name: string
   dateStart: Date
   dateFin: Date
   className: string
   nbrPlace: number
   seance: ISeance[]
   formation: ITraning
   createdAt: string
}
