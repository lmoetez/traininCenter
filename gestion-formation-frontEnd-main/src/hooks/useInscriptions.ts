import useSWR from 'swr'
import { fetcher } from '../utils/fetcher'
import type { IInscription } from '../types'

const useInscriptions = () => {
   const { data, error, mutate } = useSWR<IInscription[]>(
      'http://localhost:4000/inscription',
      fetcher
   )
   const loading = !data && !error

   return {
      inscriptions: data,
      loading,
      error,
      mutate,
   }
}

export default useInscriptions
