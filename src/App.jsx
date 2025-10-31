import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Profile from './pages/profile'
import AllNotes from './pages/allnotes'
import Login from './components/login'
import Signup from './components/Signup'
import Notecards from './components/notecards'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'


function App() {


  return (
    <>
     <div>
      
      <Routes>
        {/* Public (only when logged OUT) */}
        <Route element={<PublicRoute />}> 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Protected (requires auth) */}
        <Route element={<ProtectedRoute />}> 
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/all-notes" element={<AllNotes />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
     </div>
    </>
  )
}

export default App
