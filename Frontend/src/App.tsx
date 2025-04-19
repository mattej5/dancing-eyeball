import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Entertainers from './pages/Entertainers';
import AppNavbar from './components/Navbar';
import AddEntertainer from './components/AddEntertainer';


const App = () => {
  return (
    <Router>
      <AppNavbar />
      <div className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entertainers" element={<Entertainers />} />
          <Route path="/entertainers/add" element={<AddEntertainer />} />
          <Route path="/entertainers/:id" element={<AddEntertainer />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
