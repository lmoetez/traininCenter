import { Row } from 'react-bootstrap'
import CopyRight from './CopyRight'
import Address from './Address'
import Info from './Info'

const Footer = () => {
   return (
      <>
         <Row
            style={{
               marginTop: '16px',
               backgroundColor: 'white',
               fontSize: '14px',
            }}
         >
            <Info />
            <Address />
         </Row>
         <CopyRight />
      </>
   )
}

export default Footer
