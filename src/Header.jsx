import { Link } from 'react-router-dom';

function Header() {
 return (
    <header> 
      <div>
        <div className="logo">
          <h1>Indecis¿ve</h1>
        </div>
        <nav style={{ background: '#eee', padding: '10px', marginBottom: '20px' }}>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '15px', margin: 0, padding: 0, alignItems: 'center' }}>
            <li><Link to="/">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/restaurants">Restaurants</Link></li>
            <li><Link to="/quiz">Quiz</Link></li>
            <li><Link to="/partners">Couple's Quiz</Link></li>
            <li><Link to="/random">Random Suggestion</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
};

export default Header;