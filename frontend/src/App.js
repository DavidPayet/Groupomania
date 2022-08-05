import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Footer from './components/Footer';
import Auth from './contexts/Auth';
import ConnectionPage from './pages/ConnectionPage'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import PersonalPosts from './pages/PersonalPosts'
import { hasAuthenticated } from './services/authApi'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated())

  return (
    <>
      <Auth.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <Routes>
          <Route path='/' element={<ConnectionPage />} />
          <Route path='/accueil' element={<HomePage />} />
          <Route
            path='/dashboard/:userId'
            element={
              <AuthenticatedRoute>
                <Dashboard />
              </AuthenticatedRoute>
            }
          />
          <Route
            path='/mes-posts/:userId'
            element={
              <AuthenticatedRoute>
                <PersonalPosts />
              </AuthenticatedRoute>
            }
          />
          <Route path='*' element={<ConnectionPage />} />
        </Routes>
      </Auth.Provider>
      <Footer />
    </>
  );
}

export default App;
