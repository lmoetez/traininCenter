import { useEffect, useState } from 'react'
import axios from 'axios'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import { Row, Col, Container, Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import Users from 'src/components/Admin/Users'
import UserDetail from 'src/components/Admin/Users/UserDetail'
import Dashboard from 'src/components/Admin/Dashboard'
import Training from 'src/components/Admin/Training'
import TrainingDetail from 'src/components/Admin/Training/TrainingDetail'
import Session from 'src/components/Admin/Session/Session'
import SessionDetail from 'src/components/Admin/Session/SessionDetail'
import Profile from 'src/components/Admin/Profile'
import Inscription from 'src/components/Admin/Inscription'

import logo from 'src/assets/logo.jpg'
import styles from './AdminLayout.module.css'

import { IUser } from 'src/types'

function AdminLayout() {
   const navigator = useNavigate()

   const [user, setUser] = useState<IUser>()

   useEffect(() => {
      axios
         .get('http://localhost:4000/user/token')
         .then((res) => setUser(res.data))
   }, [])

   if (typeof window !== 'undefined') {
      //@ts-ignore
      if (!localStorage.getItem('token')) {
         navigator('/signin')
         return null
      }
   }

   return (
      <Container fluid>
         <Row style={{ backgroundColor: 'white', padding: '8px 40px' }}>
            <Col xs="auto">
               <img src={logo} alt="logo" style={{ width: '60px' }} />
            </Col>
            <Col xs="auto" className={styles.menuItem}>
               <Link to="/admin">Dashboard</Link>
            </Col>
            <Col xs="auto" className={styles.menuItem}>
               <Link to="/admin/trainings">Trainings</Link>
            </Col>
            <Col xs="auto" className={styles.menuItem}>
               <Link to="/admin/sessions">Sessions</Link>
            </Col>
            <Col xs="auto" className={styles.menuItem}>
               <Link to="/admin/inscriptions">Inscriptions</Link>
            </Col>
            <Col xs="auto" className={styles.menuItem}>
               <Link to="/admin/users">Users</Link>
            </Col>
            <Col className={styles.signin}>
               <Dropdown>
                  <Dropdown.Toggle
                     variant="link"
                     bsPrefix="p-0"
                     style={{ textDecoration: 'unset' }}
                  >
                     <FontAwesomeIcon
                        icon={faUser}
                        style={{ fontSize: '20px', marginRight: '8px' }}
                     />{' '}
                     <span
                        style={{
                           fontSize: '14px',
                           fontWeight: 700,
                        }}
                     >
                        {user ? user?.firstName + ' ' + user?.lastName : ''}
                     </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                     <Dropdown.Item href="/admin/profile">Profil</Dropdown.Item>
                     <Dropdown.Item
                        onClick={() => {
                           localStorage.removeItem('token')
                           localStorage.removeItem('role')
                           navigator('/signin')
                        }}
                     >
                        Sign out
                     </Dropdown.Item>
                  </Dropdown.Menu>
               </Dropdown>
            </Col>
         </Row>
         <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/trainings" element={<Training />} />
            <Route path="/trainings/:id" element={<TrainingDetail />} />
            <Route path="/sessions" element={<Session />} />
            <Route path="/sessions/:id" element={<SessionDetail />} />
            <Route path="/inscriptions" element={<Inscription />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route />
         </Routes>
      </Container>
   )
}

export default AdminLayout
