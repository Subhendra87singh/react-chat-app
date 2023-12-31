import { useState, useEffect } from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import './App.css'
import Layout from './pages/Layout'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase'
import { useDispatch } from 'react-redux';
import { addLoginStatus, addUser } from './redux/slices/useSlice'
import PrivateRoute from './routes/PrivateRoutes.jsx'
function App() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setUser(user);
        dispatch(addUser(user));
        dispatch(addLoginStatus(true));
      } else {
        setUser(null);
        dispatch(addUser({}));
        dispatch(addLoginStatus(false));
      }
    });
  }, [dispatch])



  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<PrivateRoute isAuthenticated={user !== null} />}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
          </Route>

          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
