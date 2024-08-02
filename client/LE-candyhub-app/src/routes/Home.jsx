import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import CategoryComp from "../Components/CategoryComp"
import SearchComp from "../Components/SearchComp"
import { CandyContext } from '../context/CandyContextProvider';
import homeImg from '../assets/glasjar_2.png'
import styles from '../Styles/home-style.module.css'

const Home = () => {
  const location = useLocation();
  const { setCandySearch, setSearchTerm } = useContext(CandyContext);

  useEffect(() => {
    if (location.pathname === '/') {
      setCandySearch([]);
      setSearchTerm('');
    }
  }, [location, setCandySearch, setSearchTerm]);

  return (
    <div>
        <div className={styles.homeWrap}>
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl ">Welcome to CandyHub!</h1>
          <div className={styles.homeContent}>
            <div className={styles.searchCompWrap}>
              <SearchComp/>
            </div>
            <img className={styles.homeImg} src={homeImg} alt="" />
          </div>
        </div>
        <CategoryComp/>
    </div>
  )
}
export default Home