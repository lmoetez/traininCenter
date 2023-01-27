import useSWR from 'swr'
import { fetcher } from '../utils/fetcher'
import type { IUser } from '../types'

const useUsers = () => {
   const { data, error, mutate } = useSWR<IUser[]>(
      'http://localhost:4000/user',
      fetcher
   )
   const loading = !data && !error

   return {
      users: data,
      loading,
      error,
      mutate,
   }
}

export default useUsers
