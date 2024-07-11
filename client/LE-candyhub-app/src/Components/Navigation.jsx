import { NavLink } from "react-router-dom"
import logo from '../assets/logo.webp'
import styles from '../Styles/Navigation-style.module.css'
import { useContext } from 'react';
import { CandyContext } from '../context/CandyContextProvider';

const Navigation = () => {
  const { cartCount } = useContext(CandyContext)
  return (
    <div>
        <nav className={styles.headerwrap}>
            <div className={styles.mainNavWrap}>
                <img className={styles.logoimg} src={logo} alt="" />
                <ul className={styles.mainNav}>
                    <li><NavLink className={styles.home} to="/">Home</NavLink></li>
                    <li><NavLink className={styles.login} to="/login">Sign in</NavLink></li>
                </ul>
            </div>
            <NavLink className={styles.cart} to="/cart">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="file: mt-6 h-8 w-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <span className="text-sm ml-2">{cartCount}</span>
            </NavLink> 
        </nav>
    </div>
  )
}
export default Navigation