import axios from 'axios'

export const fetcher = (url: string) => {
   return axios.get(url).then((r) => r.data)
}
