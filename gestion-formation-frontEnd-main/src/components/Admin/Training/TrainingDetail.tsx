import axios from 'axios'
import React, { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'

import useTraning from 'src/hooks/useTraning'

import styles from './traning.module.css'
import TraningModal from './TraningModal'

const TrainingDetail = () => {
   const { id } = useParams()
   const navigate = useNavigate()

   const [showModal, setShowModal] = useState<boolean>(false)

   const { traning, loading, mutate } = useTraning(id)

   if (loading) return <p>loading ...</p>

   return (
      <div style={{ padding: '0 24px' }}>
         <Row style={{ alignItems: 'center', marginTop: '16px' }}>
            <Col>
               <h1 style={{ color: '#64748b' }}>Traning</h1>
            </Col>
            <Col xs="auto">
               <Button
                  onClick={() => {
                     setShowModal(true)
                  }}
               >
                  Edite
               </Button>
            </Col>
            <Col xs="auto">
               <Button
                  variant="danger"
                  onClick={async () => {
                     await axios.delete('http://localhost:4000/formation/' + id)
                     navigate('../trainings')
                  }}
               >
                  Delete
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
               <Row>
                  <Col xs="12" md="6" className={styles.previewItem}>
                     <p>Name:</p>
                     <p>{traning?.name}</p>
                  </Col>
                  <Col xs="12" md="6" className={styles.previewItem}>
                     <p>Level:</p>
                     <p>{traning?.niveau}</p>
                  </Col>
                  <Col xs="12" md="6" className={styles.previewItem}>
                     <p>Owner:</p>
                     <p>
                        {traning?.owner.firstName +
                           ' ' +
                           traning?.owner.lastName}
                     </p>
                  </Col>
                  <Col xs="12" md="6" className={styles.previewItem}>
                     <p>Formateur:</p>
                     <p>
                        {traning?.formateur.firstName +
                           ' ' +
                           traning?.formateur.lastName}
                     </p>
                  </Col>
                  <Col xs="12" md="6" className={styles.previewItem}>
                     <p>Number of sessions:</p>
                     <p>{traning?.sessionNumber}</p>
                  </Col>
               </Row>
            </Col>
         </Row>
         <TraningModal
            show={showModal}
            setShow={setShowModal}
            mutate={mutate}
            traning={traning}
         />
      </div>
   )
}

export default TrainingDetail
