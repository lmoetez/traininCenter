import { Card } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { isThisMonth } from 'date-fns'
import useTranings from 'src/hooks/useTranings'

const InscriptionCard = () => {
   const { tranings } = useTranings()

   const thisMonthInscriptionNumber = tranings
      ? tranings?.filter((e) => isThisMonth(new Date(e?.createdAt)))?.length
      : 0

   return (
      <Card style={{ width: '100%' }}>
         <Card.Body>
            <Card.Text style={{ color: '#00000077' }}>
               Total number of tranings
            </Card.Text>
            <Card.Title style={{ fontSize: '38px' }}>
               {tranings?.length || 0}
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
