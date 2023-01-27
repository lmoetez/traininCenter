import { useState, useEffect } from 'react'
import { Container, Row, Col, Dropdown } from 'react-bootstrap'
import { Route, Routes, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import logo from 'src/assets/logo.jpg'

import Dashboard from 'src/components/Former/Dashboard'
import Training from 'src/components/Former/Training/Training'
import TrainingDetail from 'src/components/Former/Training/TrainingDetail'
import Session from 'src/components/Former/Session/Session'
import SessionDetail from 'src/components/Former/Session/SessionDetail'
import Profile from 'src/components/Former/Profile'

import styles from './FormateurLayout.module.css'
import { IUser } from 'src/types'

function FormerLayout() {
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
               <Link to="/former">Dashboard</Link>
            </Col>
            <Col xs="auto" className={styles.menuItem}>
               <Link to="/former/trainings">Trainings</Link>
            </Col>
            <Col xs="auto" className={styles.menuItem}>
               <Link to="/former/sessions">Sessions</Link>
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
                     <Dropdown.Item href="#">Profil</Dropdown.Item>
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
            <Route path="/profile" element={<Profile />} />
            <Route />
         </Routes>
      </Container>
   )
}

export default FormerLayout
