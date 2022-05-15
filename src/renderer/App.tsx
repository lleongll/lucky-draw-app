import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import NewDraw from 'pages/NewDraw';
import Draw from 'pages/Draw';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/NewDraw/*" element={<NewDraw />} />
        <Route path="/Draw" element={<Draw />} />
      </Routes>
    </Router>
  );
};

export default App;
