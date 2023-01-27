import { Alert } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   faCheck,
   faTimes,
   faExclamation,
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Inscription = () => {
   const { id } = useParams()

   const [loading, setLoading] = useState(true)
   const [alredyExist, setAlredyExist] = useState(false)
   const [error, setError] = useState(false)

   useEffect(() => {
      if (loading)
         axios
            .post('http://localhost:4000/inscription', {
               session: id,
            })
            .then(() => setLoading(false))
            .catch((error) => {
               setLoading(false)
               if (error.response.status === 409) setAlredyExist(true)
               else setError(true)
            })
   }, [])

   return (
      <>
         {loading ? (
            'loading'
         ) : error ? (
            <Alert variant={'danger'}>
               <FontAwesomeIcon icon={faTimes} style={{ marginRight: '8px' }} />
               Une error s'est produite. Veuillez réessayer plus tard
            </Alert>
         ) : alredyExist ? (
            <Alert variant={'warning'}>
               <FontAwesomeIcon
                  icon={faExclamation}
                  style={{ marginRight: '8px' }}
               />
               Vous êtes déjà inscrit
            </Alert>
         ) : (
            <Alert variant={'success'}>
               <FontAwesomeIcon icon={faCheck} style={{ marginRight: '8px' }} />
               Votre Inscription est envoyée merci d'attendre la confirmation
               d'admin
            </Alert>
         )}
      </>
   )
}

export default Inscription
