import axios from "axios";
import { useRef, useState } from "react";
import Navbar from "./Navbar";
import './AddProducts.css';

const AddProducts = () => {
  let [product_name, setProductName] = useState("");
  let [product_desc, setProductDesc] = useState("");
  let [product_cost, setProductCost] = useState("");
  let [product_photo, setProductPhoto] = useState("");
  let [loading, setLoading] = useState("");
  let [success, setSuccess] = useState("");
  let [error, setError] = useState("");

  const fileInputRef = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading("Please wait as we submit data");
      setSuccess("");
      setError("");
      const data = new FormData();
      data.append("product_name", product_name);
      data.append("product_desc", product_desc);
      data.append("product_cost", product_cost);
      data.append("product_photo", product_photo);

      const response = await axios.post("https://TrevorKinyanjui.pythonanywhere.com/api/addproduct", data);
      setLoading("");
      setSuccess(response.data.message);
      setProductName("");
      setProductDesc("");
      setProductCost("");
      fileInputRef.current.value = "";
    } catch (error) {
      setLoading("");
      setError(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="row justify-content-center addproducts-container">
        <div className="col-md-6 addproducts-card">
          <h2>Add Products</h2>
          <p className="text-warning">{loading}</p>
          <p className="text-danger">{error}</p>
          <p className="text-success">{success}</p>
          <form onSubmit={submit}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter flower Name"
              required
              onChange={(e) => setProductName(e.target.value)}
              value={product_name}
            />
            <br />
            <textarea
              className="form-control"
              placeholder="Enter flower Description"
              required
              onChange={(e) => setProductDesc(e.target.value)}
              value={product_desc}
            ></textarea>
            <br />
            <input
              type="number"
              placeholder="Enter flower Cost"
              required
              onChange={(e) => setProductCost(e.target.value)}
              className="form-control"
              value={product_cost}
            />
            <br />
            <label htmlFor="product_photo">Product Photo</label>
            <input
              type="file"
              className="form-control"
              required
              onChange={(e) => setProductPhoto(e.target.files[0])}
              ref={fileInputRef}
            />
            <br />
            <button className="btn btn-primary">Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;