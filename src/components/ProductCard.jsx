
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const img_url = "https://TrevorKinyanjui.pythonanywhere.com/static/images/";

  return (
    <div className="product-card">
      <img src={img_url + product.product_photo} alt={product.product_name} className="product-image" />
      <h3 className="product-name">{product.product_name}</h3>
      <p className="product-cost">{product.product_cost} KES</p>
      <Link to={{ pathname: `/product/${product.id}`, state: { product } }} className="product-link">View Details</Link>
    </div>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const img_url = "https://TrevorKinyanjui.pythonanywhere.com/static/images/";

  return (
    <div className="product-card">
      <img src={img_url + product.product_photo} alt={product.product_name} className="product-image" />
      <h3 className="product-name">{product.product_name}</h3>
      <p className="product-cost">{product.product_cost} KES</p>
      <Link to={{ pathname: `/product/${product.id}`, state: { product } }} className="product-link">View Details</Link>
    </div>
  );
}
