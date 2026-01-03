import { Outlet, Link } from 'react-router-dom';
import { FaHome, FaHeart } from 'react-icons/fa';
import '../index.css';

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
            {/* Favourites link will go here later */}
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

      {/* Basic Layout Styles - inline for now, moving to CSS later */}
      <style>{`
        .layout-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .main-header {
          background-color: #1a1a1a;
          padding: 1rem 2rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .branding {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: white;
          text-decoration: none;
        }
        .branding h1 { margin: 0; font-size: 1.5rem; }
        .main-content {
          flex: 1;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          padding: 2rem;
        }
        .main-footer {
          background-color: #1a1a1a;
          text-align: center;
          padding: 2rem;
          margin-top: auto;
        }
        .nav-link {
          color: white;
          text-decoration: none;
          margin-left: 2rem;
          font-weight: 500;
        }
        .nav-link:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
};

export default Layout;
