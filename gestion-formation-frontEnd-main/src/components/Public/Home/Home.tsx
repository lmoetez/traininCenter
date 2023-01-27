import CommunauteList from './Communaute/CommunauteList'
import About from './About'
import Footer from './Footer'
import Carousel from './Carousel'

const Home = () => {
   return (
      <div style={{ width: '100%' }}>
         <Carousel />

         <About />

         <CommunauteList />

         <Footer />
      </div>
   )
}

export default Home
