import { Row, Col } from 'react-bootstrap'

const Address = () => {
   return (
      <Col style={{ padding: '16px 32px' }}>
         <h3 style={{ marginBottom: '16px' }}>Nos Address</h3>
         <Row>
            <Col xs="6" style={{ paddingRight: '32px' }}>
               <b>Local Khezema (Sousse) :</b>
               <p>
                  Imm. Wejden ,3ème Etage B.306 - Bloc B ,Rue du Maghreb Arabe
                  ,Khezema - Sousse 4071.
               </p>
            </Col>
            <Col xs="6">
               <b>Local Bardo (Tunis) :</b>
               <p>
                  Imm. Lacheb, 2ème étage, B2.6, Avenue Habib Bourguiba, Bardo -
                  Tunis 2000.
               </p>
            </Col>
            <Col xs="6" style={{ paddingRight: '32px' }}>
               <b>Local Centre Urbain Nord (Tunis) :</b>
               <p>
                  Imm. Yasmine Tower, 2ème étage, B2.8 Bloc A, Centre Urbain
                  Nord - Tunis.
               </p>
            </Col>
            <Col xs="6">
               <b>Local Nabeul :</b>
               <p>
                  Imm. Zbeida, 4ème étage, A.41, Av. Habib Thameur - Nabeul
                  8000.
               </p>
            </Col>
            <Col xs="6" style={{ paddingRight: '32px' }}>
               <b>Local Monastir :</b>
               <p>
                  Imm. El Ghomrassi, 5ème étage, B.501, Rue Combattant Suprême,
                  En face de "Selma Centre".
               </p>
            </Col>
            <Col xs="6">
               <b>Local El Menzah (Ariana) :</b>
               <p>
                  Imm. 42, 2ème étage, B.05, Rue Muawiyah Ibn Abi Sufyan, près
                  de patisserie "Takacim" Menzah 5 - Ariana 2091.
               </p>
            </Col>
            <Col xs="6" style={{ paddingRight: '32px' }}>
               <b>Local Ezzahra (Ben Arous) :</b>
               <p>
                  Centre Médical Jawhara, 2ème étage, Rue 14 janvier, près de
                  "MG Ennakhil" Ezzahra - Ben Arous 2034.
               </p>
            </Col>
            <Col xs="6">
               <b>Local Sfax :</b>
               <p>
                  Imm. Ametista, 1er étage, B1.6, Rue 14 janvier Km 0,5 - Sfax
                  3000.
               </p>
            </Col>
            <Col xs="6" style={{ paddingRight: '32px' }}>
               <b>Local Bizerte :</b>
               <p>
                  Rue Habib Bourguiba, au dessus du boutique "Celio" et près de
                  "LC Waikiki", B.109 - 1er étage.
               </p>
            </Col>
            <Col xs="6">
               <b>Local Kairouan :</b>
               <p>
                  Imm. Assaouer, 1er étage, Rue Ibn Fourat centre ville
                  Kairouan, au dessus de Zen.
               </p>
            </Col>
            <Col xs="6" style={{ paddingRight: '32px' }}>
               <b>Local Gabès :</b>
               <p>
                  Imm. Elissa Centre, 3ème étage, A3.1, Rue Mongi Slim - Gabès.
               </p>
            </Col>
            <Col xs="6">
               <b>Local Kébili :</b>
               <p>Imm. Samer, 2ème étage, B.05, Route de Gabès - Kébili.</p>
            </Col>
         </Row>
      </Col>
   )
}

export default Address
