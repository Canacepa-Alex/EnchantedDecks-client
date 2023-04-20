import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import Deck from "../components/Deck";

const API_URL = process.env.REACT_APP_SERVER_URL;

export default function Profile(props) {
  const { userId } = useParams();
  const { user } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);

  const [deckName, setDeckName] = useState(null);
  const [deckDescription, setDeckDescription] = useState(null);

  const getUser = () => {
    axios
      .get(`${API_URL}/api/users/${userId}`)
      .then((response) => {
        setUserProfile(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getCurrentUser = () => {};

  const displayDecks = () => {
    return userProfile.decks.map((deck, index) => {
      return <Deck deckId={deck._id} key={index} />;
    });
  };

  const handleSubmit = (element) => {
    element.preventDefault();
    const newDeck = {
      name: deckName,
      description: deckDescription,
      user: userId,
    };
    const storedToken = localStorage.getItem('authToken');  
    axios
      .post(API_URL + "/api/decks", newDeck, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {});
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {userProfile ? <span>{userProfile.name}</span> : ""}
          </h1>
        </div>
      </header>
      Profile
      {userProfile ? <h1>{userProfile.name}</h1> : ""}
    </>
  );
}
