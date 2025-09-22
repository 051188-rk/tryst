import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Discover from './pages/Discover'
import Profile from './pages/Profile'
import Likes from './pages/Likes'
import Matches from './pages/Matches'
import Premium from './pages/Premium'
import Chats from './pages/Chats'
import ChatRoom from './pages/ChatRoom'
import BottomNav from './components/BottomNav'
import AuthContext from './context/AuthContext.jsx'
import UserProfile from './pages/UserProfile'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

export default function App(){
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/discover" /> : <Landing/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/discover" element={<PrivateRoute><Discover/></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
        <Route path="/likes" element={<PrivateRoute><Likes/></PrivateRoute>} />
        <Route path="/matches" element={<PrivateRoute><Matches/></PrivateRoute>} />
        <Route path="/premium" element={<PrivateRoute><Premium/></PrivateRoute>} />
        <Route path="/chats" element={<PrivateRoute><Chats/></PrivateRoute>} />
        <Route path="/chat/:id" element={<PrivateRoute><ChatRoom/></PrivateRoute>} />
        <Route path="/user/:id" element={<PrivateRoute><UserProfile/></PrivateRoute>} />
      </Routes>

      {user && <BottomNav />}
    </div>
  )
}