import { FC, useState } from 'react'
import { Modal, Button, Row, Col } from 'react-bootstrap'
import { IDevoir } from 'src/types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import useFeuilleDevoir from 'src/hooks/useFeuilleDevoir'
import axios from 'axios'
import useUserToken from 'src/hooks/useUserToken'

interface Props {
   show: boolean
   test: IDevoir
   setShow: (data: boolean) => void
}

const TestModal: FC<Props> = ({ show, setShow, test }) => {
   const [reponses, setReponses] = useState<string[]>([])
   const [isLoading, setIsLoading] = useState<boolean>(false)

   const { feuille, loading, mutate } = useFeuilleDevoir(test?._id)
   const { user } = useUserToken()

   const handleFinish = async () => {
      setIsLoading(true)
      let note = 0
      const questionNote = 20 / test.questions.length
      reponses.map((e, index) =>
         e === test.questions[index].reponse ? (note += questionNote) : null
      )
      await axios.post('http://localhost:4000/feuilleDevoir', {
         devoir: test._id,
         questions: reponses.map((e, index) => ({
            response: e,
            question: test.questions[index]._id,
         })),
         user: user?._id,
         note: note.toFixed(2),
      })
      await mutate()
      setIsLoading(false)
   }

   const handleClose = () => {
      setShow(false)
      setReponses([])
   }
   return (
      <Modal
         size="lg"
         show={show}
         onHide={() => {
            handleClose()
         }}
      >
         <Modal.Header closeButton>
            <Modal.Title>{test?.name}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {loading ? (
               'loading...'
            ) : feuille.dev ? (
               <div>
                  Votre note est <b>{feuille.dev.note}/20</b>
               </div>
            ) : (
               test?.questions?.map((question, index) => (
                  <Row>
                     <Col xs="12" style={{ fontWeight: 600, fontSize: '16px' }}>
                        {index + 1}) {question.question}
                     </Col>
                     <Col xs="12">
                        <input
                           type="checkbox"
                           name={'Q' + index}
                           checked={reponses[index] === 'choix1'}
                           onChange={(e) => {
                              setReponses((prev) => {
                                 const data = [...prev]
                                 if (e.target.checked) data[index] = 'choix1'
                                 else data[index] = ''

                                 return data
                              })
                           }}
                        />
                        <span style={{ paddingLeft: '8px' }}>
                           {question.choix[0]}
                        </span>
                     </Col>
                     <Col xs="12">
                        <input
                           type="checkbox"
                           checked={reponses[index] === 'choix2'}
                           name={'Q' + index}
                           onChange={(e) => {
                              setReponses((prev) => {
                                 const data = [...prev]
                                 if (e.target.checked) data[index] = 'choix2'
                                 else data[index] = ''

                                 return data
                              })
                           }}
                        />
                        <span style={{ paddingLeft: '8px' }}>
                           {question.choix[1]}
                        </span>
                     </Col>
                     <Col xs="12">
                        <input
                           type="checkbox"
                           name={'Q' + index}
                           checked={reponses[index] === 'choix3'}
                           onChange={(e) => {
                              setReponses((prev) => {
                                 const data = [...prev]
                                 if (e.target.checked) data[index] = 'choix3'
                                 else data[index] = ''

                                 return data
                              })
                           }}
                        />
                        <span style={{ paddingLeft: '8px' }}>
                           {question.choix[2]}
                        </span>
                     </Col>
                  </Row>
               ))
            )}
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
                     handleClose()
                  }}
               >
                  Close
               </Button>
               {!loading && !feuille.dev && (
                  <Button onClick={handleFinish} disabled={isLoading}>
                     Save
                  </Button>
               )}
            </div>
         </Modal.Body>
      </Modal>
   )
}

export default TestModal
