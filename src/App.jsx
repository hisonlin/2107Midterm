import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Quiz from './pages/Quiz'

function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz/:category/:difficulty" element={<Quiz />} />
    </Routes>
   
    </>
  )
}

export default App
