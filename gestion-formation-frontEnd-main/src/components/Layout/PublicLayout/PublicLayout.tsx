import { Route, Routes, useNavigate } from 'react-router-dom'
import { Row, Col, Container, Dropdown } from 'react-bootstrap'
import logo from 'src/assets/logo.jpg'
import { Link } from 'react-router-dom'

import SignIn from 'src/components/Public/SignIn'
import SignUp from 'src/components/Public/SignUp'
import Home from 'src/components/Public/Home'
import Tranings from 'src/components/Public/Tranings'
import TraningDetail from 'src/components/Public/Tranings/TraningDetail'
import SessionDetail from 'src/components/Public/Session/SessionDetail'
import Inscription from 'src/components/Public/Inscription'
import Profile from 'src/components/Public/Profile'

import styles from './PublicLayout.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import useUserToken from 'src/hooks/useUserToken'
import { mutate } from 'swr'
import axios from 'axios'
import Basket from 'src/components/Public/Basket'

function PublicLayout() {
   const navigator = useNavigate()

   const { user, loading } = useUserToken()

   return (
      <Container
         fluid
         style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
      >
         <Row
            style={{
               backgroundColor: 'white',
               padding: '8px 40px',
            }}
         >
            <Col xs="auto">
               <img src={logo} alt="logo" style={{ width: '60px' }} />
            </Col>
            <Col xs="auto" className={styles.menuItem}>
               <Link to="/">Accueil</Link>
            </Col>
            <Col xs="auto" className={styles.menuItem}>
               <Link to="/trainings">Formations</Link>
            </Col>
            <Col className={styles.signin}>
               {!!user ? (
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
                        <Dropdown.Item href="/profile">Profil</Dropdown.Item>
                        <Dropdown.Item href="/Basket">
                           Mes inscriptions
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                           style={{ color: 'red' }}
                           onClick={() => {
                              localStorage.removeItem('token')
                              localStorage.removeItem('role')

                              axios.interceptors.request.use(
                                 async (config) => {
                                    config.headers = {
                                       Authorization: '',
                                    }

                                    return config
                                 },
                                 (error) => {
                                    Promise.reject(error)
                                 }
                              )

                              mutate(
                                 'http://localhost:4000/user/token',
                                 undefined
                              )

                              navigator('/signin')
                           }}
                        >
                           Deconnecter
                        </Dropdown.Item>
                     </Dropdown.Menu>
                  </Dropdown>
               ) : !user && loading ? (
                  <Link
                     to="/signin"
                     style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        textDecoration: 'unset',
                     }}
                  >
                     Se connecter
                  </Link>
               ) : null}
            </Col>
         </Row>
         <Row style={{ flex: 1, overflowY: 'auto', display: 'block' }}>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/trainings" element={<Tranings />} />
               <Route path="/trainings/:id" element={<TraningDetail />} />
               <Route path="/sessions/:id" element={<SessionDetail />} />
               <Route path="/profile" element={<Profile />} />
               <Route path="/Basket" element={<Basket />} />
               <Route path="/signin" element={<SignIn />} />
               <Route path="/signup" element={<SignUp />} />
               <Route path="/inscription/:id" element={<Inscription />} />
               <Route />
            </Routes>
         </Row>
      </Container>
   )
}

export default PublicLayout
