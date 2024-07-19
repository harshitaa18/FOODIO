import {Routes,Route, BrowserRouter} from 'react-router-dom'
import Homepage from './Pages/Homepage/Homepage'
import Aboutus from './Pages/Aboutus/Aboutus'
import Footer from "./Components/Footer/Footer";
import Menu from "./Pages/Menu/Menu";
import Contact from "./Pages/Contact/Contact";
import Cart from "./Pages/Cart/Cart";
import LoginPopup from './Components/LoginPopup/LoginPopup';
import Reservation from './Pages/Reservation/Reservation';
import Reserve from './Pages/Reserve/Reserve';
import Confirmation from './Pages/Confirmation/Confirmation';
import Checkout from './Pages/Checkout/Checkout';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/aboutus" element={<Aboutus/>}/>
          <Route path="/menu" element={<Menu/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/login" element={<LoginPopup/>}/>
          <Route path="/reservation" element={<Reservation/>}/>
          <Route path="/reserve" element={<Reserve/>}/>
          <Route path="/confirmation" element={<Confirmation/>} />
          <Route path="/checkout" element={<Checkout/>} />
        </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
