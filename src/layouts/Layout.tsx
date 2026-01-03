import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FaHome, FaHeart } from 'react-icons/fa';
import './Layout.css';

const Layout: React.FC = () => {
    return (
        <div className="layout-container">
            <header className="navbar">
                <div className="navbar-content">
                    <Link to="/" className="navbar-logo">
                        <FaHome className="logo-icon" />
                        <span>EstateEase Pro</span>
                    </Link>
                    <nav>
                        <Link to="/" className="nav-link">Search</Link>
                        <div className="nav-favourites-icon">
                            <FaHeart />
                            {/* Placeholder for favourites count */}
                        </div>
                    </nav>
                </div>
            </header>
            <main className="main-content">
                <Outlet />
            </main>
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} EstateEase Pro. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;
