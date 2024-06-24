import styles from '../Styles/Footer-style.module.css'
import logo from '../assets/logo.webp'

function Footer() {
  return (
    <div className={styles.footerWrap}>
        <p>This is a fictional webshop <br />
            for a school asignment!
        </p>
        <div className={styles.logoWrap}>
            <p>Created by Louise Eriksson</p>
            {/* <img className={styles.logoimg} src={logo} alt="" /> */}
        </div>
        <div>
            <p>Go to my portfolio to see <br /> 
                more projects: <a href="https://le-frontend.netlify.app/" target='blank'>Click here!</a>
            </p>
        </div>
    </div>
  )
}
export default Footer