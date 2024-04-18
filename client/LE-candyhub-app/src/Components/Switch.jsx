import { Routes, Route } from "react-router-dom"
import Home from "../routes/Home"
import Login from "../routes/Login"
import Cart from "../routes/Cart"
import Registration from "../routes/Registration"

const Switch = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Registration />} />
            <Route render={() => <h1>404: page not found</h1>} />
        </Routes>
    </div>
  )
}
export default Switch