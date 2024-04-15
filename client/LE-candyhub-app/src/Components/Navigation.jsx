import { NavLink } from "react-router-dom"

const Navigation = () => {
  return (
    <nav>
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/login">Log in</NavLink></li>
        </ul>
        <ul>
            <li><NavLink to="/cart">Cart</NavLink></li>
        </ul>
    </nav>
  )
}
export default Navigation