import { format } from 'date-fns'
import { Row, Col, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import useInscriptions from 'src/hooks/useInscriptions'

const Basket = () => {
   const navigate = useNavigate()

   const { inscriptions, loading } = useInscriptions()

   if (loading) return <div>loading</div>

   return (
      <div style={{ padding: '0 24px' }}>
         <Row style={{ alignItems: 'center', marginTop: '16px' }}>
            <Col>
               <h1 style={{ color: '#64748b' }}>Mes Inscriptions</h1>
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
               {inscriptions && inscriptions?.length > 0 ? (
                  <Table striped bordered hover>
                     <thead>
                        <tr style={{ color: '#1a6ca8' }}>
                           <td>Nom</td>
                           <td>Status</td>
                           <td>Date</td>
                        </tr>
                     </thead>
                     <tbody style={{ borderTop: 'unset' }}>
                        {inscriptions?.map((inscription) => (
                           <tr
                              onClick={() =>
                                 navigate(
                                    '/sessions/' + inscription.session._id
                                 )
                              }
                           >
                              <td>{inscription.session.name}</td>
                              <td>
                                 {!!inscription.isConfirmed
                                    ? 'Confirmer'
                                    : 'pas encore confirmé'}
                              </td>
                              <td>
                                 {inscription?.session?.dateStart
                                    ? format(
                                         new Date(
                                            inscription.session.dateStart
                                         ),
                                         'dd/MM/yyyy'
                                      )
                                    : ''}
                                 {' => '}
                                 {inscription?.session?.dateFin
                                    ? format(
                                         new Date(inscription.session.dateFin),
                                         'dd/MM/yyyy'
                                      )
                                    : ''}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </Table>
               ) : (
                  <div style={{ width: '100%', textAlign: 'center' }}>
                     <h5>Vous n'avez aucun inscription</h5>
                  </div>
               )}
            </Col>
         </Row>
      </div>
   )
}

export default Basket
