import { Row, Col, Button } from 'react-bootstrap'
import background from 'src/assets/interimaires-formation.png'
import { useNavigate } from 'react-router-dom'

const Carousel = () => {
   const navigate = useNavigate()

   return (
      <Row>
         <Col
            style={{
               padding: 0,
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               position: 'relative',
            }}
            xs="12"
         >
            <div style={{ position: 'absolute', textAlign: 'center' }}>
               <Button
                  variant="primary"
                  style={{ fontSize: '20px', fontWeight: 700 }}
                  onClick={() => navigate('./trainings')}
               >
                  Consulter Nos Offres
               </Button>
            </div>
            <img src={background} alt="backgroung" style={{ width: '100%' }} />
         </Col>
      </Row>
   )
}

export default Carousel
