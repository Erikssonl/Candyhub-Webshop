import { useState } from 'react'
import './Styles/App.css'
import Navigation from './Components/Navigation'
import Switch from './Components/Switch'
import CandyContextProvider from "./context/CandyContextProvider"
import Footer from './Components/Footer'

function App() {

  return (
    <CandyContextProvider>
      <>
        <Navigation />
        <Switch />
        <Footer />
      </>
    </CandyContextProvider>
  )
}

export default App
