import LoginComp from "../Components/LoginComp"
import CandyContextProvider from "../context/CandyContextProvider"

const Login = () => {
  return (
    <div>
      <div>
      <CandyContextProvider>
        <LoginComp /> 
      </CandyContextProvider>
      </div>
    </div>
  )
}
export default Login