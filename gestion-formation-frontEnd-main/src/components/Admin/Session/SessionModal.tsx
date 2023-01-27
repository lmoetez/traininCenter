import React, { useEffect, useRef, useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { ERole, ISession } from 'src/types'
import { Formik, ErrorMessage } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { KeyedMutator } from 'swr'
import useTranings from 'src/hooks/useTranings'
import { format } from 'date-fns'

interface Props {
   show: boolean
   session?: ISession
   mutate: KeyedMutator<ISession[]> | KeyedMutator<ISession>
   setShow: (data: boolean) => void
}

const schema = yup.object().shape({
   name: yup.string().required(),
   dateStart: yup.string().required(),
   dateFin: yup.string().required(),
   className: yup.string().required(),
   nbrPlace: yup.number().required(),
   formation: yup.string().required(),
})

const AddSession = ({ show, setShow, mutate, session }: Props) => {
   const [valid, setValid] = useState<boolean>(false)

   const formikRef = useRef(null)

   const { tranings } = useTranings()

   useEffect(() => {
      if (formikRef.current) {
         const formikValue: any = formikRef.current
         formikValue.setFieldValue('name', session?.name || '')
         formikValue.setFieldValue(
            'dateStart',
            session?.dateStart
               ? format(new Date(session.dateStart), 'yyyy-MM-dd')
               : ''
         )
         formikValue.setFieldValue(
            'dateFin',
            session?.dateFin
               ? format(new Date(session.dateFin), 'yyyy-MM-dd')
               : ''
         )
         formikValue.setFieldValue('className', session?.className || '')
         formikValue.setFieldValue('nbrPlace', session?.nbrPlace || '')
         formikValue.setFieldValue('formation', session?.formation?._id || '')
      }
   }, [session, show])

   const onSubmit = async (values: any, { resetForm }: any) => {
      setValid(true)

      if (session?._id)
         await axios.put('http://localhost:4000/session/' + session._id, values)
      else await axios.post('http://localhost:4000/session', values)
      await mutate()
      handleClose()
      resetForm()
      setValid(false)
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
            session || {
               name: '',
               dateStart: '',
               dateFin: '',
               className: '',
               nbrPlace: '',
               formation: '',
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
                  <Modal.Title>
                     {session?._id ? 'Add' : 'Edit'} Session
                  </Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Form noValidate onSubmit={handleSubmit}>
                     <Row>
                        <Form.Group
                           as={Col}
                           md="6"
                           style={{ marginTop: '12px' }}
                        >
                           <Form.Label>Name</Form.Label>
                           <Form.Control
                              type="text"
                              placeholder="Name"
                              name="name"
                              value={values.name}
                              onChange={handleChange}
                              isInvalid={
                                 valid && (!touched.name || !!errors.name)
                              }
                           />
                           <span style={{ color: 'red' }}>
                              <ErrorMessage name="name" />
                           </span>
                        </Form.Group>
                        <Form.Group
                           as={Col}
                           md="6"
                           style={{ marginTop: '12px' }}
                        >
                           <Form.Label>Start Date</Form.Label>
                           <Form.Control
                              type="date"
                              placeholder="Start Date"
                              name="dateStart"
                              value={values.dateStart?.toString()}
                              onChange={handleChange}
                              isInvalid={
                                 valid &&
                                 (!touched.dateStart || !!errors.dateStart)
                              }
                           />
                           <span style={{ color: 'red' }}>
                              <ErrorMessage name="dateStart" />
                           </span>
                        </Form.Group>
                        <Form.Group
                           as={Col}
                           md="6"
                           style={{ marginTop: '12px' }}
                        >
                           <Form.Label>End date</Form.Label>
                           <Form.Control
                              type="date"
                              placeholder="End date"
                              name="dateFin"
                              value={values.dateFin?.toString()}
                              onChange={handleChange}
                              isInvalid={
                                 valid && (!touched.dateFin || !!errors.dateFin)
                              }
                           />
                           <span style={{ color: 'red' }}>
                              <ErrorMessage name="dateFin" />
                           </span>
                        </Form.Group>
                        <Form.Group
                           as={Col}
                           md="6"
                           style={{ marginTop: '12px' }}
                        >
                           <Form.Label>Class Name</Form.Label>
                           <Form.Control
                              type="text"
                              placeholder="Class Name"
                              name="className"
                              value={values.className?.toString()}
                              onChange={handleChange}
                              isInvalid={
                                 valid &&
                                 (!touched.className || !!errors.className)
                              }
                           />
                           <span style={{ color: 'red' }}>
                              <ErrorMessage name="className" />
                           </span>
                        </Form.Group>
                        <Form.Group
                           as={Col}
                           md="6"
                           style={{ marginTop: '12px' }}
                        >
                           <Form.Label>Place number</Form.Label>
                           <Form.Control
                              type="number"
                              placeholder="Place number"
                              name="nbrPlace"
                              value={values.nbrPlace?.toString()}
                              onChange={handleChange}
                              isInvalid={
                                 valid &&
                                 (!touched.nbrPlace || !!errors.nbrPlace)
                              }
                           />
                           <span style={{ color: 'red' }}>
                              <ErrorMessage name="nbrPlace" />
                           </span>
                        </Form.Group>
                        <Form.Group
                           as={Col}
                           md="6"
                           style={{ marginTop: '12px' }}
                        >
                           <Form.Label>Formation</Form.Label>
                           <Form.Control
                              as="select"
                              placeholder="Select"
                              name="formation"
                              value={values?.formation?.toString()}
                              onChange={handleChange}
                              isInvalid={
                                 valid &&
                                 (!touched.formation || !!errors.formation)
                              }
                           >
                              <option value={undefined}>Select option</option>
                              {tranings?.map((traning) => (
                                 <option value={traning._id}>
                                    {traning.name}
                                 </option>
                              ))}
                           </Form.Control>
                           <span style={{ color: 'red' }}>
                              <ErrorMessage name="formation" />
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

export default AddSession
