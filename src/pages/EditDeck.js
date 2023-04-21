import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import DeckDisplay from "../components/DeckDisplay";
import SearchEngine from "../components/SearchEngine";

import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL;

export default function EditDeck() {
  let { deckId } = useParams();

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
        setdeckDetail(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleClickAdd = (e) => {
    const requestBody = { cardKey: e, numberOfCard: 1 };
    const storedToken = localStorage.getItem("authToken");
    axios
      .put(`${API_URL}/api/decks/${deckId}/addCard/`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setdeckDetail(response.data);
        deckId = deckId;
      })
      .catch((error) => console.log(error));
  };

  const handleClickRemove = (e) => {
    const requestBody = { cardKey: e, numberOfCard: 1 };
    const storedToken = localStorage.getItem("authToken");
    axios
      .put(`${API_URL}/api/decks/${deckId}/removeCard/`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
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
        navigate(`/`);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getDeck();
  }, [deckId]);

  return (
    <div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="flex flex-row items-center text-3xl font-bold tracking-tight text-gray-900">
            Manage cards
          </h1>
        </div>
      </header>
      <div className="flex  h-full w-full items-center justify-center 2xl:w-full tails-selected-element">
      {deckDetail ? (
        <div className=" justify-center h-[48.8rem] w-96 bg-gray-300">
          <div className="flex w-full flex-col justify-center">
            <Link
              key={deckDetail.name}
              to={`/decks/${deckDetail._id}`}
              className="m-1 text-center bg-gray-900 text-white hover:bg-gray-700 hover:text-white rounded-md mx-2 px-5 py-2 text-sm font-medium"
            >
              Details
            </Link>
            <Link
              key={deckDetail.name}
              to={`/forms/deckEdit/${deckDetail._id}`}
              className="m-1 text-center bg-gray-900 text-white hover:bg-gray-700 hover:text-white rounded-md mx-2 px-5 py-2 text-sm font-medium"
            >
              Edit details
            </Link>
            <button
              key={deckDetail.name}
              onClick={handleClickDelete}
              className="m-1 text-center bg-gray-900 text-white hover:bg-gray-700 hover:text-white rounded-md mx-2 px-5 py-2 text-sm font-medium"
            >
              Delete
            </button>
          </div>
          <DeckDisplay
            deckId={deckId}
            display="list"
            detailDeck={deckDetail}
            handleClickRemove={handleClickRemove}
          />
          
          
        </div>
            ) : (
              ""
            )}
        

        <div className="flex w-full h-full ">
          <SearchEngine handleClick={handleClickAdd} />
        </div>
      </div>
    </div>
  );
}
