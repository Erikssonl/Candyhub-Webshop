import { useState, useEffect, createContext } from 'react';

export const CandyContext = createContext();

const CandyContextProvider = (props) => {
    const [allProducts, setAllProducts] = useState([])
    const [getByCategory, setGetByCategory] = useState([]);
        
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


  return (
    <CandyContext.Provider value={{ allProducts, getByCategory}}>
        {props.children}
    </CandyContext.Provider>
  )
}
export default CandyContextProvider