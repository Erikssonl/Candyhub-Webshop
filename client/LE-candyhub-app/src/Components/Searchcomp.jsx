import { useContext, useRef, useState } from 'react';
import { CandyContext } from '../context/CandyContextProvider';
import styles from '../Styles/Searchcomp-style.module.css'

const Searchcomp = () => {
    const { allProducts } = useContext(CandyContext)
    const [candySearch, setCandySearch] = useState([])
    const [searchAttempted, setSearchAttempted] = useState(false);

    const searchInput = useRef('');

    const handelSearch = () => {
        const search = searchInput.current.value.toLowerCase();
        const filter = allProducts.filter(allProducts => search && allProducts.name.toLowerCase().includes(search) || allProducts.category.toLowerCase().includes(search))
        setCandySearch(filter)
        setSearchAttempted(true)
    }


  return (
    <>
        <div className={styles.searchWrap}>
            <input ref={searchInput} className={styles.input} type="text" placeholder="What is your favorite candy?" />
            <button onClick={handelSearch} className="btn bg-customBtnGreen rounded-full px-6 py-2 font-semibold hover:bg-green-300 transition-colors shadow-btnShadow " >Search</button>
        </div>

        <div>
            {candySearch?.length > 0 ? (
                <div>
                    <h2>Sökresultat:</h2>
                    <div>
                        {candySearch.map((candy, idx) => (
                            <div key={idx} >
                                <h3>{candy.name}</h3>
                                <p>{candy.category}</p>
                                <p>Price: {candy.price}$</p>
                                <p>Stock: {candy.stock}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : ( 
                searchAttempted && <p>No candy found</p>
            )}
        </div>
    
    </>

  )
}
export default Searchcomp