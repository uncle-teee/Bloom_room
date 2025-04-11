import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [product_name, setProductName] = useState("");
  const [product_desc, setProductDesc] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("https://TrevorKinyanjui.pythonanywhere.com/api/getproducts");
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch products");
      setLoading(false);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const data = new FormData();
      data.append("product_name", product_name);
      data.append("product_desc", product_desc);
      data.append("product_cost", product_cost);
      data.append("product_photo", product_photo);

      const response = await axios.post("https://TrevorKinyanjui.pythonanywhere.com/api/addproduct", data);
      setSuccess(response.data.message);
      setProductName("");
      setProductDesc("");
      setProductCost("");
      setProductPhoto(null);
      fetchProducts(); // Refresh the product list
    } catch (err) {
      setError("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.delete(`https://TrevorKinyanjui.pythonanywhere.com/api/deleteproduct/${id}`);
      setSuccess("Product deleted successfully");
      fetchProducts(); // Refresh the product list
    } catch (err) {
      setError("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container admin-dashboard">
        <h2 className="text-center">Admin Dashboard</h2>
        {loading && <p className="text-warning">Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
        {success && <p className="text-success">{success}</p>}

        {/* Add Product Form */}
        <div className="add-product-form">
          <h3>Add New Product</h3>
          <form onSubmit={addProduct}>
            <input
              type="text"
              className="form-control"
              placeholder="Product Name"
              value={product_name}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
            <textarea
              className="form-control"
              placeholder="Product Description"
              value={product_desc}
              onChange={(e) => setProductDesc(e.target.value)}
              required
            ></textarea>
            <input
              type="number"
              className="form-control"
              placeholder="Product Cost"
              value={product_cost}
              onChange={(e) => setProductCost(e.target.value)}
              required
            />
            <input
              type="file"
              className="form-control"
              onChange={(e) => setProductPhoto(e.target.files[0])}
              required
            />
            <button type="submit" className="btn btn-primary mt-2">Add Product</button>
          </form>
        </div>

        {/* Product List */}
        <div className="product-list mt-4">
          <h3>Product List</h3>
          {products.length === 0 ? (
            <p>No products available</p>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Cost</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.product_name}</td>
                    <td>{product.product_desc}</td>
                    <td>{product.product_cost} KES</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;