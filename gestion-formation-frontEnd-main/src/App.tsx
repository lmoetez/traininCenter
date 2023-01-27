import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PublicLayout from './components/Layout/PublicLayout'
import FormerLayout from './components/Layout/FormerLayout'
import AdminLayout from './components/Layout/AdminLayout'

import './App.css'

import './custom.scss'
import axios from 'axios'

function App() {
   if (typeof window !== 'undefined') {
      if (localStorage.getItem('token')) {
         axios.interceptors.request.use(
            async (config) => {
               const token = localStorage.getItem('token')
               if (token) {
                  config.headers = {
                     Authorization: token ?? '',
                  }
               } else {
                  config.cancelToken = axios.CancelToken.source().token
               }
               return config
            },
            (error) => {
               Promise.reject(error)
            }
         )

         axios.interceptors.response.use(undefined, (error) => {
            if (
               error.response?.status === 401 &&
               error.response?.data === 'user inexist'
            ) {
               localStorage.removeItem('token')
               localStorage.removeItem('role')
               //navigator('/signin')
            }
            return Promise.reject(error)
         })
      }
   }

   return (
      <Router>
         <Routes>
            <Route path="/admin/*" element={<AdminLayout />} />
            <Route path="/former/*" element={<FormerLayout />} />
            <Route path="*" element={<PublicLayout />} />
         </Routes>
      </Router>
   )
}

export default App
