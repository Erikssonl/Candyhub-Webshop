import { NavLink } from "react-router-dom"
import logo from '../assets/logo.webp'
import styles from '../Styles/Navigation-style.module.css'

const Navigation = () => {
  return (
    <div>
        <nav className={styles.headerwrap}>
            <div className={styles.mainNavWrap}>
                <img className={styles.logoimg} src={logo} alt="" />
                <ul className={styles.mainNav}>
                    <li><NavLink className={styles.home} to="/">Home</NavLink></li>
                    <li><NavLink className={styles.login} to="/login">Log in</NavLink></li>
                </ul>
            </div>
            <NavLink className={styles.cart} to="/cart">Cart</NavLink> 
        </nav>
    </div>
  )
}
export default Navigation