import React from 'react'
import { Modal, Button, Row, Col } from 'react-bootstrap'
import { IUser } from 'src/types'

import styles from './users.module.css'

interface Props {
   show: boolean
   user?: IUser
   setShow: (data: boolean) => void
}

const AddUser = ({ show, setShow, user }: Props) => {
   const handleClose = () => {
      setShow(false)
   }
   return (
      <Modal show={show} onHide={handleClose} size="lg">
         <Modal.Header closeButton>
            <Modal.Title>{user?.firstName + ' ' + user?.lastName}</Modal.Title>
         </Modal.Header>
         <Modal.Body style={{ padding: '24px 32px' }}>
            <Row>
               <Col xs="12" md="6" className={styles.previewItem}>
                  <p>First name:</p>
                  <p>{user?.firstName}</p>
               </Col>
               <Col xs="12" md="6" className={styles.previewItem}>
                  <p>Last name:</p>
                  <p>{user?.lastName}</p>
               </Col>
               <Col xs="12" md="6" className={styles.previewItem}>
                  <p>Phone:</p>
                  <p>{user?.phone}</p>
               </Col>
               <Col xs="12" md="6" className={styles.previewItem}>
                  <p>Email:</p>
                  <p>{user?.email}</p>
               </Col>
               <Col xs="12" md="6" className={styles.previewItem}>
                  <p>Address:</p>
                  <p>{user?.address}</p>
               </Col>
               <Col xs="12" md="6" className={styles.previewItem}>
                  <p>Role:</p>
                  <p>{user?.role}</p>
               </Col>
            </Row>
         </Modal.Body>
         <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
         </Modal.Footer>
      </Modal>
   )
}

export default AddUser
