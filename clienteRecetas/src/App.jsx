import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Registro from './components/Registro';
function App() {
  const [count, setCount] = useState(0)

  return (
    <Registro />
  )
}

export default App
