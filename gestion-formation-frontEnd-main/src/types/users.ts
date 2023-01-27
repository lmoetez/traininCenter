export interface IUser {
   _id: string
   firstName: string
   lastName: string
   phone: string
   email: string
   address: string
   password: string
   role: ERole
   createdAt: string
}
export enum ERole {
   admin = 'admin',
   formateur = 'formateur',
   candidat = 'condidat',
}
