import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout'
import CityDetails from './Pages/CitySelected';
function App() {


  return (
    <>
     <Router>
      <Routes >
        <Route path="/" element={<Layout />} />
        <Route path="/city/:cityName" element={<CityDetails />} />
      </Routes >
    </Router>
    </>
  )
}

export default App
