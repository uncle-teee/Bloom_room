
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import GetProducts from './components/GetProducts';
import AddProducts from './components/AddProducts';
import SingleProduct from './components/SingleProduct';
import 'boxicons'


function App() {
  return (
   <Router>
     <div className="App">
      <Routes>
        <Route path="/SignUp" element= {<SignUp />} />
        <Route path='/SignIn' element= {<SignIn />} />
        <Route path='/' element= {<GetProducts />} />
        <Route path='/AddProducts' element= {<AddProducts />} />
        <Route path='/SingleProduct' element={<SingleProduct />} />

      </Routes>
    </div>
   </Router>
  );
}

export default App;
