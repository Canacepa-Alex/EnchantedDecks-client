import './App.css';
import HomePage from './pages/HomePage';
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
import FormsPage from './pages/FormsPage';
import DecksList from './pages/DecksList';
import EventsList from './pages/EventsList';
import FormsPageEdit from './pages/FormsPageEdit';
import EventDetail from './pages/EventDetail';
import CardsPage from './pages/CardsPage';

function App() {
  return (
    <div className="App h-screen bg-gray-100">
    <Navbar/>
      <Routes>
        <Route exact path="/" element={<HomePage />}/>
        <Route exact path="/login" element={<IsAnon><LoginPage /></IsAnon>}/>
        <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />

        <Route exact path="/users/:userId" element={<ProfilePage />}/>
        <Route exact path="/users/:userId/edit" element={<IsPrivate><ProfileEdit /></IsPrivate>}/>

        <Route exact path="/cards" element={<CardsPage />}/>
        <Route exact path="/search-card" element={<SearchCards />}/>

        <Route exact path="/decks" element={<DecksList />}/>
        <Route exact path="/decks/:deckId/edit" element={<IsPrivate><EditDeck /></IsPrivate>}/>
        <Route exact path="/decks/:deckId" element={<DeckDetail />}/>

        <Route exact path="/events" element={<EventsList />}/>
        <Route exact path="/events/:eventId" element={<EventDetail />}/>

        <Route exact path="/forms/:form" element={<FormsPage />}/>
        <Route exact path="/forms/:form/:id" element={<FormsPageEdit />}/>
      </Routes>
    </div>
  );
}

export default App;
