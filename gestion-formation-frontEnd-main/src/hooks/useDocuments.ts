import useSWR from 'swr'
import { fetcher } from '../utils/fetcher'
import type { IDocument } from '../types'

const useDocument = (id = '') => {
   const { data, error, mutate } = useSWR<IDocument[]>(
      'http://localhost:4000/document/' + id,
      fetcher
   )
   const loading = !data && !error

   return {
      documents: data,
      loading,
      error,
      mutate,
   }
}

export default useDocument
