import { useState } from 'react'
import './Styles/App.css'
import Navigation from './Components/Navigation'
import Switch from './Components/Switch'
import CandyContextProvider from "./context/CandyContextProvider"

function App() {

  return (
    <CandyContextProvider>
      <>
        <Navigation />
        <Switch />
      </>
    </CandyContextProvider>
  )
}

export default App
