import { useContext } from 'react';
import { CandyContext } from '../context/CandyContextProvider';
import { Link } from "react-router-dom"
import styles from '../Styles/Logreg-style.module.css'

const Logincomp = () => {
    const { userName, password, setUserName, setPassword, login, loginStatus  } = useContext(CandyContext)

  return (
    <div className={styles.loginWrap}>
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Login</h2>
                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input 
                    type="text" 
                    className="grow" 
                    placeholder="Enter username"
                    required
                    value={userName}
                    onChange={(e)=> setUserName(e.target.value)}/>
                </label>
                <br />
                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input 
                    type="password" 
                    className="grow" 
                    placeholder="Enter password" 
                    required
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}/>
                </label>
                <br />
                <div className="card-actions justify-end">
                    <button onClick={()=> login()} className="btn bg-customBtnGreen rounded-full px-6 py-2 font-semibold hover:bg-green-300 transition-colors shadow-btnShadow">
                    Log in
                    </button>
                </div>
                <div>
                    {loginStatus === false ? (
                        <div>
                            <br />
                            <div role="alert" className="alert alert-error">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>Wrong username or password</span>
                            </div>
                        </div>
                    ) : loginStatus === true ? (
                        <div>
                            <br />
                            <div role="alert" className="alert alert-success">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>Login succede. Welcome {userName}</span>
                            </div>
                            <br />
                            <div className="card-actions justify-center">
                                <Link className={styles.shopLink} to="/">Click here to go shopping for candy</Link>
                            </div>
                        </div>
                    ) : null}
                </div>
                <br />
                <div className="card-actions justify-center">
                    <Link className={styles.regLink} to="/register">No user account? Click here to register!</Link>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Logincomp