import { app } from './app'
import Mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), async () => {
   //server
   console.log(
      '  App is running at http://localhost:%d in %s mode',
      app.get('port'),
      app.get('env')
   )
   console.log('  Press CTRL-C to stop\n')
   //Mongoose
   if (process.env.DB_CONNECT) {
      Mongoose.connect(process.env.DB_CONNECT)
      Mongoose.connection.on('open', () => {
         console.info('Connected to Mongo.')
      })
      Mongoose.connection.on('error', (err: any) => {
         console.error(err)
      })
   }
})

export default server
