import mongoose, { Document } from 'mongoose'

export interface IUser {
   firstName: string
   lastName: string
   phone: string
   email: string
   address: string
   password: string
   role: ERole
}

export enum ERole {
   admin = 'admin',
   formateur = 'formateur',
   candidat = 'condidat',
}

const userSchema = new mongoose.Schema(
   {
      firstName: { type: String },
      lastName: { type: String },
      phone: { type: String },
      email: { type: String },
      address: { type: String },
      password: { type: String },
      role: { type: String },
   },
   { versionKey: false, timestamps: true }
)
const UserModel = mongoose.model<IUser & Document>('User', userSchema)
export { UserModel }
