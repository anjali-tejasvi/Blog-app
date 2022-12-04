import './App.css';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Settings from './pages/settings/Settings';
import Write from './pages/write/Write';
import Home from '../src/pages/home/Home'
import Single from './pages/single/Single';
import { Topbar } from './topbar/Topbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import { useContext } from 'react';
import { Context } from './context/Context';


function App() {
  const {user} = useContext(Context)
  return (
    <Router>
      <Topbar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={user ? <Home /> : <Register />} />
      <Route path="/login" element={user ? <Home /> : <Login />} />
      <Route path="/write" element={user ? <Write />: <Register />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/post/:postID" element={<Single />} />
      </Routes>
    
      </Router>
  );
}

export default App;
