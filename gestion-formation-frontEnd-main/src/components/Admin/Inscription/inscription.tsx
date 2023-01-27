import { format } from 'date-fns'
import { Row, Col, Table, Button, Dropdown } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faFilter } from '@fortawesome/free-solid-svg-icons'

import useInscriptions from 'src/hooks/useInscriptions'
import axios from 'axios'
import { useState } from 'react'

const Basket = () => {
   const [filter, setFilter] = useState('All Inscriptions')
   const [isLoading, setIsLoading] = useState(false)

   const { inscriptions, loading, mutate } = useInscriptions()

   if (loading) return <div>loading</div>

   return (
      <div style={{ padding: '0 24px' }}>
         <Row style={{ alignItems: 'center', marginTop: '16px' }}>
            <Col>
               <h1 style={{ color: '#64748b' }}>Inscriptions</h1>
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
               <Dropdown style={{ marginBottom: '8px' }}>
                  <Dropdown.Toggle
                     variant="link"
                     bsPrefix="p-0"
                     style={{ textDecoration: 'unset' }}
                  >
                     <FontAwesomeIcon
                        icon={faFilter}
                        style={{ fontSize: '20px', marginRight: '8px' }}
                     />{' '}
                     {filter}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                     <Dropdown.Item
                        onClick={() => setFilter('All Inscriptions')}
                     >
                        All Inscriptions
                     </Dropdown.Item>
                     <Dropdown.Item
                        onClick={() => setFilter('Confirmed Inscriptions')}
                     >
                        Confirmed Inscriptions
                     </Dropdown.Item>
                     <Dropdown.Item
                        onClick={() => setFilter('Refused Inscriptions')}
                     >
                        Refused Inscriptions
                     </Dropdown.Item>
                     <Dropdown.Item
                        onClick={() => setFilter('In waiting Inscriptions')}
                     >
                        In waiting Inscriptions
                     </Dropdown.Item>
                  </Dropdown.Menu>
               </Dropdown>
               <Table striped bordered hover>
                  <thead>
                     <tr style={{ color: '#1a6ca8' }}>
                        <td>Nom</td>
                        <td>Status</td>
                        <td>Date</td>
                        <td>Action</td>
                     </tr>
                  </thead>
                  <tbody style={{ borderTop: 'unset' }}>
                     {inscriptions &&
                     inscriptions.filter((e) => {
                        switch (filter) {
                           case 'All Inscriptions':
                              return true
                           case 'Confirmed Inscriptions':
                              return e.isConfirmed
                           case 'Refused Inscriptions':
                              return e.isRefused
                           case 'In waiting Inscriptions':
                              return !e.isConfirmed && !e.isRefused
                           default:
                              return true
                        }
                     })?.length > 0 ? (
                        inscriptions
                           .filter((e) => {
                              switch (filter) {
                                 case 'All Inscriptions':
                                    return true
                                 case 'Confirmed Inscriptions':
                                    return e.isConfirmed
                                 case 'Refused Inscriptions':
                                    return e.isRefused
                                 case 'In waiting Inscriptions':
                                    return !e.isConfirmed && !e.isRefused
                                 default:
                                    return true
                              }
                           })
                           ?.map((inscription) => (
                              <tr>
                                 <td>{inscription.session.name}</td>
                                 <td>
                                    {!!inscription.isConfirmed
                                       ? 'Confirmer'
                                       : !!inscription.isRefused
                                       ? 'Refusé'
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
                                            new Date(
                                               inscription.session.dateFin
                                            ),
                                            'dd/MM/yyyy'
                                         )
                                       : ''}
                                 </td>
                                 <td style={{ color: '#1a6ca8' }}>
                                    <Button
                                       variant="link"
                                       disabled={
                                          isLoading || inscription.isConfirmed
                                       }
                                       onClick={async () => {
                                          setIsLoading(true)
                                          await axios.put(
                                             'http://localhost:4000/inscription/' +
                                                inscription._id,
                                             {
                                                isConfirmed: true,
                                                isRefused: false,
                                             }
                                          )
                                          await mutate()
                                          setIsLoading(false)
                                       }}
                                    >
                                       <FontAwesomeIcon
                                          icon={faCheck}
                                          style={{ color: 'green' }}
                                       />
                                    </Button>
                                    <Button
                                       variant="link"
                                       disabled={
                                          isLoading || inscription.isRefused
                                       }
                                       onClick={async () => {
                                          setIsLoading(true)
                                          await axios.put(
                                             'http://localhost:4000/inscription/' +
                                                inscription._id,
                                             {
                                                isRefused: true,
                                                isConfirmed: false,
                                             }
                                          )
                                          await mutate()
                                          setIsLoading(false)
                                       }}
                                    >
                                       <FontAwesomeIcon
                                          icon={faTimes}
                                          style={{ color: 'red' }}
                                       />
                                    </Button>
                                 </td>
                              </tr>
                           ))
                     ) : (
                        <tr>
                           <td
                              colSpan={4}
                              style={{
                                 textAlign: 'center',
                              }}
                           >
                              <h5>Pas d'inscription</h5>
                           </td>
                        </tr>
                     )}
                  </tbody>
               </Table>
            </Col>
         </Row>
      </div>
   )
}

export default Basket
