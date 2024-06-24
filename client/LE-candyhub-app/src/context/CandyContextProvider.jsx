import { useState, useEffect, createContext, useRef } from 'react';
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

    const getFromCandyProducts = () => {
      fetch("http://localhost:3000/products")
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

        // const getFromCandyProducts = () => {
    //     fetch("http://localhost:3000/products") 
    //         .then(response => response.json()) 
    //         .then(data => { 

    //           const filteredCategories = data.filter(item => item.category);
    //           if (filteredCategories.length > 0) {
    //             setAllProducts(data);
    //             setGetByCategory(filteredCategories);
    //           } else {
    //             setAllProducts([]);
    //             setGetByCategory([]);
    //           }
    //         })
    //         .catch((error) => {
    //             console.error("Fetching error:", error); 
    //             setAllProducts([]);
    //             setGetByCategory([]);
    //         });
    // };

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
        fetch('http://localhost:3000/registration', {
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
      fetch('http://localhost:3000/login', {
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
      setCart([...cart, candy]);
    };

    const postToOrders = () => {
      const orderId = uuidv4();
      console.log(orderId)
      const ordersWithOrderId = cart.map(item => ( {
        ...item,
        orderId: orderId
      }));

      return fetch('http://localhost:3000/orders', {
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


  return (
    <CandyContext.Provider value={{ getByCategory, regUser, regPassword,
     setRegUser, setRegPassword, postToUsers, userName, password, setUserName, setPassword, login, loginStatus,
     handleSearch, searchAttempted, candySearch, setCandySearch, setSearchTerm, searchTerm,
     cart, addToCart, postToOrders, regStatus, removeFromCart, updateItemQuantityCart, categories, categoryColors,
     selectedCategory, setSelectedCategory}}>
        {props.children}
    </CandyContext.Provider>
  )
}
export default CandyContextProvider