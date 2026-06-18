import './App.css'
import Header from './Header'
import { Outlet } from 'react-router-dom';
import Footer from './Footer'
import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === "development" 
  ? "http://localhost:3000" 
  : "https://indecisive-app.onrender.com";

function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Header />
      <hr></hr>
      <Outlet />
      <hr></hr>
      <Footer />
    </div>
  )
}

export default App;
