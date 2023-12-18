import { Route, Routes, useNavigate} from 'react-router-dom'
import './App.css'
import React, { useEffect } from 'react'
import ChatPage from './pages/ChatPage/ChatPage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import app from './firebase'
import { useDispatch } from 'react-redux'
import { clearUser, setUser } from './store/userSlice'

function App() {
  const auth = getAuth(app)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        navigate('/')
        console.log('사용자 로그인됨:', user.displayName);
        dispatch(setUser({
          uid : user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        }))
      }
      //로그아웃
      else {
        navigate('/login');
        dispatch(clearUser());
      }
    })
    return () => {
      unsubscribe();
      console.log('useEffect clean-up: onAuthStateChanged 구독 해제');
    }
  }, [])

  return (
    <Routes>
      <Route path="/" element={<ChatPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}

export default App
