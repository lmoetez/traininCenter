import React, { useEffect, useRef, useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { ERole, IUser } from 'src/types'
import { Formik, ErrorMessage } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { KeyedMutator } from 'swr'

interface Props {
   show: boolean
   user?: IUser
   mutate: KeyedMutator<IUser[]> | KeyedMutator<IUser>
   setShow: (data: boolean) => void
}

const schema = yup.object().shape({
   firstName: yup.string().required(),
   lastName: yup.string().required(),
   phone: yup.string().required(),
   email: yup.string().required(),
   address: yup.string().required(),
   password: yup.string(),
})

const AddUser = ({ show, setShow, mutate, user }: Props) => {
   const [valid, setValid] = useState<boolean>(false)

   const formikRef = useRef(null)

   useEffect(() => {
      if (formikRef.current) {
         const formikValue: any = formikRef.current
         formikValue.setFieldValue('firstName', user?.firstName || '')
         formikValue.setFieldValue('lastName', user?.lastName || '')
         formikValue.setFieldValue('phone', user?.phone || '')
         formikValue.setFieldValue('email', user?.email || '')
         formikValue.setFieldValue('address', user?.address || '')
         formikValue.setFieldValue(
            'role',
            user?.role || Object.values(ERole)[0]
         )
         formikValue.setFieldValue('password', '')
      }
   }, [user, show])

   const onSubmit = async (values: any, { setFieldError, resetForm }: any) => {
      setValid(true)
      try {
         if (user?._id)
            await axios.put('http://localhost:4000/user/' + user._id, values)
         else await axios.post('http://localhost:4000/user', values)
         await mutate()
         handleClose()
         resetForm()
         setValid(false)
      } catch (error: any) {
         if (error.response?.data?.message === 'Email Exist')
            setFieldError('email', 'Email Exist')
      }
   }

   const handleClose = () => {
      setShow(false)
   }
   return (
      <Formik
         innerRef={formikRef}
         validationSchema={schema}
         onSubmit={onSubmit}
         initialValues={
            user || {
               firstName: '',
               lastName: '',
               phone: '',
               email: '',
               address: '',
               role: Object.values(ERole)[0],
               password: '',
            }
         }
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
            <Modal
               show={show}
               onHide={() => {
                  handleReset()
                  handleClose()
               }}
            >
               <Modal.Header closeButton>
                  <Modal.Title>Editer</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Form noValidate onSubmit={handleSubmit}>
                     <Row>
                        <Form.Group
                           as={Col}
                           md="6"
                           style={{ marginTop: '12px' }}
                        >
                           <Form.Label>First name</Form.Label>
                           <Form.Control
                              type="text"
                              placeholder="First name"
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
                           <Form.Label>Last name</Form.Label>
                           <Form.Control
                              type="text"
                              placeholder="Last name"
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
                           <Form.Label>Phone</Form.Label>
                           <Form.Control
                              type="text"
                              placeholder="Phone"
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
                           <Form.Label>Address</Form.Label>
                           <Form.Control
                              placeholder="Address"
                              type="text"
                              name="address"
                              value={values.address}
                              onChange={handleChange}
                              isInvalid={
                                 valid && (!touched.address || !!errors.address)
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
                           <Form.Label>Password</Form.Label>
                           <Form.Control
                              placeholder="Password"
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
                           textAlign: 'right',
                           marginTop: '16px',
                        }}
                     >
                        <Button
                           style={{
                              marginRight: '8px',
                           }}
                           variant="secondary"
                           onClick={() => {
                              handleReset()
                              handleClose()
                           }}
                        >
                           Close
                        </Button>
                        <Button type="submit">Save</Button>
                     </div>
                  </Form>
               </Modal.Body>
            </Modal>
         )}
      </Formik>
   )
}

export default AddUser
