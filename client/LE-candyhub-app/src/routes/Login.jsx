import Logincomp from "../Components/Logincomp"
import CandyContextProvider from "../context/CandyContextProvider"

const Login = () => {
  return (
    <div>
      <div>
      <CandyContextProvider>
        <Logincomp /> 
      </CandyContextProvider>
      </div>
    </div>
  )
}
export default Login