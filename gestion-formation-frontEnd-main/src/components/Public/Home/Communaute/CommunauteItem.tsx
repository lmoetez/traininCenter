import { FC } from 'react'
import { ListGroup, Card } from 'react-bootstrap'

interface Props {
   img: any
   title: string
   description: string
}

const CommunauteItem: FC<Props> = ({ img, title, description }) => {
   return (
      <ListGroup.Item
         style={{
            backgroundColor: '#1a6ca8',
            padding: '32px',
            borderColor: '#ffffff88',
         }}
      >
         <Card
            style={{
               width: '100%',
               backgroundColor: 'transparent',
               border: 'unset',
               textAlign: 'center',
               alignItems: 'center',
               color: 'white',
            }}
         >
            <Card.Img
               variant="top"
               src={img}
               style={{
                  borderRadius: '50%',
                  width: '100px',
                  height: '100px',
               }}
            />
            <Card.Body>
               <Card.Title>{title}</Card.Title>
               <Card.Text>{description}</Card.Text>
            </Card.Body>
         </Card>
      </ListGroup.Item>
   )
}

export default CommunauteItem
