import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Header from './components/Header'
import ConnectionPage from './pages/ConnectionPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <>
      <Navbar />
      <Header />
      <Routes>
          <Route path='/connexion' element={<ConnectionPage />} />
          <Route path='/accueil' element={<HomePage />} />
        </Routes>
    </>
  );
}

export default App;
