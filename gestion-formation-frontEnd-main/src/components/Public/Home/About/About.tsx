import { Row, Col } from 'react-bootstrap'
import sidebar from 'src/assets/sidebar-banner.jpg'

const About = () => {
   return (
      <Row style={{ marginTop: '16px' }}>
         <Col
            style={{
               backgroundColor: 'white',
               marginLeft: '8px',
               borderRadius: '8px',
               padding: '8px 16px',
            }}
         >
            <h1>
               Centres de Formation en Tunisie - Cabinet et Instituts de
               Formation Professionnelle en Tunisie
            </h1>
            <h2>
               Annuaire des Centres de Formation Professionnelle en Tunisie:
            </h2>
            <p>
               La formation professionnelle en Tunisie offerte par les centres
               et institus de formation contient 3 types de Formation
               (concernant les différents niveaux : formation avec bac,
               formation sans bac =formation niveau bac)
            </p>
            <ol>
               <li>
                  Formation initiale en Tunisie : Formation Diplomante : BTS,
                  BTP, CAP, Licences professionnells , Masteres Professionnelles
                  , Ingénieurs Professionnels ....
               </li>
               <li>Formation continue en Tunisie , et formation accélérée</li>
               <li>
                  Réforme du dispositif national de la formation professionnelle
               </li>
            </ol>
         </Col>
         <Col xs="auto">
            <img src={sidebar} alt="sidebar" />
         </Col>
      </Row>
   )
}

export default About
