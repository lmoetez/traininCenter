import React, { FC, useRef, useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { IDevoir, IQuestion, ISession } from 'src/types'
import { Formik, ErrorMessage } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { KeyedMutator } from 'swr'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

interface Props {
   show: boolean
   session: ISession
   mutate: KeyedMutator<IDevoir[]>
   setShow: (data: boolean) => void
}

const schema = yup.object().shape({
   name: yup.string().required(),
   type: yup.string().required(),
})

const TestModal: FC<Props> = ({ show, setShow, mutate, session }) => {
   const [questionsArray, setQuestionsArray] = useState<IQuestion[]>([])
   const [valid, setValid] = useState<boolean>(false)

   const formikRef = useRef(null)

   const onSubmit = async (values: any, { resetForm }: any) => {
      setValid(true)

      await axios
         .post('http://localhost:4000/devoir', {
            ...values,
            session,
            questions: questionsArray,
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
            type: '',
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
               size="lg"
               show={show}
               onHide={() => {
                  handleReset()
                  handleClose()
               }}
            >
               <Modal.Header closeButton>
                  <Modal.Title>Add Test</Modal.Title>
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
                           <Form.Label>Type</Form.Label>
                           <Form.Control
                              as="select"
                              type="text"
                              placeholder="type"
                              name="type"
                              value={values.type}
                              onChange={handleChange}
                              isInvalid={
                                 valid && (!touched.type || !!errors.type)
                              }
                           >
                              <option value={undefined}>Select option</option>
                              <option value="examen">Examen</option>
                              <option value="test">Test</option>
                           </Form.Control>
                           <span style={{ color: 'red' }}>
                              <ErrorMessage name="type" />
                           </span>
                        </Form.Group>
                        <Col md="12" style={{ marginTop: '24px' }}>
                           <Form.Label>Questions:</Form.Label>

                           {questionsArray?.map((question, index) => (
                              <Row style={{ marginBottom: '24px' }}>
                                 {index > 0 && (
                                    <hr
                                       style={{ borderTop: '2px dashed #bbb' }}
                                    ></hr>
                                 )}
                                 <Form.Group
                                    as={Col}
                                    style={{ marginTop: '12px' }}
                                 >
                                    <Form.Label>question{index + 1}</Form.Label>
                                    <Form.Control
                                       type="text"
                                       value={question.question}
                                       onChange={(e) => {
                                          setQuestionsArray((prev) => {
                                             const data = [...prev]
                                             data[index].question =
                                                e.target.value

                                             return data
                                          })
                                       }}
                                    />
                                 </Form.Group>
                                 <Form.Group
                                    as={Col}
                                    style={{ marginTop: '12px' }}
                                 >
                                    <Form.Label>Choix1</Form.Label>
                                    <Form.Control
                                       type="text"
                                       value={question.choix[0]}
                                       onChange={(e) => {
                                          setQuestionsArray((prev) => {
                                             const data = [...prev]
                                             data[index].choix[0] =
                                                e.target.value

                                             return data
                                          })
                                       }}
                                    />
                                    <Form.Label>Choix2</Form.Label>
                                    <Form.Control
                                       type="text"
                                       value={question.choix[1]}
                                       onChange={(e) => {
                                          setQuestionsArray((prev) => {
                                             const data = [...prev]
                                             data[index].choix[1] =
                                                e.target.value

                                             return data
                                          })
                                       }}
                                    />
                                    <Form.Label>Choix3</Form.Label>
                                    <Form.Control
                                       type="text"
                                       value={question.choix[2]}
                                       onChange={(e) => {
                                          setQuestionsArray((prev) => {
                                             const data = [...prev]
                                             data[index].choix[2] =
                                                e.target.value

                                             return data
                                          })
                                       }}
                                    />
                                 </Form.Group>
                                 <Form.Group
                                    as={Col}
                                    style={{ marginTop: '12px' }}
                                 >
                                    <Form.Label>Reponse</Form.Label>
                                    <Form.Control
                                       as="select"
                                       value={question.reponse}
                                       onChange={(e) => {
                                          setQuestionsArray((prev) => {
                                             const data = [...prev]
                                             data[index].reponse =
                                                e.target.value

                                             return data
                                          })
                                       }}
                                    >
                                       <option value={undefined}>
                                          Select option
                                       </option>
                                       <option value="choix1">Choix1</option>
                                       <option value="choix2">Choix2</option>
                                       <option value="choix3">Choix3</option>
                                    </Form.Control>
                                 </Form.Group>
                                 <Col
                                    md="auto"
                                    style={{
                                       display: 'flex',
                                       alignItems: 'center',
                                       color: 'red',
                                    }}
                                 >
                                    <FontAwesomeIcon
                                       icon={faTrash}
                                       onClick={() => {
                                          setQuestionsArray((prev) => {
                                             const data = [...prev]
                                             data.splice(index, 1)
                                             return data
                                          })
                                       }}
                                    />
                                 </Col>
                              </Row>
                           ))}
                           <Button
                              style={{ width: '100%' }}
                              onClick={() => {
                                 setQuestionsArray((prev) => [
                                    ...prev,
                                    {
                                       question: '',
                                       choix: ['', '', ''],
                                       reponse: '',
                                    },
                                 ])
                              }}
                           >
                              Add question
                           </Button>
                        </Col>
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

export default TestModal
