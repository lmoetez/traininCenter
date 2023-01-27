import { Card } from 'react-bootstrap'
import { isAfter, isEqual } from 'date-fns'
import useSessions from 'src/hooks/useSessions'
import useTranings from 'src/hooks/useTranings'
import { isBefore } from 'date-fns/esm'

const InscriptionCard = () => {
   const { tranings } = useTranings()
   const { sessions } = useSessions()

   const currentSession = sessions?.filter(
      (e) =>
         isEqual(new Date(e?.dateStart), new Date()) ||
         isEqual(new Date(e?.dateFin), new Date()) ||
         (isAfter(new Date(e?.dateFin), new Date()) &&
            isBefore(new Date(e?.dateStart), new Date()))
   )
   const ids = currentSession?.map((e) => e.formation._id)

   const currentSessionNumber = tranings
      ? tranings.filter((e: any) => ids?.includes(e._id.toString()))?.length
      : 0

   return (
      <Card style={{ width: '100%' }}>
         <Card.Body>
            <Card.Text style={{ color: '#00000077' }}>
               My current tranings
            </Card.Text>
            <Card.Title style={{ fontSize: '38px' }}>
               {currentSessionNumber || 0}
            </Card.Title>
         </Card.Body>
      </Card>
   )
}
export default InscriptionCard
