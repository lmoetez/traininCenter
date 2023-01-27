import useSWR from 'swr'
import { fetcher } from '../utils/fetcher'
import type { IInscription } from '../types'

const useSessions = (id: string) => {
   const { data, error, mutate } = useSWR<IInscription>(
      'http://localhost:4000/inscription/' + id,
      fetcher
   )
   const loading = !data && !error

   return {
      inscription: data,
      loading,
      error,
      mutate,
   }
}

export default useSessions
