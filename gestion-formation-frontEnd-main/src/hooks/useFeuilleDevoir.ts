import useSWR from 'swr'
import { fetcher } from '../utils/fetcher'
import type { IFeuilleDevoir } from '../types'

const useFeuilleDevoir = (id = '') => {
   const { data, error, mutate } = useSWR<any>(
      'http://localhost:4000/feuilleDevoir/' + id,
      fetcher
   )
   const loading = !data && !error

   return {
      feuille: data,
      loading,
      error,
      mutate,
   }
}

export default useFeuilleDevoir
