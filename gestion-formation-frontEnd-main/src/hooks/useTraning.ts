import useSWR from 'swr'
import { fetcher } from '../utils/fetcher'
import type { ITraning } from '../types'

const useTraning = (id = '') => {
   const { data, error, mutate } = useSWR<ITraning>(
      'http://localhost:4000/formation/' + id,
      fetcher
   )
   const loading = !data && !error

   return {
      traning: data,
      loading,
      error,
      mutate,
   }
}

export default useTraning
