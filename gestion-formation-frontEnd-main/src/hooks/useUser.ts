import useSWR from 'swr'
import { fetcher } from '../utils/fetcher'
import type { IUser } from '../types'

const useUsers = (id = '') => {
   const { data, error, mutate } = useSWR<IUser>(
      'http://localhost:4000/user/' + id,
      fetcher
   )
   const loading = !data && !error

   return {
      user: data,
      loading,
      error,
      mutate,
   }
}

export default useUsers
