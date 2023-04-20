import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL;

export default function Deck({deckId}) {
  const [deck, setDeck] = useState(null);

  const getDeck = () => {
    axios
      .get(`${API_URL}/api/decks/${deckId}`)
      .then((response) => {
        console.log(response.data);
        setDeck(response.data);
      })
      .catch((error) => console.log(error));
  };

  

  useEffect(() => {
    getDeck();
  }, []);
  return (
    <>
      {deck ? <h1>{deck.name}</h1> : ""}
    </>
  );
}
