import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CandyContext } from '../context/CandyContextProvider';
import styles from '../Styles/Cart-style.module.css'

const Cart = () => {
  const navigate = useNavigate()
  const { cart, postToOrders, removeFromCart, updateItemQuantityCart } = useContext(CandyContext)
  const [orderMessage, setOrderMessage] = useState('')
  
  const handleOrderPlaced = () => {
    navigate('/')
  }
  const handlePlaceOrder = () => {
    postToOrders()
    .then(() => {
      setOrderMessage('Order was successfully sent')
      setTimeout(handleOrderPlaced, 2000);
    })
    .catch(() => {
      setOrderMessage('Something went wrong, the order was not sent')
    })
  }

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  }

  const handleQuantityChange = (productId, quantity) => {
    updateItemQuantityCart(productId, quantity)
  }


  return (
    <div className={styles.cartContentWrap}>
      <div className={styles.cartWrap}>
        <h2 className={styles.h2Cart}>Candy Cart</h2>
        <ul>
          {cart.map((item, idx) => (
            <li className={styles.productList} key={idx}>
              {/* <figure className="px-10 pt-10">
                <img src={item.image_path} alt="" className="rounded-xl" />
              </figure> */}
              <div className={styles.itemWrap}>
                <p>{item.name}</p>
                <p>Unit price: {item.price}$</p>
              </div>
              <div className={styles.quantityWrap} >
                <label>Quantity:</label>
                <input
                  className={styles.quantityInput}
                  type="number"
                  id={`quantity-${idx}`}
                  name={`quantity-${idx}`}
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))} 
                />
              </div>
              <button className="btn btn-error shadow-btnShadow" onClick={() => handleRemoveFromCart(item.id)}>Remove product</button>
            </li>
          ))}
        </ul>
        <button
        onClick={handlePlaceOrder}
        className="btn bg-customBtnGreen rounded-full px-6 py-2 font-semibold hover:bg-green-300 transition-colors shadow-btnShadow ">
          Place order
        </button>
        {orderMessage && <p>{orderMessage}</p>}
      </div>

    </div>
  )
}
export default Cart