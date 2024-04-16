import Categorycomp from "../Components/Categorycomp"
import Searchcomp from "../Components/Searchcomp"
import CandyContextProvider from "../context/CandyContextProvider"

const Home = () => {
  return (
    <div>
        <CandyContextProvider>
            <Searchcomp/>
        </CandyContextProvider>
        <Categorycomp/>
    </div>
  )
}
export default Home