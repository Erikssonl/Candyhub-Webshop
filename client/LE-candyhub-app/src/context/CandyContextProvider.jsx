import { useState, useEffect, createContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export const CandyContext = createContext();

const CandyContextProvider = (props) => {
    const [allProducts, setAllProducts] = useState([])
    const [getByCategory, setGetByCategory] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [regUser, setRegUser] = useState('')
    const [regPassword, setRegPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loginStatus, setLoginStatus] = useState(null)
    const [cart, setCart] = useState([]);
    const categories = [
      "Chocolates",
      "Licorice",
      "CrunchyCandy",
      "SoftCandy",
      "Gummies",
      "Fudge",
      "HardCandy"
    ]
    const categoryColors = {
      Chocolates: '#F8C6D1',
      Licorice: '#A3E4C7',
      CrunchyCandy: '#A2D2FF',
      SoftCandy: '#D6BCFA',
      Gummies: '#D6BCFA',
      Fudge: '#A4CAEE',
      HardCandy: '#F8C6D1',
    };
    const [selectedCandy, setSelectedCandy] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate()
    const [cartCount, setCartCount] = useState(0);

    const getFromCandyProducts = () => {
      fetch("https://candyhub.up.railway.app/products")
          .then(response => response.json())
          .then(data => {
              const categoryMap = data.reduce((acc, item) => {
                  if (item.category) {
                      acc[item.category] = acc[item.category] || [];
                      acc[item.category].push(item);
                  }
                  return acc;
              }, {});
  
              if (Object.keys(categoryMap).length > 0) {
                  setAllProducts(data);
                  setGetByCategory(categoryMap);
              } else {
                  setAllProducts([]);
                  setGetByCategory({});
              }
          })
          .catch((error) => {
              console.error("Fetching error:", error);
              setAllProducts([]);
              setGetByCategory({});
          });
    };

    useEffect(() => {
        getFromCandyProducts();
    }, []);

    const [candySearch, setCandySearch] = useState([])
    const [searchAttempted, setSearchAttempted] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");


    const handleSearch = (searchInput) => {
      const search = searchInput.trim().toLowerCase();
      if (search) {
          const filter = allProducts.filter(product =>
              product.name.toLowerCase().includes(search) || product.category.toLowerCase().includes(search)
          );
          setCandySearch(filter);
      } else {
          setCandySearch([]);
      }
      setSearchAttempted(true);
    };

    const [regStatus, setRegStatus] = useState(null)

    const postToUsers = () => {
        fetch('https://candyhub.up.railway.app/registration', {
            method: 'POST',
            headers: { 'Content-Type':  'application/json'  },
            body: JSON.stringify({
              username: regUser,
              password: regPassword
            })
          })
          .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP status ${response.status}`);
            }
            return response.json();
          } )
          .then(data => {
            console.log(data)
            setRegStatus(true);
          })
          .catch(error => {
            console.error('Error:', error);
            setRegStatus(false);
          });
    }

    const login = () => {
      fetch('https://candyhub.up.railway.app/login', {
          method: 'POST',
          headers: { 'Content-Type':  'application/json'  },
          body: JSON.stringify({
            username: userName,
            password: password
          })
        })
        .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP status ${response.status}`);
          }
          return response.json();
        } )
        .then(data => {
          console.log(data)
          if (data.length < 1) {
            setLoginStatus(false);
            console.log("No user found, wrong username or password")
          } else {
            setLoginStatus(true);
          }
        })
        .catch(error => {
          console.error('Error:', error);
          setLoginStatus(false)
        });
    }

    const addToCart = (candy) => {
      const existingItem = cart.find(item => item.id === candy.id);
      if (existingItem) {
          setCart(cart.map(item => item.id === candy.id ? { ...item, quantity: item.quantity + candy.quantity } : item));
      } else {
          setCart([...cart, candy]);
      }
    };

    const postToOrders = () => {
      const orderId = uuidv4();
      console.log(orderId)
      const ordersWithOrderId = cart.map(item => ( {
        ...item,
        orderId: orderId
      }));

      return fetch('https://candyhub.up.railway.app/orders', {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify({ orders: ordersWithOrderId})
      })
      .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP status ${response.status}`);
        }
        return response.text();
      } )
      .then(data => {
        console.log(data)
        setCart([]);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    }

    const removeFromCart = (productId) => {
      const updatedCart = cart.filter(item => item.id !== productId);
      setCart(updatedCart);
    }

    const updateItemQuantityCart = (productId, quantity) => {
      const updatedCart = cart.map(item => {
        if (item.id === productId) {
          return { ...item, quantity: quantity };
        }
        return item;
      });
      setCart(updatedCart);
    }

    const openModal = (candy) => {
      setSelectedCandy(candy);
      setModalOpen(true);
    };

    const closeModal = () => {
      setSelectedCandy(null);
      setModalOpen(false)
      setQuantity(1)
    }

    const hadndleQuantity = (e) => {
      setQuantity(parseInt(e.target.value));
    }

    const handleAddToCart = () => {
      if (selectedCandy) {
          addToCart({ ...selectedCandy, quantity});
          closeModal();
      }
    }

    const handleBackToHomeClick = () => {
      navigate('/');
    }

    useEffect(() => {
      const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(totalCount);
    }, [cart])

  return (
    <CandyContext.Provider value={{ getByCategory, regUser, regPassword,
     setRegUser, setRegPassword, postToUsers, userName, password, setUserName, setPassword, login, loginStatus,
     handleSearch, searchAttempted, candySearch, setCandySearch, setSearchTerm, searchTerm,
     cart, addToCart, postToOrders, regStatus, removeFromCart, updateItemQuantityCart, categories, categoryColors,
     selectedCategory, setSelectedCategory, selectedCandy, setSelectedCandy, modalOpen, setModalOpen, quantity, setQuantity,
     openModal, closeModal, hadndleQuantity, handleAddToCart, allProducts, handleBackToHomeClick, cartCount}}>
        {props.children}
    </CandyContext.Provider>
  )
}
export default CandyContextProvider