import './App.css';
import HomePage from './pages/HomePages';
import { Route, Routes } from 'react-router-dom';

import SearchCards from './pages/SearchCards';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import DeckDetail from './pages/DeckDetail';
import ProfileEdit from './pages/ProfilePageEdit';
import EditDeck from './pages/EditDeck';

import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App h-screen bg-gray-100">
    <Navbar/>
      <Routes>
        <Route exact path="/" element={<HomePage />}/>
        <Route exact path="/users/:userId" element={<ProfilePage />}/>
        <Route exact path="/users/:userId/edit" element={<IsPrivate><ProfileEdit /></IsPrivate>}/>
        <Route exact path="/search-card" element={<SearchCards />}/>
        <Route exact path="/login" element={<IsAnon><LoginPage /></IsAnon>}/>
        <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
        <Route exact path="/decks/:deckId/edit" element={<IsPrivate><EditDeck /></IsPrivate>}/>
        <Route exact path="/decks/:deckId" element={<DeckDetail />}/>
      </Routes>
    </div>
  );
}

export default App;
