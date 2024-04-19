import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Categorycomp from "../Components/Categorycomp"
import Searchcomp from "../Components/Searchcomp"
import { CandyContext } from '../context/CandyContextProvider';
import homeImg from '../assets/background.jpg'
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
          <img className={styles.homeImg} src={homeImg} alt="" />
          <div className={styles.overlayContent}>
            <h1 className="text-3xl">Welcome to CandyHub!</h1>
            <Searchcomp/>
          </div>
        </div>
        {/* <Categorycomp/> ska lägga till detta senare när jag har tid, efter kursens slut då det ej va ett kriterie får uppgiften */}
    </div>
  )
}
export default Home