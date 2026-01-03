import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
// Placeholder for pages, we will create them next
import SearchPage from './pages/SearchPage';
import PropertyPage from './pages/PropertyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SearchPage />} />
          <Route path="property/:id" element={<PropertyPage />} />
          {/* Fallback route */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
