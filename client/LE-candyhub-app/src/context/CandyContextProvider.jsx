import { useState, useEffect, createContext, useRef } from 'react';

export const CandyContext = createContext();

const CandyContextProvider = (props) => {
    const [allProducts, setAllProducts] = useState([])
    const [getByCategory, setGetByCategory] = useState([]);
    const [regUser, setRegUser] = useState('')
    const [regPassword, setRegPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loginStatus, setLoginStatus] = useState(null)
        
    const getFromCandyProducts = () => {
        fetch("http://localhost:3000/products") 
            .then(response => response.json()) 
            .then(data => { 

                const filteredCategories = data.filter(item => item.category);

                setAllProducts(data);
                setGetByCategory(filteredCategories);
            })
            .catch((error) => {
                console.error("Fetching error:", error); 
                setAllProducts([]);
                setGetByCategory([]);
            });
    };

    useEffect(() => {
        getFromCandyProducts();
    }, []);

    const [candySearch, setCandySearch] = useState([])
    const [searchAttempted, setSearchAttempted] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // const searchInput = useRef('');

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
          })
          .catch(error => console.error('Error:', error));
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

    const postToOrders = () => {

    }


  return (
    <CandyContext.Provider value={{ getByCategory, regUser, regPassword,
     setRegUser, setRegPassword, postToUsers, userName, password, setUserName, setPassword, login, loginStatus,
     handleSearch, searchAttempted, candySearch, setCandySearch, setSearchTerm, searchTerm}}>
        {props.children}
    </CandyContext.Provider>
  )
}
export default CandyContextProvider