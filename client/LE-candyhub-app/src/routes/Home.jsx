import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import CategoryComp from "../Components/CategoryComp"
import Searchcomp from "../Components/Searchcomp"
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
          <h1 className="text-6xl">Welcome to CandyHub!</h1>
          <div className={styles.homeContent}>
            <div className={styles.searchCompWrap}>
              <Searchcomp/>
            </div>
            <img className={styles.homeImg} src={homeImg} alt="" />
          </div>
        </div>
        <CategoryComp/>
    </div>
  )
}
export default Home