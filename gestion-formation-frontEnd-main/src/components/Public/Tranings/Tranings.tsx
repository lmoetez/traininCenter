import { Row } from 'react-bootstrap'
import useTranings from 'src/hooks/useTranings'
import TraningItem from './TraningItem'

const Home = () => {
   const { tranings } = useTranings()

   return (
      <div
         style={{
            width: '100%',
            backgroundColor: 'white',
            marginTop: '16px',
            borderRadius: '8px',
            padding: '16px 32px',
            height: 'calc(100% - 32px)',
            display: 'flex',
            flexDirection: 'column',
         }}
      >
         <h1>Nos Formation</h1>
         <Row style={{ flex: 1, overflowY: 'auto', width: '100%' }}>
            {tranings?.map((traning) => (
               <TraningItem traning={traning} />
            ))}
         </Row>
      </div>
   )
}

export default Home
