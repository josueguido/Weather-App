import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout'
import Citys from './Pages/CitysFavorites'
function App() {


  return (
    <>
     <Router>
      <Routes >
        <Route path="/" element={<Layout />} />
        <Route path="/CitysFavorites" element={<Citys />} />
      </Routes >
    </Router>
    </>
  )
}

export default App
