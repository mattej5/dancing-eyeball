import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="custom-navbar bg-dark text-white sticky-top">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img src="/jones.png" alt="Jones Logo" className="navbar-logo" />
          <span className="brand-text">Jones Entertainment</span>
        </Link>

        <div className="navbar-links">
          <Link to="/entertainers" className="nav-link text-white">
            Entertainers
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
