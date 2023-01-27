import { Card } from 'react-bootstrap'
import useInscriptions from 'src/hooks/useInscriptions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { isThisMonth } from 'date-fns'

const InscriptionCard = () => {
   const { inscriptions } = useInscriptions()

   const thisMonthInscriptionNumber = inscriptions
      ? inscriptions?.filter((e) => isThisMonth(new Date(e?.createdAt)))?.length
      : 0

   return (
      <Card style={{ width: '100%' }}>
         <Card.Body>
            <Card.Text style={{ color: '#00000077' }}>
               Total number of inscription
            </Card.Text>
            <Card.Title style={{ fontSize: '38px' }}>
               {inscriptions?.length || 0}
            </Card.Title>
            <Card.Text style={{ color: '#00000077' }}>
               This month
               <FontAwesomeIcon
                  icon={faCaretUp}
                  style={{ color: 'green', margin: '0 4px' }}
               />
               +{thisMonthInscriptionNumber}
            </Card.Text>
         </Card.Body>
      </Card>
   )
}
export default InscriptionCard
