import { Card } from 'react-bootstrap'
import { isAfter, isEqual } from 'date-fns'
import useSessions from 'src/hooks/useSessions'
import { isBefore } from 'date-fns/esm'

const InscriptionCard = () => {
   const { sessions } = useSessions()

   const currentSessionNumber = sessions
      ? sessions?.filter(
           (e) =>
              isEqual(new Date(e?.dateStart), new Date()) ||
              isEqual(new Date(e?.dateFin), new Date()) ||
              (isAfter(new Date(e?.dateFin), new Date()) &&
                 isBefore(new Date(e?.dateStart), new Date()))
        )?.length
      : 0

   return (
      <Card style={{ width: '100%' }}>
         <Card.Body>
            <Card.Text style={{ color: '#00000077' }}>
               Current sessions
            </Card.Text>
            <Card.Title style={{ fontSize: '38px' }}>
               {currentSessionNumber || 0}
            </Card.Title>
         </Card.Body>
      </Card>
   )
}
export default InscriptionCard
