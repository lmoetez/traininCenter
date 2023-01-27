import { Col } from 'react-bootstrap'
import logo from 'src/assets/logo.jpg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons'

const Info = () => {
   return (
      <Col xs="auto" style={{ padding: '16px 32px' }}>
         <img src={logo} alt="logo" style={{ width: '100px' }} />
         <div style={{ marginTop: 16 }}>
            <span style={{ marginRight: 16, color: '#1a6ca8' }}>
               <FontAwesomeIcon icon={faPhoneAlt} />
            </span>
            +216 72 483 164
         </div>
         <div>
            <span style={{ marginRight: 16, color: '#1a6ca8' }}>
               <FontAwesomeIcon icon={faEnvelopeOpen} />
            </span>
            contact@formation.tn
         </div>
      </Col>
   )
}

export default Info
