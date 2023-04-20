import axios from "axios";
import { useState, useEffect } from "react";

import IsPrivate from "../components/IsPrivate";
import { Link, useParams } from "react-router-dom";

import DeckDisplay from "../components/DeckDisplay";

import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

const API_URL = process.env.REACT_APP_SERVER_URL;

export default function DeckDetail() {
  const { deckId } = useParams();
  const { user } = useContext(AuthContext);

  const [deckDetail, setdeckDetail] = useState(null);

  console.log("user......", user);
  const getDeck = () => {
    axios
      .get(`${API_URL}/api/decks/${deckId}`)
      .then((response) => {
        console.log("response getDeck:.........", response.data);
        setdeckDetail(response.data);
      })
      .catch((error) => console.log(error));
  };

  const displayButtons = () => {
    if (user && deckDetail) {
      if (user._id === deckDetail.user._id) {
        return (
          <>
            <button>Edit</button>
            <button>Delete</button>
          </>
        );
      }
    }
  };

  useEffect(() => {
    getDeck();
  }, []);

  useEffect(() => {
    displayButtons();
  }, [deckDetail, user]);

  return (
    <div>
      {deckDetail && (
        <>
          <h2>{deckDetail.name}</h2>
          <p>{deckDetail.description}</p>
          <p>From: {deckDetail.user.name}</p>
        </>
      )}
      <div className="flex pt-16 space-x-5 w-full h-full items-center justify-center 2xl:w-full tails-selected-element">
        <div className="flex h-full w-96 bg-gray-300 2xl:h-full "></div>
        <DeckDisplay deckId={deckId} display="card" detailDeck={deckDetail} />
      </div>
      {displayButtons()}
    </div>
  );
}
