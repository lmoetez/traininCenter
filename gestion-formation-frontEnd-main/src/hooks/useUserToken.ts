import useSWR from 'swr'
import { fetcher } from '../utils/fetcher'
import type { IUser } from '../types'

const useUserToken = () => {
   const token = localStorage.getItem('token')
   const { data, error, mutate } = useSWR<IUser>(
      token ? 'http://localhost:4000/user/token' : null,
      fetcher,
      { revalidateOnFocus: false }
   )
   const loading = !data && !error

   return {
      user: data,
      loading,
      error,
      mutate,
   }
}

export default useUserToken
