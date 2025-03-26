import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import './SingleProduct.css';

const SingleProduct = () => {
    const { product } = useLocation().state || {};
    let [phone, setPhone] = useState("");
    let [loading, setLoading] = useState(false);
    let [success, setSuccess] = useState("");
    let [error, setError] = useState("");

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");
        try {
            const data = new FormData();
            data.append("amount", product.product_cost);
            data.append("phone", phone);

            const response = await axios.post("https://TrevorKinyanjui.pythonanywhere.com/api/mpesa_payment", data);
            setLoading(false);
            setSuccess(response.data.message);
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    }

    const img_url = "https://TrevorKinyanjui.pythonanywhere.com/static/images/";

    return (
        <div>
            <Navbar />
            <div className="single-product-container">
                <div className="single-product-image">
                    <img src={img_url + product.product_photo} alt={product.product_name} />
                </div>
                <div className="single-product-details">
                    <h2>{product.product_name}</h2>
                    <h3 className="text-warning">{product.product_cost} KES</h3>
                    <p className="text-muted">{product.product_desc}</p>
                    {loading && <div className="spinner-border text-warning" role="status"><span className="sr-only">Loading...</span></div>}
                    {error && <b className="text-danger">{error}</b>}
                    {success && <b className="text-success">{success}</b>}

                    <form onSubmit={submitForm}>
                        <input type="number"
                            placeholder="Amount"
                            required
                            readOnly
                            value={product.product_cost}
                            className="form-control" />
                        <input type="tel"
                            placeholder="Enter Mpesa No 2547xxxxxxxx"
                            required
                            className="form-control"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                        />
                        <button className="btn" type="submit">Pay Now</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SingleProduct;