import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import DeckDisplay from "../components/DeckDisplay";
import SearchEngine from "../components/SearchEngine";

import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL;

export default function EditDeck() {
  const { deckId } = useParams();

  const [deckDetail, setdeckDetail] = useState(null);

  const navigate = useNavigate();

  const getDeck = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/decks/${deckId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("response.........", response);
        setdeckDetail(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleClickAdd = (e) => {
    console.log("test e.....", e);
    const requestBody = { cardKey: e, numberOfCard: 1 };
    const storedToken = localStorage.getItem("authToken");
    axios
      .put(`${API_URL}/api/decks/${deckId}/addCard/`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("response.........", response);
        setdeckDetail(response.data);
        deckId = deckId;
      })
      .catch((error) => console.log(error));
  };

  const handleClickRemove = (e) => {
    console.log("test e.....", e);
    const requestBody = { cardKey: e, numberOfCard: 1 };
    const storedToken = localStorage.getItem("authToken");
    axios
      .put(`${API_URL}/api/decks/${deckId}/removeCard/`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("response.........", response);
        setdeckDetail(response.data);
        deckId = deckId;
      })
      .catch((error) => console.log(error));
  };

  const handleClickDelete = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/api/decks/${deckId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("response.........", response);
        navigate(`/`);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getDeck();
  }, [deckId]);

  return (
    <div>
      <div className="flex  h-full w-full items-center justify-center 2xl:w-full tails-selected-element">
        <div className=" justify-center h-full w-96 bg-gray-300">
          <DeckDisplay
            deckId={deckId}
            display="list"
            detailDeck={deckDetail}
            handleClickRemove={handleClickRemove}
          />
          
          <button onClick={handleClickDelete}>Delete Deck</button>
        </div>

        <div className="flex w-full h-full ">
          <SearchEngine handleClick={handleClickAdd} />
        </div>
      </div>
    </div>
  );
}
