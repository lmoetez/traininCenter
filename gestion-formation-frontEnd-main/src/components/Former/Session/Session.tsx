import React, { useState } from 'react'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faList } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import SessionModal from './SessionModal'
import PreviewSession from './PreviewSession'
import useSessions from 'src/hooks/useSessions'
import { ISession } from 'src/types'
import { format } from 'date-fns'

const Sessions = () => {
   const navigate = useNavigate()

   const [showModal, setShowModal] = useState<boolean>(false)
   const [showPreview, setShowPreview] = useState<boolean>(false)
   const [sessionSelected, setSessionSelected] = useState<ISession>()

   const { sessions, loading, mutate } = useSessions()

   if (loading) return <p>loading</p>

   return (
      <div style={{ padding: '0 24px' }}>
         <Row style={{ alignItems: 'center', marginTop: '16px' }}>
            <Col>
               <h1 style={{ color: '#64748b' }}>Sessions</h1>
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
               <Table striped bordered hover>
                  <thead>
                     <tr style={{ color: '#1a6ca8' }}>
                        <th>Name</th>
                        <th>Date start</th>
                        <th>Date fin</th>
                        <th>Class name</th>
                        <th>Place number</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody style={{ borderTop: 'unset' }}>
                     {sessions?.map((session, index) => (
                        <tr key={index}>
                           <td
                              style={{ cursor: 'pointer' }}
                              onClick={() => navigate('./' + session._id)}
                           >
                              {session.name}
                           </td>
                           <td
                              style={{ cursor: 'pointer' }}
                              onClick={() => navigate('./' + session._id)}
                           >
                              {session?.dateStart
                                 ? format(
                                      new Date(session.dateStart),
                                      'dd/MM/yyyy'
                                   )
                                 : null}
                           </td>
                           <td
                              style={{ cursor: 'pointer' }}
                              onClick={() => navigate('./' + session._id)}
                           >
                              {session?.dateFin
                                 ? format(
                                      new Date(session.dateFin),
                                      'dd/MM/yyyy'
                                   )
                                 : null}
                           </td>
                           <td
                              style={{ cursor: 'pointer' }}
                              onClick={() => navigate('./' + session._id)}
                           >
                              {session.className}
                           </td>
                           <td
                              style={{ cursor: 'pointer' }}
                              onClick={() => navigate('./' + session._id)}
                           >
                              {session.nbrPlace}
                           </td>
                           <td style={{ color: '#1a6ca8' }}>
                              <Button
                                 variant="link"
                                 onClick={() => {
                                    setSessionSelected(session)
                                    setShowPreview(true)
                                 }}
                              >
                                 <FontAwesomeIcon icon={faList} />
                              </Button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </Table>
            </Col>
         </Row>
         <SessionModal
            show={showModal}
            setShow={setShowModal}
            mutate={mutate}
            session={sessionSelected}
         />
         <PreviewSession
            show={showPreview}
            setShow={setShowPreview}
            session={sessionSelected}
         />
      </div>
   )
}

export default Sessions
