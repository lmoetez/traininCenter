import { Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

import SessionItem from './SessionItem'

import useTraning from 'src/hooks/useTraning'
import useSessions from 'src/hooks/useSessions'

import styles from './tranings.module.css'

const TrainingDetail = () => {
   const { id } = useParams()

   const { traning, loading } = useTraning(id)
   const { sessions, loading: loadingSession } = useSessions()

   if (loading || loadingSession) return <p>loading ...</p>

   return (
      <div style={{ padding: '0 24px' }}>
         <Row style={{ alignItems: 'center', marginTop: '16px' }}>
            <Col
               style={{
                  backgroundColor: 'white',
                  padding: '24px ',
                  borderRadius: '8px',
               }}
            >
               <h1 style={{ color: '#64748b' }}>{traning?.name}</h1>
               <Row>
                  <Col xs="auto">
                     <span
                        className={styles.title}
                        style={{ color: '#64748b' }}
                     >
                        Level:{' '}
                     </span>
                     {traning?.niveau}
                  </Col>
                  <Col xs="auto">
                     <span
                        className={styles.title}
                        style={{ color: '#64748b' }}
                     >
                        Formateur:{' '}
                     </span>

                     {traning?.formateur.firstName +
                        ' ' +
                        traning?.formateur.lastName}
                  </Col>
                  <Col xs="auto">
                     <span
                        className={styles.title}
                        style={{ color: '#64748b' }}
                     >
                        Number of sessions:{' '}
                     </span>
                     {traning?.sessionNumber || 0}
                  </Col>
               </Row>
            </Col>
         </Row>
         <Row style={{ marginTop: '16px' }}>
            <Col
               xs="12"
               style={{
                  backgroundColor: 'white',
                  padding: '24px ',
                  borderRadius: '8px',
               }}
            >
               <Row>
                  <Col xs="12">
                     <h3>Sessions:</h3>
                  </Col>

                  {sessions
                     ?.filter((e) => e.formation._id === traning?._id)
                     ?.map((session) => (
                        //@ts-ignore
                        <SessionItem session={session} traning={traning} />
                     ))}
               </Row>
            </Col>
         </Row>
      </div>
   )
}

export default TrainingDetail
