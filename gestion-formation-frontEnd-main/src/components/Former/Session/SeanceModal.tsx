import React, { useEffect, useRef, useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { ERole, ISeance, ISession } from 'src/types'
import { Formik, ErrorMessage } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { KeyedMutator } from 'swr'
import { format } from 'date-fns'

interface Props {
   show: boolean
   seance?: ISeance
   session?: ISession
   mutate: KeyedMutator<ISession>
   setShow: (data: boolean) => void
}

const schema = yup.object().shape({
   numero: yup.number().required(),
   date: yup.string().required(),
})

const AddSeance = ({ show, setShow, mutate, seance, session }: Props) => {
   const [valid, setValid] = useState<boolean>(false)

   const formikRef = useRef(null)

   useEffect(() => {
      if (formikRef.current) {
         const formikValue: any = formikRef.current
         formikValue.setFieldValue('numero', seance?.numero || '')
         formikValue.setFieldValue(
            'date',
            seance?.date ? format(new Date(seance.date), 'yyyy-MM-dd') : ''
         )
      }
   }, [seance, show])

   const onSubmit = async (values: any, { resetForm }: any) => {
      setValid(true)

      if (seance?._id)
         await axios.put('http://localhost:4000/seance/' + seance._id, values)
      else {
         const res = await axios
            .post('http://localhost:4000/seance', values)
            .then((res) => res.data)
         await axios.put('http://localhost:4000/session/' + session?._id, {
            seance: session?.seance ? [...session.seance, res._id] : [res._id],
         })
      }
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
            seance || {
               numero: '',
               date: '',
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
                  <Modal.Title>Add Seance</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Form noValidate onSubmit={handleSubmit}>
                     <Row>
                        <Form.Group
                           as={Col}
                           md="6"
                           style={{ marginTop: '12px' }}
                        >
                           <Form.Label>Number</Form.Label>
                           <Form.Control
                              type="text"
                              placeholder="numero"
                              name="numero"
                              value={values.numero}
                              onChange={handleChange}
                              isInvalid={
                                 valid && (!touched.numero || !!errors.numero)
                              }
                           />
                           <span style={{ color: 'red' }}>
                              <ErrorMessage name="numero" />
                           </span>
                        </Form.Group>
                        <Form.Group
                           as={Col}
                           md="6"
                           style={{ marginTop: '12px' }}
                        >
                           <Form.Label>Date</Form.Label>
                           <Form.Control
                              type="date"
                              placeholder="Date"
                              name="date"
                              value={values.date?.toString()}
                              onChange={handleChange}
                              isInvalid={
                                 valid && (!touched.date || !!errors.date)
                              }
                           />
                           <span style={{ color: 'red' }}>
                              <ErrorMessage name="date" />
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

export default AddSeance
