import express from 'express'
import httpErrors from 'http-errors'
import bodyParser from 'body-parser'
import cors from 'cors'
import { Request, Response } from 'express'

// Controllers (route handlers)
import { router } from './router'

// Create Express server
const app = express()
// allows restricted resources on a web page to be requested from another domain outside the domain
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Express configuration
app.set('port', process.env.PORT || 4000)

/**
 * app routes.
 */
app.use('/', router)

app.use((req: Request, res: Response, next: any) => {
   next(httpErrors(404))
})

// error handler
app.use((err: any, req: Request, res: Response, next: any) => {
   // render the error page
   res.status(err.status || 500)
   console.log(err)
   res.json(err)
})
export { app }
