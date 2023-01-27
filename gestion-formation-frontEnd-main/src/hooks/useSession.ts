import useSWR from 'swr'
import { fetcher } from '../utils/fetcher'
import type { ISession } from '../types'

const useSession = (id = '') => {
   const { data, error, mutate } = useSWR<ISession>(
      'http://localhost:4000/session/' + id,
      fetcher
   )
   const loading = !data && !error

   return {
      session: data,
      loading,
      error,
      mutate,
   }
}

export default useSession
