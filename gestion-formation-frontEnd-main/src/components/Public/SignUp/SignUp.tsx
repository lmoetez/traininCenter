import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { Formik, ErrorMessage } from 'formik'
import axios from 'axios'
import { ERole } from 'src/types'

const instanceAxios = axios.create()

const schema = yup.object().shape({
   firstName: yup.string().required(),
   lastName: yup.string().required(),
   phone: yup.string().required(),
   email: yup.string().required(),
   address: yup.string().required(),
   password: yup.string(),
})

const SignIn = () => {
   const navigate = useNavigate()

   const [valid, setValid] = useState<boolean>(false)

   useEffect(() => {
      if (localStorage.getItem('token')) {
         switch (localStorage.getItem('role')) {
            case ERole.admin.toString():
               return navigate('/admin')
            case ERole.formateur.toString():
               return navigate('/former')
            default:
               return navigate('/')
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const onSubmit = async (values: any, { setFieldError, resetForm }: any) => {
      setValid(true)
      try {
         await instanceAxios
            .post('http://localhost:4000/auth/signup', {
               ...values,
               role: ERole.candidat,
            })
            .then((res) => res.data)

         navigate('/signin')
      } catch (error: any) {
         setFieldError(true)
      }
   }

   return (
      <div style={{ padding: '0 24px', height: '100%' }}>
         <Row
            style={{
               marginTop: '16px',
               height: '100%',
               justifyContent: 'center',
               alignItems: 'center',
            }}
         >
            <Col
               style={{
                  backgroundColor: 'white',
                  padding: '24px ',
                  borderRadius: '8px',
                  maxWidth: '800px',
                  marginBottom: '30px',
               }}
            >
               <Formik
                  validationSchema={schema}
                  onSubmit={onSubmit}
                  initialValues={{
                     firstName: '',
                     lastName: '',
                     phone: '',
                     email: '',
                     address: '',
                     password: '',
                  }}
               >
                  {({
                     handleSubmit,
                     handleChange,
                     handleBlur,
                     handleReset,
                     values,
                     touched,
                     isValid,
                     errors,
                  }) => (
                     <Form noValidate onSubmit={handleSubmit}>
                        <Row>
                           <Form.Group
                              as={Col}
                              md="6"
                              style={{ marginTop: '12px' }}
                           >
                              <Form.Label>Prenom</Form.Label>
                              <Form.Control
                                 type="text"
                                 placeholder="Prenom"
                                 name="firstName"
                                 value={values.firstName}
                                 onChange={handleChange}
                                 isInvalid={
                                    valid &&
                                    (!touched.firstName || !!errors.firstName)
                                 }
                              />
                              <span style={{ color: 'red' }}>
                                 <ErrorMessage name="firstName" />
                              </span>
                           </Form.Group>
                           <Form.Group
                              as={Col}
                              md="6"
                              style={{ marginTop: '12px' }}
                           >
                              <Form.Label>Nom</Form.Label>
                              <Form.Control
                                 type="text"
                                 placeholder="Nom"
                                 name="lastName"
                                 value={values.lastName}
                                 onChange={handleChange}
                                 isInvalid={
                                    valid &&
                                    (!touched.lastName || !!errors.lastName)
                                 }
                              />
                              <span style={{ color: 'red' }}>
                                 <ErrorMessage name="lastName" />
                              </span>
                           </Form.Group>
                           <Form.Group
                              as={Col}
                              md="6"
                              style={{ marginTop: '12px' }}
                           >
                              <Form.Label>Numero de telephone</Form.Label>
                              <Form.Control
                                 type="text"
                                 placeholder="telephone"
                                 name="phone"
                                 value={values.phone}
                                 onChange={handleChange}
                                 isInvalid={
                                    valid && (!touched.phone || !!errors.phone)
                                 }
                              />
                              <span style={{ color: 'red' }}>
                                 <ErrorMessage name="phone" />
                              </span>
                           </Form.Group>
                           <Form.Group
                              as={Col}
                              md="6"
                              style={{ marginTop: '12px' }}
                           >
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                 placeholder="Email"
                                 type="email"
                                 name="email"
                                 value={values.email}
                                 onChange={handleChange}
                                 isInvalid={
                                    valid && (!touched.email || !!errors.email)
                                 }
                              />
                              <span style={{ color: 'red' }}>
                                 <ErrorMessage name="email" />
                              </span>
                           </Form.Group>
                           <Form.Group
                              as={Col}
                              md="6"
                              style={{ marginTop: '12px' }}
                           >
                              <Form.Label>Adresse</Form.Label>
                              <Form.Control
                                 placeholder="Adresse"
                                 type="text"
                                 name="address"
                                 value={values.address}
                                 onChange={handleChange}
                                 isInvalid={
                                    valid &&
                                    (!touched.address || !!errors.address)
                                 }
                              />
                              <span style={{ color: 'red' }}>
                                 <ErrorMessage name="address" />
                              </span>
                           </Form.Group>

                           <Form.Group
                              as={Col}
                              md="6"
                              style={{ marginTop: '12px' }}
                           >
                              <Form.Label>Mot de passe</Form.Label>
                              <Form.Control
                                 placeholder="Mot de passe"
                                 type="password"
                                 name="password"
                                 value={values.password}
                                 onChange={handleChange}
                                 isInvalid={
                                    valid &&
                                    (!touched.password || !!errors.password)
                                 }
                              />
                              <span style={{ color: 'red' }}>
                                 <ErrorMessage name="password" />
                              </span>
                           </Form.Group>
                        </Row>

                        <div
                           style={{
                              width: '100%',
                              textAlign: 'center',
                              marginTop: '16px',
                           }}
                        >
                           <Button type="submit">Cree</Button>
                        </div>
                     </Form>
                  )}
               </Formik>
            </Col>
         </Row>
      </div>
   )
}

export default SignIn
