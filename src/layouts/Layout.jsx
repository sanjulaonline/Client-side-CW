import { Outlet, Link } from 'react-router-dom';
import { FaHome, FaRegUser } from 'react-icons/fa';
import '../index.css';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout-container">
      <header className="main-header">
        <Link to="/" className="branding">
          <div className="logo-icon">
            <FaHome size={18} />
          </div>
          <span className="brand-text">EstateEase <span className="brand-accent">Pro</span></span>
        </Link>

        <nav className="main-nav">
          <Link to="/" className="nav-link">Buy</Link>
          <Link to="/" className="nav-link">Rent</Link>
          <Link to="/" className="nav-link">Sell</Link>
          <Link to="/" className="nav-link">Valuation</Link>
        </nav>

        <div className="user-actions">
          <FaRegUser size={18} />
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="main-footer">
        <p>&copy; 2024 EstateEase Pro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
