import React, { FC, useEffect, useRef, useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { IDocument, ISession } from 'src/types'
import { Formik, ErrorMessage } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { KeyedMutator } from 'swr'

interface Props {
   show: boolean
   session: ISession
   mutate: KeyedMutator<IDocument[]>
   setShow: (data: boolean) => void
}

const schema = yup.object().shape({
   name: yup.string().required(),
   url: yup.mixed().required(),
})

const AddDocument: FC<Props> = ({ show, setShow, mutate, session }) => {
   const [valid, setValid] = useState<boolean>(false)

   const formikRef = useRef(null)

   const onSubmit = async (values: any, { resetForm }: any) => {
      setValid(true)

      await axios
         .post('http://localhost:4000/document', {
            ...values,
            session,
         })
         .then((res) => res.data)

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
         initialValues={{
            name: '',
            url: '',
         }}
      >
         {({
            handleSubmit,
            handleChange,
            handleReset,
            values,
            touched,
            errors,
            setFieldValue,
         }) => (
            <Modal
               show={show}
               onHide={() => {
                  handleReset()
                  handleClose()
               }}
            >
               <Modal.Header closeButton>
                  <Modal.Title>Add Document</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Form noValidate onSubmit={handleSubmit}>
                     <Row>
                        <Form.Group
                           as={Col}
                           md="12"
                           style={{ marginTop: '12px' }}
                        >
                           <Form.Label>Name</Form.Label>
                           <Form.Control
                              type="text"
                              placeholder="name"
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
                           md="12"
                           style={{ marginTop: '12px' }}
                        >
                           <Form.Label>File</Form.Label>
                           <Form.Control
                              type="file"
                              name="url"
                              onChange={(event: any) => {
                                 handleChangeFile(
                                    event.target.files[0],
                                    setFieldValue
                                 )
                              }}
                           />
                           <span style={{ color: 'red' }}>
                              <ErrorMessage name="url" />
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
                        <Button type="submit" disabled={valid}>
                           Save
                        </Button>
                     </div>
                  </Form>
               </Modal.Body>
            </Modal>
         )}
      </Formik>
   )
}

export default AddDocument

const handleChangeFile = (
   file: any,
   setFieldValue: (name: string, data: any) => void
) => {
   var reader = new FileReader()
   reader.readAsDataURL(file)
   reader.onload = function () {
      setFieldValue('url', reader.result)
   }
   reader.onerror = function (error) {
      console.log('Error: ', error)
   }
}
