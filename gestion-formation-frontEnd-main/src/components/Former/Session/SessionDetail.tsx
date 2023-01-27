import axios from 'axios'
import React, { useState } from 'react'
import { Row, Col, Button, Table, Dropdown } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   faTrash,
   faEdit,
   faDownload,
   faList,
} from '@fortawesome/free-solid-svg-icons'

import useSession from 'src/hooks/useSession'
import useDocuments from 'src/hooks/useDocuments'

import styles from './session.module.css'
import SessionModal from './SessionModal'
import SeanceModal from './SeanceModal'
import DocumentModal from './DocumentModal'
import { IDevoir, ISeance } from 'src/types'
import useDevoirs from 'src/hooks/useDevoirs'
import TestModal from './TestModal'
import TestPreview from './TestPreview'

const TrainingDetail = () => {
   const { id } = useParams()
   const navigate = useNavigate()

   const [showModal, setShowModal] = useState<boolean>(false)
   const [showSeanceModal, setShowSeanceModal] = useState<boolean>(false)
   const [showDocumentModal, setShowDocumentModal] = useState<boolean>(false)
   const [showTestModal, setShowTestModal] = useState<boolean>(false)
   const [showTestPreviewModal, setShowTestPreviewModal] =
      useState<boolean>(false)
   const [testPreview, setTestPreview] = useState<IDevoir>()
   const [seance, setSeance] = useState<ISeance>()

   const {
      session,
      loading: loadingSession,
      mutate: mutateSession,
   } = useSession(id)
   const {
      documents,
      loading: loadingDocument,
      mutate: mutateDocument,
   } = useDocuments(id)
   const { tests, loading: loadingTest, mutate: mutateTest } = useDevoirs(id)

   if (loadingSession || loadingDocument || loadingTest)
      return <p>loading ...</p>

   return (
      <div style={{ padding: '0 24px' }}>
         <Row style={{ alignItems: 'center', marginTop: '16px' }}>
            <Col>
               <h1 style={{ color: '#64748b' }}>Session</h1>
            </Col>

            <Col xs="auto">
               <Dropdown title="Action">
                  <Dropdown.Toggle
                     variant="link"
                     bsPrefix="p-0"
                     style={{ textDecoration: 'unset' }}
                  >
                     <Button>Action</Button>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                     <Dropdown.Item
                        onClick={() => {
                           setSeance(undefined)
                           setShowSeanceModal(true)
                        }}
                     >
                        Add new seance
                     </Dropdown.Item>
                     <Dropdown.Item
                        onClick={() => {
                           setShowDocumentModal(true)
                        }}
                     >
                        Add new document
                     </Dropdown.Item>
                     <Dropdown.Item
                        onClick={() => {
                           setShowTestModal(true)
                        }}
                     >
                        Add new test
                     </Dropdown.Item>
                  </Dropdown.Menu>
               </Dropdown>
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
               <Row>
                  <Col
                     xs="12"
                     style={{
                        fontWeight: 700,
                        marginBottom: '8px',
                        color: '#64748b',
                     }}
                  >
                     General
                  </Col>
                  <Col xs="12" md="6" className={styles.previewItem}>
                     <p>Name:</p>
                     <p>{session?.name}</p>
                  </Col>
                  <Col xs="12" md="6" className={styles.previewItem}>
                     <p>Start Date:</p>
                     <p>
                        {session?.dateStart
                           ? format(new Date(session.dateStart), 'dd/MM/yyyy')
                           : null}
                     </p>
                  </Col>
                  <Col xs="12" md="6" className={styles.previewItem}>
                     <p>End date:</p>
                     <p>
                        {session?.dateFin
                           ? format(new Date(session.dateFin), 'dd/MM/yyyy')
                           : null}
                     </p>
                  </Col>
                  <Col xs="12" md="6" className={styles.previewItem}>
                     <p>Class Name:</p>
                     <p>{session?.className}</p>
                  </Col>
                  <Col xs="12" md="6" className={styles.previewItem}>
                     <p>Place number:</p>
                     <p>{session?.nbrPlace}</p>
                  </Col>
                  <Col xs="12" md="6" className={styles.previewItem}>
                     <p>Formation:</p>
                     <p>{session?.formation?.name}</p>
                  </Col>
               </Row>

               <Row style={{ marginTop: '16px' }}>
                  <Col
                     xs="12"
                     style={{
                        fontWeight: 700,
                        marginBottom: '8px',
                        color: '#64748b',
                     }}
                  >
                     Seances
                  </Col>

                  {session && session?.seance?.length > 0 ? (
                     <Table striped bordered hover>
                        <thead>
                           <tr style={{ color: '#1a6ca8' }}>
                              <th>Numero</th>
                              <th>Date</th>
                              <th style={{ width: '200px' }}>Action</th>
                           </tr>
                        </thead>
                        <tbody style={{ borderTop: 'unset' }}>
                           {session.seance.map((element) => (
                              <tr>
                                 <td>{element.numero}</td>
                                 <td>
                                    {element?.date
                                       ? format(
                                            new Date(element.date),
                                            'dd-MM-yyyy'
                                         )
                                       : ''}
                                 </td>
                                 <td style={{ color: '#1a6ca8' }}>
                                    <Button
                                       variant="link"
                                       onClick={() => {
                                          setSeance(element)
                                          setShowSeanceModal(true)
                                       }}
                                    >
                                       <FontAwesomeIcon icon={faEdit} />
                                    </Button>
                                    <Button
                                       variant="link"
                                       onClick={async () => {
                                          const data = [...session.seance]
                                          const i = data.findIndex(
                                             (e) => e._id === element._id
                                          )
                                          data.splice(i, 1)

                                          await axios.delete(
                                             'http://localhost:4000/seance/' +
                                                session._id
                                          )
                                          await axios.put(
                                             'http://localhost:4000/session/' +
                                                session._id,
                                             { seance: data }
                                          )
                                          await mutateSession()
                                       }}
                                    >
                                       <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </Table>
                  ) : (
                     <Col>No seance to show</Col>
                  )}
               </Row>

               <Row style={{ marginTop: '16px' }}>
                  <Col
                     xs="12"
                     style={{
                        fontWeight: 700,
                        marginBottom: '8px',
                        color: '#64748b',
                     }}
                  >
                     Documents
                  </Col>

                  {documents && documents?.length > 0 ? (
                     <Table striped bordered hover>
                        <thead>
                           <tr style={{ color: '#1a6ca8' }}>
                              <th>Name</th>
                              <th style={{ width: '200px' }}>Action</th>
                           </tr>
                        </thead>
                        <tbody style={{ borderTop: 'unset' }}>
                           {documents.map((element) => (
                              <tr>
                                 <td>{element.name}</td>
                                 <td>
                                    <a href={element.url} download>
                                       <FontAwesomeIcon icon={faDownload} />
                                    </a>
                                    <Button
                                       variant="link"
                                       onClick={async () => {
                                          await axios.delete(
                                             'http://localhost:4000/document/' +
                                                element._id
                                          )
                                          await mutateDocument()
                                       }}
                                    >
                                       <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </Table>
                  ) : (
                     <Col>No documents to show</Col>
                  )}
               </Row>

               <Row style={{ marginTop: '16px' }}>
                  <Col
                     xs="12"
                     style={{
                        fontWeight: 700,
                        marginBottom: '8px',
                        color: '#64748b',
                     }}
                  >
                     Tests
                  </Col>

                  {tests && tests?.length > 0 ? (
                     <Table striped bordered hover>
                        <thead>
                           <tr style={{ color: '#1a6ca8' }}>
                              <th>Name</th>
                              <th>Type</th>
                              <th style={{ width: '200px' }}>Action</th>
                           </tr>
                        </thead>
                        <tbody style={{ borderTop: 'unset' }}>
                           {tests.map((element) => (
                              <tr>
                                 <td>{element.name}</td>
                                 <td>{element.type}</td>
                                 <td>
                                    <Button
                                       variant="link"
                                       onClick={() => {
                                          setTestPreview(element)
                                          setShowTestPreviewModal(true)
                                       }}
                                    >
                                       <FontAwesomeIcon icon={faList} />
                                    </Button>
                                    <Button
                                       variant="link"
                                       onClick={async () => {
                                          await axios.delete(
                                             'http://localhost:4000/devoir/' +
                                                element._id
                                          )
                                          await mutateDocument()
                                       }}
                                    >
                                       <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </Table>
                  ) : (
                     <Col>No tests to show</Col>
                  )}
               </Row>
            </Col>
         </Row>
         <SessionModal
            show={showModal}
            setShow={setShowModal}
            mutate={mutateSession}
            session={session}
         />
         <SeanceModal
            show={showSeanceModal}
            setShow={setShowSeanceModal}
            mutate={mutateSession}
            session={session}
            seance={seance}
         />
         <DocumentModal
            show={showDocumentModal}
            setShow={setShowDocumentModal}
            mutate={mutateDocument}
            //@ts-ignore
            session={session}
         />
         <TestModal
            show={showTestModal}
            setShow={setShowTestModal}
            mutate={mutateTest}
            //@ts-ignore
            session={session}
         />
         <TestPreview
            show={showTestPreviewModal}
            setShow={setShowTestPreviewModal}
            //@ts-ignore
            test={testPreview}
         />
      </div>
   )
}

export default TrainingDetail
