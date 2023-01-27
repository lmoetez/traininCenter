import { FC } from 'react'
import { Modal, Button, Row, Col } from 'react-bootstrap'
import { IDevoir } from 'src/types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'

interface Props {
   show: boolean
   test: IDevoir
   setShow: (data: boolean) => void
}

const TestModal: FC<Props> = ({ show, setShow, test }) => {
   const handleClose = () => {
      setShow(false)
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
            {test?.questions?.map((question, index) => (
               <Row>
                  <Col xs="12" style={{ fontWeight: 600, fontSize: '16px' }}>
                     {index + 1}) {question.question}
                  </Col>
                  <Col xs="12">
                     {question.reponse === 'choix1' ? (
                        <span style={{ color: 'green' }}>
                           <FontAwesomeIcon icon={faCheckCircle} />
                        </span>
                     ) : (
                        <span style={{ color: 'red' }}>
                           <FontAwesomeIcon icon={faXmarkCircle} />
                        </span>
                     )}
                     <span style={{ paddingLeft: '8px' }}>
                        {question.choix[0]}
                     </span>
                  </Col>
                  <Col xs="12">
                     {question.reponse === 'choix2' ? (
                        <span style={{ color: 'green' }}>
                           <FontAwesomeIcon icon={faCheckCircle} />
                        </span>
                     ) : (
                        <span style={{ color: 'red' }}>
                           <FontAwesomeIcon icon={faXmarkCircle} />
                        </span>
                     )}
                     <span style={{ paddingLeft: '8px' }}>
                        {question.choix[1]}
                     </span>
                  </Col>
                  <Col xs="12">
                     {question.reponse === 'choix3' ? (
                        <span style={{ color: 'green' }}>
                           <FontAwesomeIcon icon={faCheckCircle} />
                        </span>
                     ) : (
                        <span style={{ color: 'red' }}>
                           <FontAwesomeIcon icon={faXmarkCircle} />
                        </span>
                     )}
                     <span style={{ paddingLeft: '8px' }}>
                        {question.choix[2]}
                     </span>
                  </Col>
               </Row>
            ))}
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
            </div>
         </Modal.Body>
      </Modal>
   )
}

export default TestModal
