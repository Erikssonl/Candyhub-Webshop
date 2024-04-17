import { useState, useEffect, createContext } from 'react';

export const CandyContext = createContext();

const CandyContextProvider = (props) => {
    const [allProducts, setAllProducts] = useState([])
    const [getByCategory, setGetByCategory] = useState([]);
    const [regUser, setRegUser] = useState('')
    const [regPassword, setRegPassword] = useState('')
        
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


  return (
    <CandyContext.Provider value={{ allProducts, getByCategory, regUser, regPassword, setRegUser, setRegPassword, postToUsers}}>
        {props.children}
    </CandyContext.Provider>
  )
}
export default CandyContextProvider