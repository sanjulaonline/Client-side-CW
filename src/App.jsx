import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import SearchPage from './pages/SearchPage';
import PropertyPage from './pages/PropertyPage';
import { FavouritesProvider } from './context/FavouritesContext';

function App() {
  return (
    <FavouritesProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<SearchPage />} />
            <Route path="property/:id" element={<PropertyPage />} />
            {/* Fallback route */}
            <Route path="*" element={<div>Page Not Found</div>} />
          </Route>
        </Routes>
      </Router>
    </FavouritesProvider>
  );
}


export default App;
