import Registrationcomp from "../Components/Registrationcomp"
import CandyContextProvider from "../context/CandyContextProvider"

const Registration = () => {
  return (
    <div>
        <div>
        <CandyContextProvider>
            <Registrationcomp />
        </CandyContextProvider>
        </div>
    </div>
  )
}
export default Registration