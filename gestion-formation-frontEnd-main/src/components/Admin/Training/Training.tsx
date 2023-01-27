import React, { useState } from 'react'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faList } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import TraningModal from './TraningModal'
import PreviewTraning from './PreviewTraning'
import useTranings from 'src/hooks/useTranings'
import useSessions from 'src/hooks/useSessions'
import { ITraning } from 'src/types'

const Tranings = () => {
   const navigate = useNavigate()

   const [showModal, setShowModal] = useState<boolean>(false)
   const [showPreview, setShowPreview] = useState<boolean>(false)
   const [traningSelected, setTraningSelected] = useState<ITraning>()

   const { tranings, loading, mutate } = useTranings()
   const { sessions, loading: loadingSession } = useSessions()

   if (loading || loadingSession) return <p>loading</p>

   return (
      <div style={{ padding: '0 24px' }}>
         <Row style={{ alignItems: 'center', marginTop: '16px' }}>
            <Col>
               <h1 style={{ color: '#64748b' }}>Tranings</h1>
            </Col>
            <Col xs="auto">
               <Button
                  onClick={() => {
                     setTraningSelected(undefined)
                     setShowModal(true)
                  }}
               >
                  Add
               </Button>
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
                        <th>Level</th>
                        <th>Number of sessions</th>
                        <th>Formateur</th>
                        <th>Owner</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody style={{ borderTop: 'unset' }}>
                     {tranings?.map((traning, index) => (
                        <tr key={index}>
                           <td
                              style={{ cursor: 'pointer' }}
                              onClick={() => navigate('./' + traning._id)}
                           >
                              {traning.name}
                           </td>
                           <td
                              style={{ cursor: 'pointer' }}
                              onClick={() => navigate('./' + traning._id)}
                           >
                              {traning.niveau}
                           </td>
                           <td
                              style={{ cursor: 'pointer' }}
                              onClick={() => navigate('./' + traning._id)}
                           >
                              {sessions?.filter(
                                 (e) => e.formation._id === traning._id
                              )?.length || 0}
                           </td>
                           <td
                              style={{ cursor: 'pointer' }}
                              onClick={() => navigate('./' + traning._id)}
                           >
                              {traning.formateur.firstName +
                                 ' ' +
                                 traning.formateur.lastName}
                           </td>
                           <td
                              style={{ cursor: 'pointer' }}
                              onClick={() => navigate('./' + traning._id)}
                           >
                              {traning.owner.firstName +
                                 ' ' +
                                 traning.owner.lastName}
                           </td>
                           <td style={{ color: '#1a6ca8' }}>
                              <Button
                                 variant="link"
                                 onClick={() => {
                                    setTraningSelected(traning)
                                    setShowPreview(true)
                                 }}
                              >
                                 <FontAwesomeIcon icon={faList} />
                              </Button>
                              <Button
                                 variant="link"
                                 onClick={() => {
                                    setTraningSelected(traning)
                                    setShowModal(true)
                                 }}
                              >
                                 <FontAwesomeIcon icon={faEdit} />
                              </Button>
                              <Button
                                 variant="link"
                                 onClick={async () => {
                                    await axios.delete(
                                       'http://localhost:4000/formation/' +
                                          traning._id
                                    )
                                    await mutate()
                                 }}
                              >
                                 <FontAwesomeIcon icon={faTrash} />
                              </Button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </Table>
            </Col>
         </Row>
         <TraningModal
            show={showModal}
            setShow={setShowModal}
            mutate={mutate}
            traning={traningSelected}
         />
         <PreviewTraning
            show={showPreview}
            setShow={setShowPreview}
            traning={traningSelected}
         />
      </div>
   )
}

export default Tranings
