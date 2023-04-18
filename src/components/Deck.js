import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

export default function Deck({deckId}) {
  const [deck, setDeck] = useState(null);

  const getDeck = () => {
    axios
      .get(`http://localhost:5005/api/decks/${deckId}`)
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
      Deck
      {deck ? <h1>{deck.name}</h1> : ""}
    </>
  );
}
