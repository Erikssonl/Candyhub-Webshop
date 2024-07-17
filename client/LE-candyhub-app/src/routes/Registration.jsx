import RegistrationComp from "../Components/RegistrationComp"
import CandyContextProvider from "../context/CandyContextProvider"

const Registration = () => {
  return (
    <div>
        <div>
        <CandyContextProvider>
            <RegistrationComp />
        </CandyContextProvider>
        </div>
    </div>
  )
}
export default Registration