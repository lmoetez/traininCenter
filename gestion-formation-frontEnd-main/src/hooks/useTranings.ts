import useSWR from 'swr'
import { fetcher } from '../utils/fetcher'
import type { ITraning } from '../types'

const useTraning = () => {
   const { data, error, mutate } = useSWR<ITraning[]>(
      'http://localhost:4000/formation',
      fetcher
   )
   const loading = !data && !error

   return {
      tranings: data,
      loading,
      error,
      mutate,
   }
}

export default useTraning
