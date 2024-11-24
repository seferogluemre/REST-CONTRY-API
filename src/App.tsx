import axios from 'axios'
import './App.css'
import { useState } from 'react';





function App() {
  const [countrys, setCountrys] = useState([]);


  async function getAllCountry() {
    const response = axios.get("https://restcountries.com/v3.1/independent?status=true");
  }









  return (
    <>

    </>
  )
}

export default App
