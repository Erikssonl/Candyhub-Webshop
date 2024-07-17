import { Routes, Route } from "react-router-dom"
import Home from "../routes/Home"
import Login from "../routes/Login"
import Cart from "../routes/Cart"
import Registration from "../routes/Registration"
import SearchResult from "../routes/SearchResult"
import CategoryResult from "../routes/CategoryResult"

const Switch = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/Searchresult" element={<SearchResult />} />
            <Route path="/category-result" element={<CategoryResult />} />
            <Route render={() => <h1>404: page not found</h1>} />
        </Routes>
    </div>
  )
}
export default Switch