import './App.css'
import Header from './Header'
import { Outlet } from 'react-router-dom';
import Footer from './Footer'

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
