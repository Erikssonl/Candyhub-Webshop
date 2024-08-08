import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CandyContext } from '../context/CandyContextProvider';
import styles from '../Styles/Cart-style.module.css'

const Cart = () => {
  const navigate = useNavigate()
  const { cart, postToOrders, removeFromCart, updateItemQuantityCart, handleBackToHomeClick } = useContext(CandyContext)
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
    <div>
        <button onClick={() => handleBackToHomeClick()} 
            className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-customBtnGreen rounded-full px-6 py-2 ml-10 sm:ml-20 md:ml-30 lg:ml-40 mt-5 font-semibold hover:bg-green-300 transition-colors shadow-btnShadow">
            &#8592; Back
        </button>
      <div className={styles.cartContentWrap}>
        <div className={styles.cartWrap}>
          <h2 className={styles.h2Cart}>Candy Cart</h2>
          <div>
            {cart && cart.length > 0 ? (
              <div>
                <div className={styles.productListWrap}>
                  <ul className="w-full">
                    {cart.map((item, idx) => (
                      <li className={styles.productList} key={idx}>
                        <div className="flex flex-row md:flex-1 items-center gap-4">
                          <figure className="w-16 md:w-32">
                            <img src={item.image_path} alt="" className="rounded-xl" />
                          </figure>
                          <div>
                            <p className="font-bold">{item.name}</p>
                            <p>Unit price: ${item.price}</p>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:flex-1 items-center gap-2 md:justify-between mt-2 md:mt-0">
                          <div className="flex flex-row items-center gap-2">
                            <label htmlFor={`quantity-${idx}`}>Quantity:</label>
                            <input
                              className="w-16 p-1 border rounded"
                              type="number"
                              id={`quantity-${idx}`}
                              name={`quantity-${idx}`}
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                            />
                          </div>
                          <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-error shadow-btnShadow" onClick={() => handleRemoveFromCart(item.id)}>
                            Remove product
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-center w-full mt-10">
                  <button
                  onClick={handlePlaceOrder}
                  className="btn bg-customBtnGreen rounded-full px-6 py-2 font-semibold hover:bg-green-300 transition-colors shadow-btnShadow self-center ">
                    Place order
                  </button>
                  {orderMessage && <p>{orderMessage}</p>}
                </div>
              </div>
            ) : ( 
                <h2>The cart is empty</h2>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
export default Cart