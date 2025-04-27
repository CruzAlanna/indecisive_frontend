import './App.css'
import Header from './Header'
import About from './pages/AboutPage'
import MenuPage from './Menu/MenuPage'
import QuizPage from './Quiz/QuizPage'
import Footer from './Footer'

function App() {
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <Header />
        <hr></hr>
        <About />
        <hr></hr>
      </div>
      <MenuPage />
      <hr></hr>
      <div style={{ textAlign: 'center' }}>
        <QuizPage />
        <hr></hr>
        <Footer />
      </div>
      
    </div>
  )
}

export default App;
