import { Row, Col, ListGroup } from 'react-bootstrap'
import avatar1 from 'src/assets/avatar1.jpg'
import avatar2 from 'src/assets/avatar2.png'
import avatar3 from 'src/assets/avatar3.png'
import CommunauteItem from './CommunauteItem'

const CommunauteList = () => {
   return (
      <Row
         style={{
            marginTop: '16px',
         }}
      >
         <Col xs="12" style={{ textAlign: 'center' }}>
            <h2>Notre Communauté</h2>
         </Col>
         <Col>
            <ListGroup horizontal>
               <CommunauteItem
                  img={avatar1}
                  title="Khaled Jemli"
                  description="Je suis très satisfaite. Vos cours sont vraiment
                           bénéfiques. Ils m'ont été d'un grand secours. Ils
                           m'ont facilité beaucoup de choses."
               />
               <CommunauteItem
                  img={avatar2}
                  title="Asma Amdouni"
                  description="Je suis très satisfaite. Vos cours sont vraiment
                           bénéfiques. Ils m'ont été d'un grand secours. Ils
                           m'ont facilité beaucoup de choses."
               />
               <CommunauteItem
                  img={avatar3}
                  title="Farouk Labidi"
                  description="Je suis très satisfaite. Vos cours sont vraiment
                           bénéfiques. Ils m'ont été d'un grand secours. Ils
                           m'ont facilité beaucoup de choses."
               />
            </ListGroup>
         </Col>
      </Row>
   )
}

export default CommunauteList
