import { Request, Response } from 'express'
import { DevoirModel, QuestionModel, IDevoir, IQuestion } from '../model'
import createHttpError from 'http-errors'

const getDevoir = async (req: Request, res: Response, next: any) => {
   try {
      const id = req.params.id
      const devoir = await DevoirModel.findById(id).populate([
         'questions',
         'session',
      ])
      res.json(devoir)
   } catch (error) {
      next(error)
   }
}

const getDevoirs = async (req: Request, res: Response, next: any) => {
   try {
      const devoirs = await DevoirModel.find().populate([
         'questions',
         'session',
      ])
      res.json(devoirs)
   } catch (error) {
      next(error)
   }
}

const getDevoirsBySession = async (req: Request, res: Response, next: any) => {
   try {
      const id = req.params.id
      const devoirs = await DevoirModel.find({ session: id }).populate([
         'questions',
         'session',
      ])
      res.json(devoirs)
   } catch (error) {
      next(error)
   }
}

const addDevoir = async (req: Request, res: Response, next: any) => {
   try {
      const { questions } = req.body

      const promise: any[] = []
      questions.map((question: IQuestion) =>
         promise.push(QuestionModel.create(question))
      )
      const questionsRes = (await Promise.all(promise)).map((e) => e._id)

      const devoir = await DevoirModel.create({
         ...req.body,
         questions: questionsRes,
      })

      res.json(devoir)
   } catch (error) {
      next(error)
   }
}

const deleteDevoir = async (req: Request, res: Response, next: any) => {
   try {
      const id = req.params.id
      const devoir = await DevoirModel.findById(id)

      if (!devoir) throw new createHttpError.BadRequest('Devoir Inexist')

      devoir?.questions.map((questionId) =>
         QuestionModel.findByIdAndDelete(questionId)
      )

      await devoir.delete()

      res.json('deleted')
   } catch (error) {
      next(error)
   }
}

const updateDevoir = async (req: Request, res: Response, next: any) => {
   try {
      const id = req.params.id
      const { questions } = req.body

      let questionsRes
      if (questions) {
         const promise: any[] = []
         questions.map((question: IQuestion) => {
            promise.push(getQuestionId(question))
         })
         questionsRes = (await Promise.all(promise)).map((e) => e._id)
      }

      await DevoirModel.findByIdAndUpdate(
         id,
         { ...req.body, questions: questionsRes },
         {
            omitUndefined: true,
         }
      )

      res.json('update')
   } catch (error) {
      next(error)
   }
}

const getQuestionId = async (question: IQuestion) => {
   const item = await QuestionModel.findOne(question)
   if (item) return item._id
   else {
      const element = await QuestionModel.create(question)
      return element._id
   }
}

export {
   getDevoir,
   getDevoirs,
   getDevoirsBySession,
   addDevoir,
   deleteDevoir,
   updateDevoir,
}
