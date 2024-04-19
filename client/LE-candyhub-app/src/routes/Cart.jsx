import { useContext, useState } from 'react';
import { CandyContext } from '../context/CandyContextProvider';
import styles from '../Styles/Cart-style.module.css'

const Cart = () => {
  const { cart, postToOrders } = useContext(CandyContext)
  const [orderMessage, setOrderMessage] = useState('')

  const handlePlaceOrder = () => {
    postToOrders()
    .then(() => {
      setOrderMessage('Order was successfully sent')
    })
    .catch(() => {
      setOrderMessage('Something went wrong, the order was not sent')
    })
  }

  return (
    <div className={styles.cartWrap}>
      <h2 className={styles.h2Cart}>Candy Cart</h2>
      <ul>
        {cart.map((item, idx) => (
          <li key={idx}>
            <p>{item.name}</p>
            <p>{item.price}</p>
            <p>{item.quantity}</p>
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
  )
}
export default Cart