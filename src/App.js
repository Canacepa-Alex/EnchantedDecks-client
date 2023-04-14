import './App.css';
import HomePage from './pages/HomePages';
import { Route, Routes } from 'react-router-dom';
import SearchCards from './pages/SearchCards';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<HomePage />}/>
        <Route exact path="/search-card" element={<SearchCards />}/>
      </Routes>

    </div>
  );
}

export default App;
