import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BASE_URL from '../../config';
import axios from 'axios';
import Header from '../header/header';
import SimpleFooter from '../Footers/SimpleFooters';
import './productdetail.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import aboutImage1 from '../../assets/images/about-1.jpeg';
import { height } from '@fortawesome/free-solid-svg-icons/fa0';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M"); // Default size
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [selectedImage, setSelectedImage] = useState(null);


  useEffect(() => {
    // Fetch product details
    fetch(`${BASE_URL}/api/getproductsidbased/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product:', error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleAddToCart = async (productId, quantity,inventory) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('UserId');
    if(quantity<inventory){

    if (!token || !userId) {
      console.error('User is not authenticated');
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/addtocart`,
        {
          productId,
          userId,
          quantity,
          size: selectedSize,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.status === 200) {
        console.log(`Product ${productId} added to cart`);
        alert("your product added succesfully to the cart")

      } else {
        console.error('Failed to add product to cart');
      }
    } catch (err) {
      console.error('Error adding product to cart:', err.message);
    }
  }else{
    alert("Quantatity Not Avaliable")
  }
  };

  const handleAddToWishlist = async (productId) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('UserId');

    if (!token || !userId) {
      console.error('User is not authenticated');
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/addtowishlist`,
        {
          productId,
          userId,
          quantity,
          size: selectedSize
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.status === 200) {
        console.log(`Product ${productId} added to wishlist`);
        alert('your product added succesfully to the cart')
      } else {
        console.error('Failed to add product to wishlist');
      }
    } catch (err) {
      console.error('Error adding product to wishlist:', err.message);
    }
  };

  const handleReturnButtonClick = () => {
    setIsModalOpen(true);
  };
  
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl); // Update the large image
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className="product-detail-container">
  {/* Container for the column of smaller images */}
 
    {/* Container for the large main image */}
    {/* Large image container */}
    <div className="product-image-large">
          <img src={selectedImage ? selectedImage :`${BASE_URL}/${product.imageUrl}`} alt={product.ProductName} className="large-image" />
        </div>

        {/* Small images column */}
        <div className="product-images-column">
          <img
            src={`${BASE_URL}/${product.image2}`}
            alt={product.ProductName}
            className="small-image"
            onClick={() => handleImageClick(`${BASE_URL}/${product.image2}`)} // Click event for first image
          />
          <img
            src={`${BASE_URL}/${product.image3}`} // Replace with other images' URLs if available
            alt={product.ProductName}
            className="small-image"
            onClick={() => handleImageClick(`${BASE_URL}/${product.image3}`)} // Click event for second image
          />
          <img
            src={`${BASE_URL}/${product.imageUrl}`} // Replace with other images' URLs if available
            alt={product.ProductName}
            className="small-image"
            onClick={() => handleImageClick(`${BASE_URL}/${product.imageUrl}`)} // Click event for third image
          />
        </div>

  
  <div className="product-info">
  
    <h2>{product.ProductName}</h2>
    <p>{product.description}</p>
    <p><strong>Category:</strong> Shirt</p>
    <p><strong>Price:</strong> ${product.price}</p>
    <p><strong>SKU:</strong> {product.sku}</p>

    {/* Key Highlights */}
    {product.keyHighlights && (
      <div className="product-highlights">
        <h3>Key Highlights</h3>
        <ul>
          {product.keyHighlights.split(",").map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
      </div>
    )}

    {/* Additional Product Information */}
    {product.SleeveType && <p><strong>Sleeve Type:</strong> {product.SleeveType}</p>}
    {product.FabricMaterial && <p><strong>Fabric Material:</strong> {product.FabricMaterial}</p>}
    {product.Fit && <p><strong>Fit:</strong> {product.Fit}</p>}
    {product.NeckStyle && <p><strong>Neck Style:</strong> {product.NeckStyle}</p>}
    {product.brand && <p><strong>Brand:</strong> {product.brand}</p>}

    {/* Size Selector */}
    <div className="size-selector">
      <h3>Select Size</h3>
      <div className="size-options">
        {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
          <label key={size} className={`size-option ${selectedSize === size ? 'selected' : ''}`}>
            <input
              type="radio"
              name="size"
              value={size}
              checked={selectedSize === size}
              onChange={handleSizeChange}
              className="size-radio"
            />
            <span className="size-label">{size}</span>
          </label>
        ))}
      </div>
    </div>

    {/* Quantity Control and Buttons */}
    <div className="quantity-cart-container">
      <div className="quantity-control">
        <button onClick={decreaseQuantity} className="quantity-button">-</button>
        <span className="quantity-display">{quantity}</span>
        <button onClick={increaseQuantity} className="quantity-button">+</button>
      </div>
      <div className="button-container">
        <button onClick={() => handleAddToCart(product.ProductId, quantity,product.inventory)} className="add-to-cart-button">
          Add to Cart
        </button>
        <button onClick={() => handleAddToWishlist(product.ProductId)} className="wishlist-button">
          Add to Wishlist
        </button>
      </div>
    </div>
    

    {/* 15 Days Return Option */}
    <div className="return-option">
      <h3>15 Days Return Available</h3>
      <button className="return-button" onClick={handleReturnButtonClick}>Return Now</button>
    </div>
  </div>

  {/* Modal */}
  {isModalOpen && (
    <>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal">
        <h3>Return Product</h3>
        <p>To return the product, please contact our customer support team.</p>
        <button className="return-button" onClick={closeModal}>Close</button>
      </div>
    </>
  )}
</div>

    
      <SimpleFooter />
    </>
  );
};

export default ProductDetail;
