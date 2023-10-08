// import { Product } from "../App";

// function Product({product, index}: any) {
//     return 
//         <div key={`${product.id}-${index}`} className='single-product'>
//             <div className="product-img">
//             <img src={product.image} alt={product.name} />
//             </div>
//             <div className="product-content">
//             <h3>{product.name}</h3>
//             <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, voluptate.</p>
//             <span>Category: {product.category}</span>
//             <p>Quantity: {product.maxQuantity}</p>
//             <p>Price: ${product.price.toFixed(2)}</p>
//             <div className="size-list">
//                 <p>Size:</p>
//                 <div className="option-radio-flex">
//                 {product.sizes.map((size, sizeIndex) => (
//                     <div key={`${product.id}-${size.name}`} className="radio size-option-radio">
//                     <input type="radio" name={`${product.id}-size`} id={`${size.name}-${index}`} value={size.sizeQuantity} checked={product.selectedSize === size.name} onChange={() => handleSizeChange(product, index, sizeIndex)}/>
//                     <label htmlFor={`${size.name}-${index}`}>{size.name} {size.sizeQuantity}</label>
//                     </div>
//                 ))}
//                 </div>
//             </div>
//             <div className="cart-option">
//                 <div className="product-qty">
//                 <button onClick={() => handleDecrement(index, false)} className='decrementBtn' type='button'>-</button>
//                 <input type="number" min={product.quantity} value={product.quantity} onChange={(event) => handleInputChange(event, index)} placeholder='1'/>
//                 <button onClick={() => handleIncrement(index, false)} className='incrementBtn' type='button'>+</button>
//                 </div>
//                 <div className="porduct-add-to-cart">
//                 <button onClick={() => addToCart(product)} className='add-to-cart-btn' type='button'>Add to Cart</button>
//                 </div>
//             </div>
//             </div>
//         </div>;
// }

// export default Product;