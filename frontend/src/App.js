import { Routes, Route } from 'react-router-dom'
import ConnectionPage from './pages/ConnectionPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<ConnectionPage />} />
          <Route path='/accueil' element={<HomePage />} />
        </Routes>
    </>
  );
}

export default App;
