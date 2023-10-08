import { Fragment, useEffect, useState } from 'react'
import {Button, Modal} from 'react-bootstrap';
import './App.css'
import { FiShoppingCart, FiX } from "react-icons/fi";

export interface Product {
  id: number;
  category: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  maxQuantity: number;
  sizes: { name: string; sizeQuantity: number }[];
  selectedSize?: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, category: 'men', name: 'Product One', price: 10.00, image: 'https://picsum.photos/200?random=1', quantity: 1, maxQuantity: 10, selectedSize: '', sizes: [
      { name: 'XXL', sizeQuantity: 3 },
      { name: 'XL', sizeQuantity: 4 },
      { name: 'L', sizeQuantity: 3 },
    ]},
    { id: 2, category: 'men', name: 'Product Two', price: 20.00, image: 'https://picsum.photos/200?random=2', quantity: 1, maxQuantity: 15, selectedSize: '', sizes: [
      { name: 'XXL', sizeQuantity: 5 },
      { name: 'XL', sizeQuantity: 4 },
      { name: 'L', sizeQuantity: 6 },
    ]},
    { id: 3, category: 'women', name: 'Product Three', price: 30.00, image: 'https://picsum.photos/200?random=3', quantity: 1, maxQuantity: 20, selectedSize: '', sizes: [
      { name: 'XXL', sizeQuantity: 5 },
      { name: 'XL', sizeQuantity: 7 },
      { name: 'L', sizeQuantity: 8 },
    ]},
    { id: 4, category: 'women', name: 'Product Four', price: 15.00, image: 'https://picsum.photos/200?random=4', quantity: 1, maxQuantity: 25, selectedSize: '', sizes: [
      { name: 'XXL', sizeQuantity: 7 },
      { name: 'XL', sizeQuantity: 10 },
      { name: 'L', sizeQuantity: 8 },
    ]},
    { id: 5, category: 'child', name: 'Product Five', price: 25.00, image: 'https://picsum.photos/200?random=5', quantity: 1, maxQuantity: 18, selectedSize: '', sizes: [
      { name: 'XXL', sizeQuantity: 8 },
      { name: 'XL', sizeQuantity: 4 },
      { name: 'L', sizeQuantity: 6 },
    ]},
    { id: 6, category: 'child', name: 'Product Six', price: 35.00, image: 'https://picsum.photos/200?random=6', quantity: 1, maxQuantity: 22, selectedSize: '', sizes: [
      { name: 'XXL', sizeQuantity: 7 },
      { name: 'XL', sizeQuantity: 7 },
      { name: 'L', sizeQuantity: 8 },
    ]},
  ]);

  const [show, setShow] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  const [cartCounter, setCartCounter] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  function handleCategoryClick (category: string) {
    setSelectedCategory(category);
  }

  const filterProducts = selectedCategory === 'all' ? products : products.filter((product) => product.category === selectedCategory);
  

  function handleIncrement(index: number, isCart: boolean) {
    const newProducts = [...products];
    const newCart = [...cart];
    if (isCart) {
      if (newCart[index].quantity < newCart[index].maxQuantity) {
        newCart[index] = {...newCart[index], quantity: newCart[index].quantity + 1};
        setCart(newCart);
      }
    } else {
      if (newProducts[index].quantity < newProducts[index].maxQuantity) {
        newProducts[index] = {...newProducts[index], quantity: newProducts[index].quantity + 1};
        setProducts(newProducts);
      }
    }
  }


  function handleDecrement (index: number, isCart: boolean) {
    const newProducts = [...products];
    const newCart = [...cart];
    if (isCart) {
      if (newCart[index].quantity > 1) {
        newCart[index] = {...newCart[index], quantity: newCart[index].quantity - 1};
        setCart(newCart);
      }
    } else {
      if (newProducts[index].quantity > 1) {
        newProducts[index] = {...newProducts[index], quantity: newProducts[index].quantity - 1};
        setProducts(newProducts);
      }
    }
    
  }


  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
    const newProducts = [...products];
    const value = parseInt(event.target.value);
    if (value >= 1 && value <= newProducts[index].maxQuantity) {
      newProducts[index].quantity = value;
      setProducts(newProducts);
    }
  }


  function handleSizeChange(product: Product, index: number, sizeIndex: number) {
    const newProducts = [...products];
    const selectedSize = product.sizes[sizeIndex].name;
    newProducts[index].maxQuantity = newProducts[index].sizes[sizeIndex].sizeQuantity;
    newProducts[index].quantity = 1;
    const proIndex = newProducts.indexOf(product);
    newProducts[proIndex] = { ...product, selectedSize };
    setProducts(newProducts);
  }


  function addToCart(product: Product) {
    if (!product.selectedSize) {
      alert('Please select a size.');
      return;
    }
    const cartListBtn = document.querySelector('.cart-list-show-btn');
    const updatedProduct = {...product, selectedSize: product.sizes.find((size) => size.name === product.selectedSize)?.name};
    const isProductInCart = cart.some(item => item.id === updatedProduct.id && item.selectedSize === updatedProduct.selectedSize)
    if (isProductInCart) {
      const updateCart = cart.map(item => {
        if (item.id === updatedProduct.id && item.selectedSize === updatedProduct.selectedSize) {
          if (item.quantity < updatedProduct.maxQuantity) {
            if (cartListBtn) {
              cartListBtn.classList.add('productAdded');
              setTimeout(() => {
                cartListBtn.classList.remove('productAdded');
              }, 1000);
            }
            return {...item, quantity: item.quantity + 1};
          }
        }
        return item;
      });
      setCart(updateCart);
      sessionStorage.setItem('cart', JSON.stringify(updateCart));
    } else {
      setCartCounter(cartCounter + 1);
      if (cartListBtn) {
        cartListBtn.classList.add('productAdded');
        setTimeout(() => {
          cartListBtn.classList.remove('productAdded');
        }, 1000);
      }
      setCart([...cart, updatedProduct]);
      sessionStorage.setItem('cart', JSON.stringify(cart));
    }
  }
  

  function removeFromCart (product: Product) {
    const updatedCart = cart.filter((item) => item.id !== product.id || item.selectedSize !== product.selectedSize);
    setCart(updatedCart);
  }


  useEffect(() => {
    document.title = "Cart";
  }, []);


  return (
    <>
      

      <div className="product-filtering">
        <button className={selectedCategory === 'all' ? 'active' : ''} onClick={() => handleCategoryClick("all")}>All</button>
        <button className={selectedCategory === 'men' ? 'active' : ''} onClick={() => handleCategoryClick("men")}>Men</button>
        <button className={selectedCategory === 'women' ? 'active' : ''} onClick={() => handleCategoryClick("women")}>Women</button>
        <button className={selectedCategory === 'child' ? 'active' : ''} onClick={() => handleCategoryClick("child")}>Child</button>
      </div>
      <div className='product-list'>
        {filterProducts.map((product, index) => (
          <div key={`${product.id}-${index}`} className='single-product'>
            <div className="product-img">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-content">
              <h3>{product.name}</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, voluptate.</p>
              <span>Category: {product.category}</span>
              <p>Quantity: {product.maxQuantity}</p>
              <p>Price: ${product.price.toFixed(2)}</p>
              <div className="size-list">
                <p>Size:</p>
                <div className="option-radio-flex">
                  {product.sizes.map((size, sizeIndex) => (
                    <div key={`${product.id}-${size.name}`} className="radio size-option-radio">
                      <input type="radio" name={`${product.id}-size`} id={`${size.name}-${index}`} value={size.sizeQuantity} checked={product.selectedSize === size.name} onChange={() => handleSizeChange(product, index, sizeIndex)}/>
                      <label htmlFor={`${size.name}-${index}`}>{size.name} {size.sizeQuantity}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="cart-option">
                <div className="product-qty">
                  <button onClick={() => handleDecrement(index, false)} className='decrementBtn' type='button'>-</button>
                  <input type="number" min={product.quantity} value={product.quantity} onChange={(event) => handleInputChange(event, index)} placeholder='1'/>
                  <button onClick={() => handleIncrement(index, false)} className='incrementBtn' type='button'>+</button>
                </div>
                <div className="porduct-add-to-cart">
                  <button onClick={() => addToCart(product)} className='add-to-cart-btn' type='button'>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-list-show">
        <button className='cart-list-show-btn' onClick={handleShow}><FiShoppingCart />
          {cartCounter > 0 ? (
            <span>{cartCounter}</span>
          ) : null}
        </button>
      </div>

      <Modal show={show} onHide={handleClose} keyboard={false} className=''>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="cart">
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cart.map((product, index) => (
                  <div key={`${product.id}-${index}`} className="cart-item">
                    <div className="cart-img">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="cart-content">
                      <h5>{product.name}</h5>
                      <span>Size: {product.selectedSize || 'N/A'}</span>
                      <div className="cart-product-qty">
                        <button onClick={() => handleDecrement(index, true)} className='decrementBtn' type='button'>-</button>
                        <span>{product.quantity}</span>
                        <button onClick={() => handleIncrement(index, true)} className='incrementBtn' type='button'>+</button>
                        <span> X ${product.price.toFixed(2)} = ${(product.quantity * product.price).toFixed(2)}</span>
                      </div>
                      <button onClick={() => removeFromCart(product)} type='button' className='removeCartItemBtn'><FiX /></button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Place Order</Button>
        </Modal.Footer>
      </Modal>

      {/* <CONDITIONAL_RENDERING/> */}

      {/* <EVENT_HANDLER/> */}

      {/* <Footer></Footer> */}

      {/* <Cart/> */}

      
    </>
  )
}

export default App




