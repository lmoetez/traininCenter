import { Row, Col, Table, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faList } from '@fortawesome/free-solid-svg-icons'

import useSession from 'src/hooks/useSession'
import useDocuments from 'src/hooks/useDocuments'

import styles from './session.module.css'
import TestModal from './TestModal'
import { useState } from 'react'
import { IDevoir } from 'src/types'
import useDevoirs from 'src/hooks/useDevoirs'

const TrainingDetail = () => {
   const { id } = useParams()

   const [showTestModal, setShowTestModal] = useState<boolean>(false)
   const [test, setTest] = useState<IDevoir>()

   const { session, loading: loadingSession } = useSession(id)
   const { documents, loading: loadingDocument } = useDocuments(id)
   const { tests, loading: loadingTest } = useDevoirs(id)

   if (loadingSession || loadingDocument || loadingTest)
      return <p>loading ...</p>

   return (
      <div style={{ padding: '0 24px' }}>
         <Row style={{ alignItems: 'center', marginTop: '16px' }}>
            <Col>
               <h1 style={{ color: '#64748b' }}>Session</h1>
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
                                          setTest(element)
                                          setShowTestModal(true)
                                       }}
                                    >
                                       <FontAwesomeIcon icon={faList} />
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

         <TestModal
            show={showTestModal}
            setShow={setShowTestModal}
            //@ts-ignore
            test={test}
         />
      </div>
   )
}

export default TrainingDetail
