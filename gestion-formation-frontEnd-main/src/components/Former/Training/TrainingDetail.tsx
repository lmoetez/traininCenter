import axios from 'axios'
import React, { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'

import useTraning from 'src/hooks/useTraning'
import useSessions from 'src/hooks/useSessions'

import styles from './traning.module.css'

const TrainingDetail = () => {
   const { id } = useParams()
   const navigate = useNavigate()

   const { traning, loading } = useTraning(id)
   const { sessions, loading: loadingSession } = useSessions()

   if (loading || loadingSession) return <p>loading ...</p>

   return (
      <div style={{ padding: '0 24px' }}>
         <Row style={{ alignItems: 'center', marginTop: '16px' }}>
            <Col>
               <h1 style={{ color: '#64748b' }}>Traning</h1>
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
                     <p>
                        {sessions?.filter(
                           (e) => e.formation._id === traning?._id
                        )?.length || 0}
                     </p>
                  </Col>
               </Row>
            </Col>
         </Row>
      </div>
   )
}

export default TrainingDetail
