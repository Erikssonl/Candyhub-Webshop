import { useContext } from 'react';
import { CandyContext } from '../context/CandyContextProvider';
import styles from '../Styles/Searchcomp-style.module.css'

const Resultcomp = () => {
    const { candySearch, setSearchTerm, handleSearch, searchAttempted, searchTerm } = useContext(CandyContext)

  return (
    <div>
        <div className={styles.searchWrap}>
            <input 
            className={styles.input} 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="What is your favorite candy?" />
            <button onClick={()=> handleSearch(searchTerm)} className="btn bg-customBtnGreen rounded-full px-6 py-2 font-semibold hover:bg-green-300 transition-colors shadow-btnShadow " >Search</button>
        </div>
        <div>
            {candySearch?.length > 0 ? (
                <div>
                    <h2>Sökresultat:</h2>
                    <div>
                        {candySearch.map((candy, idx) => (
                            <div className={styles.prudoctWrap} key={idx} >
                                <h3>{candy.name}</h3>
                                <p>{candy.category}</p>
                                <p>Price: {candy.price}$</p>
                                <p>Stock: {candy.stock}</p>
                                <button 
                                className="btn bg-customBtnGreen rounded-full px-6 py-2 font-semibold hover:bg-green-300 transition-colors shadow-btnShadow ">
                                Add to cart</button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : ( 
                searchAttempted && <p>No candy found</p>
            )}
        </div>
        
    </div>
  )
}
export default Resultcomp