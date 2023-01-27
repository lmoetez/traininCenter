import useSWR from 'swr'
import { fetcher } from '../utils/fetcher'
import type { ISession } from '../types'

const useSessions = () => {
   const { data, error, mutate } = useSWR<ISession[]>(
      'http://localhost:4000/session',
      fetcher
   )
   const loading = !data && !error

   return {
      sessions: data,
      loading,
      error,
      mutate,
   }
}

export default useSessions
