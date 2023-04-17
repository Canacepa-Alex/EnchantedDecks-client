import './App.css';
import HomePage from './pages/HomePages';
import { Route, Routes } from 'react-router-dom';
// import SearchCards from './pages/SearchCards';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<HomePage />}/>
        <Route exact path="/user/:userId" element={<ProfilePage />}/>
        {/* <Route exact path="/search-card" element={<SearchCards />}/> */}
        <Route exact path="/login" element={<IsAnon><LoginPage /></IsAnon>}/>
        <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
      </Routes>

    </div>
  );
}

export default App;
