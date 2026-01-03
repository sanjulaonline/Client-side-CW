import { Outlet, Link } from 'react-router-dom';
import { FaHome, FaHeart } from 'react-icons/fa';
import '../index.css';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout-container">
      <header className="main-header">
        <div className="header-content">
          <Link to="/" className="branding">
            <FaHome size={32} />
            <h1>EstateEase Pro</h1>
          </Link>
          <nav className="main-nav">
            <Link to="/" className="nav-link">Search</Link>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="main-footer">
        <p>&copy; 2024 EstateEase Pro. All rights reserved.</p>
        <p>Advanced Web Development Coursework</p>
      </footer>
    </div>
  );
};

export default Layout;
