import { FC } from 'react'
import { Col, Card, Button } from 'react-bootstrap'
import { ISession, ITraning } from 'src/types'
import { useNavigate } from 'react-router-dom'

import styles from './tranings.module.css'
import { format } from 'date-fns'

interface Props {
   traning: ITraning
   session: ISession
}

const TraningItem: FC<Props> = ({ session, traning }) => {
   const navigate = useNavigate()

   return (
      <Col xs="12" sm="6" md="4" lg="3" style={{ marginTop: '16px' }}>
         <Card style={{ width: '100%' }}>
            <Card.Header style={{ backgroundColor: 'white' }}>
               <Card.Title
                  style={{
                     textAlign: 'center',
                     fontSize: '20px',
                     fontWeight: 700,
                     color: '#1a6ca8',
                  }}
               >
                  {session.name}
               </Card.Title>
            </Card.Header>
            <Card.Body>
               <Card.Text style={{ fontWeight: 500 }}>
                  <span className={styles.title} style={{ color: '#64748b' }}>
                     Date:{' '}
                  </span>
                  {session.dateStart
                     ? format(new Date(session.dateStart), 'dd/MM/yyyy')
                     : ''}
                  {' => '}
                  {session.dateFin
                     ? format(new Date(session.dateFin), 'dd/MM/yyyy')
                     : ''}
               </Card.Text>
               <Button
                  variant="primary"
                  onClick={() => {
                     const token = localStorage.getItem('token')
                     if (token) navigate('/inscription/' + session._id)
                     else navigate('/signin?path=/trainings/' + traning._id)
                  }}
               >
                  S'inscrire
               </Button>
            </Card.Body>
         </Card>
      </Col>
   )
}

export default TraningItem
