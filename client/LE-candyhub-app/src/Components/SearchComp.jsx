import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CandyContext } from '../context/CandyContextProvider';
import styles from '../Styles/SearchComp-style.module.css'

const SearchComp = () => {
    const navigate = useNavigate()
    const { setSearchTerm, handleSearch, searchTerm } = useContext(CandyContext)

    const handleSearchClick = () => {

      if (searchTerm.trim() === '') {
        return;
      }

      handleSearch(searchTerm);
      navigate('/Searchresult');
    };

  return (
    <>
        <div className={styles.searchWrap}>
            <input 
            className={styles.input} 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="What is your favorite candy?" />
            <button onClick={handleSearchClick} className="btn btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-customBtnGreen rounded-full px-6 py-2 font-semibold hover:bg-green-300 transition-colors shadow-btnShadow " >Search</button>
        </div>
    </>

  )
}
export default SearchComp
