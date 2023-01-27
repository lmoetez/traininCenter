import axios from 'axios'
import React, { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'

import useUser from 'src/hooks/useUser'

import styles from './users.module.css'
import UserModal from './UserModal'

const UserDetail = () => {
   const { id } = useParams()
   const navigate = useNavigate()

   const [showModal, setShowModal] = useState<boolean>(false)

   const { user, loading, mutate } = useUser(id)

   if (loading) return <p>loading ...</p>

   return (
      <div style={{ padding: '0 24px' }}>
         <Row style={{ alignItems: 'center', marginTop: '16px' }}>
            <Col>
               <h1 style={{ color: '#64748b' }}>User</h1>
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
                     await axios.delete('http://localhost:4000/user/' + id)
                     navigate('../users')
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
            </Col>
         </Row>
         <UserModal
            show={showModal}
            setShow={setShowModal}
            mutate={mutate}
            user={user}
         />
      </div>
   )
}

export default UserDetail
