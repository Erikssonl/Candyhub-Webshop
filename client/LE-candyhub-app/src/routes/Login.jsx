import Logincomp from "../Components/Logincomp"
import Registrationcomp from "../Components/Registrationcomp"
import CandyContextProvider from "../context/CandyContextProvider"

const Login = () => {
  return (
    <div>
      <div>
      <CandyContextProvider>
        <Logincomp /> 
        <Registrationcomp />
      </CandyContextProvider>
      </div>
    </div>
  )
}
export default Login