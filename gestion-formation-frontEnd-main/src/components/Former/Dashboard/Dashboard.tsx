import { Row, Col } from 'react-bootstrap'

import useInscriptions from 'src/hooks/useInscriptions'
import useUsers from 'src/hooks/useUsers'
import useTranings from 'src/hooks/useTranings'
import useSessions from 'src/hooks/useSessions'

import TraningExistCard from './TraningExistCard'
import SessionExistCard from './SessionExistCard'
import TraningCard from './TraningCard'
import SessionCard from './SessionCard'

const Dashboard = () => {
   const { loading: loadingInscription } = useInscriptions()
   const { loading: loadingUser } = useUsers()
   const { loading: loadingTraning } = useTranings()
   const { loading: loadingSession } = useSessions()

   if (loadingInscription || loadingUser || loadingTraning || loadingSession)
      return <div>loading</div>

   return (
      <Row style={{ width: '100%', padding: '5% 16px 0 16px' }}>
         <Col xs="12" md="6" style={{ marginBottom: '2%' }}>
            <TraningCard />
         </Col>
         <Col xs="12" md="6" style={{ marginBottom: '2%' }}>
            <SessionCard />
         </Col>
         <Col xs="12" md="6">
            <TraningExistCard />
         </Col>
         <Col xs="12" md="6">
            <SessionExistCard />
         </Col>
      </Row>
   )
}

export default Dashboard
