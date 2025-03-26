import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Carousel from "./Carousel";
import './GetProducts.css';
import { FaSearch } from 'react-icons/fa';

const GetProducts = () => { 

  const image_url = "https://TrevorKinyanjui.pythonanywhere.com/static/images/"

  let [products, setProducts] = useState([]);
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);
  let [filteredProducts, setFilteredProducts] = useState([]);

  const navigate = useNavigate();

  const getproducts = async () => {
    setError(false);
    setLoading(true);
    try {
      const response = await axios.get("https://TrevorKinyanjui.pythonanywhere.com/api/getproducts");
      setProducts(response.data);
      setFilteredProducts(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }
  
  const handleSearch = (value) => {
    const filtered = products.filter((product) => 
      product.product_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  }

  useEffect(() => {
    getproducts();
  }, []);

  return ( 
    <div className="row">
      <Navbar />
      <Carousel />
      <h3 className="mt-4 text-center">Available products</h3>
      {loading && <div className="spinner-border text-warning" role="status"><span className="sr-only">Loading...</span></div>}
      {error && <b className="text-danger">Failed to load products. Please try again later.</b>}

      <div className="row justify-content-center my-4">
        <div className="col-md-4">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="form-control"
              placeholder="Search product by name"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      {filteredProducts.map((product) => (
        <div className="col-md-3 justify-content-center mb-4" key={product.id}>
          <div className="card shadow card-margin">
            <img src={image_url + product.product_photo} alt={product.product_name} className="product_img mt-4" />
            <div className="card-body">
              <h5 className="card-title">{product.product_name}</h5>
              <p className="text-muted">{product.product_desc}</p>
              <b className="text-warning">{product.product_cost} KES</b>
              <button onClick={() => navigate("/SingleProduct", { state: { product } })} className="btn mt-2 w-100">View Details</button>
            </div>
          </div>
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default GetProducts;