import { FC } from 'react'
import { Col, Card, Button } from 'react-bootstrap'
import { ITraning } from 'src/types'
import { useNavigate } from 'react-router-dom'

import styles from './tranings.module.css'

interface Props {
   traning: ITraning
}

const TraningItem: FC<Props> = ({ traning }) => {
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
                  {traning.name}
               </Card.Title>
            </Card.Header>
            <Card.Body>
               <Card.Text style={{ color: '#1a6ca8', fontWeight: 500 }}>
                  <span className={styles.title}>Niveau: </span>
                  {traning.niveau}
                  <br />
                  <span className={styles.title}>Nombre de sessions: </span>
                  {traning.sessionNumber}
               </Card.Text>
               <Button
                  variant="primary"
                  onClick={() => navigate('./' + traning._id)}
               >
                  Consulte
               </Button>
            </Card.Body>
         </Card>
      </Col>
   )
}

export default TraningItem
