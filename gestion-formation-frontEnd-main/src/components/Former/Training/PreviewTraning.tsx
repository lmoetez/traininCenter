import React from 'react'
import { Modal, Button, Row, Col } from 'react-bootstrap'
import { ITraning } from 'src/types'

import useSessions from 'src/hooks/useSessions'

import styles from './traning.module.css'

interface Props {
   show: boolean
   traning?: ITraning
   setShow: (data: boolean) => void
}

const AddTraning = ({ show, setShow, traning }: Props) => {
   const { sessions, loading: loadingSession } = useSessions()

   const handleClose = () => {
      setShow(false)
   }
   return (
      <Modal show={show} onHide={handleClose} size="lg">
         <Modal.Header closeButton>
            <Modal.Title>{traning?.name}</Modal.Title>
         </Modal.Header>
         <Modal.Body style={{ padding: '24px 32px' }}>
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
                     {traning?.owner.firstName + ' ' + traning?.owner.lastName}
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
                     {sessions?.filter((e) => e.formation._id === traning?._id)
                        ?.length || 0}
                  </p>
               </Col>
            </Row>
         </Modal.Body>
         <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
         </Modal.Footer>
      </Modal>
   )
}

export default AddTraning
