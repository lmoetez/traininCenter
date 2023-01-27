import React, { useState } from 'react'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faList } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import UserModal from './UserModal'
import PreviewUser from './PreviewUser'
import useUsers from '../../../hooks/useUsers'
import { IUser } from 'src/types'

const Users = () => {
   const navigate = useNavigate()

   const [showModal, setShowModal] = useState<boolean>(false)
   const [showPreview, setShowPreview] = useState<boolean>(false)
   const [userSelected, setUserSelected] = useState<IUser>()
   const { users, loading, mutate } = useUsers()

   if (loading) return <p>loading</p>

   return (
      <div style={{ padding: '0 24px' }}>
         <Row style={{ alignItems: 'center', marginTop: '16px' }}>
            <Col>
               <h1 style={{ color: '#64748b' }}>Users</h1>
            </Col>
            <Col xs="auto">
               <Button
                  onClick={() => {
                     setUserSelected(undefined)
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
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody style={{ borderTop: 'unset' }}>
                     {users?.map((user, index) => (
                        <tr key={index}>
                           <td
                              style={{ cursor: 'pointer' }}
                              onClick={() => navigate('./' + user._id)}
                           >
                              {user.firstName}
                           </td>
                           <td
                              style={{ cursor: 'pointer' }}
                              onClick={() => navigate('./' + user._id)}
                           >
                              {user.lastName}
                           </td>
                           <td
                              style={{ cursor: 'pointer' }}
                              onClick={() => navigate('./' + user._id)}
                           >
                              {user.email}
                           </td>
                           <td
                              style={{ cursor: 'pointer' }}
                              onClick={() => navigate('./' + user._id)}
                           >
                              {user.role}
                           </td>
                           <td style={{ color: '#1a6ca8' }}>
                              <Button
                                 variant="link"
                                 onClick={() => {
                                    setUserSelected(user)
                                    setShowPreview(true)
                                 }}
                              >
                                 <FontAwesomeIcon icon={faList} />
                              </Button>
                              <Button
                                 variant="link"
                                 onClick={() => {
                                    setUserSelected(user)
                                    setShowModal(true)
                                 }}
                              >
                                 <FontAwesomeIcon icon={faEdit} />
                              </Button>
                              <Button
                                 variant="link"
                                 onClick={async () => {
                                    await axios.delete(
                                       'http://localhost:4000/user/' + user._id
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
         <UserModal
            show={showModal}
            setShow={setShowModal}
            mutate={mutate}
            user={userSelected}
         />
         <PreviewUser
            show={showPreview}
            setShow={setShowPreview}
            user={userSelected}
         />
      </div>
   )
}

export default Users
