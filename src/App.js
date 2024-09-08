import './App.css';
import Signin from './components/signinpage/signin';
import Signuppage from './components/signuppage/signuppage';
import Homepage from './components/homepage/home';
import Landing from "./components/LandingPage/landing.js";
import UploadData from "./components/Upload/upload.js";
import ProductUpload from './components/Products/UploadProduct.js';
import ProductDetail from './components/ProductDetail/productdetail.js';
import CartPage from './components/cart/cart.js';
import PaymentPage from './components/paymentpage/payment.js';
import Allproduct from './components/Allproducts/allproduct.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
     
        <Router>
          <Routes>

            <Route exact path='/signin' element={<Signin />} />
            <Route exact path='/'element={<Landing />} />
            <Route exact path='/signuppage' element={<Signuppage />} />
            <Route exact path='/UploadData' element={<UploadData />} />
            <Route exact path='/ProductUpload' element={<ProductUpload />} />
            <Route exact path='/homePage' element={<Homepage />} />
            <Route exact path='/allproduct' element={<Allproduct />} />
             
            <Route exact path="/product/:id" element={<ProductDetail/>} />
        
            <Route exact path="/cart" element={<CartPage/>} />
            <Route exact path="/order/:orderId" element={<PaymentPage/>} />
             
          </Routes>
        </Router>
   
    </div>
  );
}

export default App;
