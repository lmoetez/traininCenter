import React, { useEffect, useRef, useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { ERole, ITraning } from 'src/types'
import { Formik, ErrorMessage } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { KeyedMutator } from 'swr'
import useUsers from 'src/hooks/useUsers'

interface Props {
   show: boolean
   traning?: ITraning
   mutate: KeyedMutator<ITraning[]> | KeyedMutator<ITraning>
   setShow: (data: boolean) => void
}

const schema = yup.object().shape({
   name: yup.string().required(),
   niveau: yup.string().required(),
   owner: yup.string().required(),
   formateur: yup.string().required(),
})

const AddTraning = ({ show, setShow, mutate, traning }: Props) => {
   const [valid, setValid] = useState<boolean>(false)

   const formikRef = useRef(null)

   const { users } = useUsers()

   useEffect(() => {
      if (formikRef.current) {
         const formikValue: any = formikRef.current
         formikValue.setFieldValue('name', traning?.name || '')
         formikValue.setFieldValue('niveau', traning?.niveau || '')
         formikValue.setFieldValue('owner', traning?.owner?._id || '')
         formikValue.setFieldValue('formateur', traning?.formateur?._id || '')
      }
   }, [traning, show])

   const onSubmit = async (values: any, { resetForm }: any) => {
      setValid(true)

      if (traning?._id)
         await axios.put(
            'http://localhost:4000/formation/' + traning._id,
            values
         )
      else await axios.post('http://localhost:4000/formation', values)
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
            traning || {
               name: '',
               niveau: '',
               owner: '',
               formateur: '',
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
                     {traning?._id ? 'Add' : 'Edit'} Traning
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
                           <Form.Label>Level</Form.Label>
                           <Form.Control
                              type="text"
                              placeholder="Level"
                              name="niveau"
                              value={values.niveau}
                              onChange={handleChange}
                              isInvalid={
                                 valid && (!touched.niveau || !!errors.niveau)
                              }
                           />
                           <span style={{ color: 'red' }}>
                              <ErrorMessage name="niveau" />
                           </span>
                        </Form.Group>
                        <Form.Group
                           as={Col}
                           md="6"
                           style={{ marginTop: '12px' }}
                        >
                           <Form.Label>Owner</Form.Label>
                           <Form.Control
                              as="select"
                              placeholder="Select"
                              name="owner"
                              value={values?.owner?.toString()}
                              onChange={handleChange}
                              isInvalid={
                                 valid && (!touched.owner || !!errors.owner)
                              }
                           >
                              <option value={undefined}>Select option</option>
                              {users
                                 ?.filter((e) => e.role === ERole.admin)
                                 ?.map((user) => (
                                    <option value={user._id}>
                                       {user.firstName + ' ' + user.lastName}
                                    </option>
                                 ))}
                           </Form.Control>
                           <span style={{ color: 'red' }}>
                              <ErrorMessage name="owner" />
                           </span>
                        </Form.Group>
                        <Form.Group
                           as={Col}
                           md="6"
                           style={{ marginTop: '12px' }}
                        >
                           <Form.Label>Formateur</Form.Label>
                           <Form.Control
                              as="select"
                              placeholder="Select"
                              name="formateur"
                              value={values?.formateur?.toString()}
                              onChange={handleChange}
                              isInvalid={
                                 valid &&
                                 (!touched.formateur || !!errors.formateur)
                              }
                           >
                              <option value={undefined}>Select option</option>
                              {users
                                 ?.filter((e) => e.role === ERole.formateur)
                                 ?.map((user) => (
                                    <option value={user._id}>
                                       {user.firstName + ' ' + user.lastName}
                                    </option>
                                 ))}
                           </Form.Control>
                           <span style={{ color: 'red' }}>
                              <ErrorMessage name="formateur" />
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

export default AddTraning
