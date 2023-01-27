import { format } from 'date-fns'
import React from 'react'
import { Modal, Button, Row, Col } from 'react-bootstrap'
import { ISession } from 'src/types'

import styles from './session.module.css'

interface Props {
   show: boolean
   session?: ISession
   setShow: (data: boolean) => void
}

const AddSession = ({ show, setShow, session }: Props) => {
   const handleClose = () => {
      setShow(false)
   }
   return (
      <Modal show={show} onHide={handleClose} size="lg">
         <Modal.Header closeButton>
            <Modal.Title>{session?.name}</Modal.Title>
         </Modal.Header>
         <Modal.Body style={{ padding: '24px 32px' }}>
            <Row>
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
         </Modal.Body>
         <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
         </Modal.Footer>
      </Modal>
   )
}

export default AddSession
