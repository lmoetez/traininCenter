import useSWR from 'swr'
import { fetcher } from '../utils/fetcher'
import type { IDevoir } from '../types'

const useDevoirs = (id = '') => {
   const { data, error, mutate } = useSWR<IDevoir[]>(
      'http://localhost:4000/devoir/session/' + id,
      fetcher
   )
   const loading = !data && !error

   return {
      tests: data,
      loading,
      error,
      mutate,
   }
}

export default useDevoirs
