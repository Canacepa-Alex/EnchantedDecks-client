import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import Navbar from "../components/Navbar";
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
      <Navbar />
      <br />
      <br />
      <br />
      Profile
      {userProfile ? <h1>{userProfile.name}</h1> : ""}
    </>
  );
}
