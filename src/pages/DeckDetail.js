import axios from "axios";
import { useState, useEffect } from "react";

import IsPrivate from "../components/IsPrivate";
import { Link, useNavigate, useParams } from "react-router-dom";

import DeckDisplay from "../components/DeckDisplay";

import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import CardDisplay from "../components/CardDisplay";

const API_URL = process.env.REACT_APP_SERVER_URL;

export default function DeckDetail() {
  const { deckId } = useParams();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [deckDetail, setdeckDetail] = useState(null);

  const getDeck = () => {
    axios
      .get(`${API_URL}/api/decks/${deckId}`)
      .then((response) => {
        console.log("response getDeck:.........", response.data);
        setdeckDetail(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/api/decksdelete/${deckId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log();
        navigate(`/profile/${user._id}`);

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const displayButtons = () => {
    if (user && deckDetail) {
      if (user._id === deckDetail.user._id) {
        return (
          <div className="flex justify-center">
            <Link
              key={deckDetail.name}
              to={`/decks/${deckDetail._id}/edit`}
              className="w-40 text-center bg-gray-900 text-white hover:bg-gray-700 hover:text-white rounded-md mx-2 px-5 py-2 text-sm font-medium"
            >
              Edit
            </Link>
            <button
              key={deckDetail.name}
              onClick={""}
              className="w-40 text-center bg-gray-900 text-white hover:bg-gray-700 hover:text-white rounded-md mx-2 px-5 py-2 text-sm font-medium"
            >
              Delete
            </button>
          </div>
        );
      }
    }
  };

  const displayDeck = () => {
    return (
      <>
        <header className="bg-white shadow">
          <div className=" flex flex-row justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {deckDetail.name}
            </h1>
            {displayButtons()}
            
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              Made by: {deckDetail.user.name}
            </h1>
          </div>
        </header>
        
        <div className="flex w-screen h-[45rem] justify-center flex-wrap overflow-auto hover:overflow-y-scroll">
          <DeckDisplay deckId={deckId} display="card" detailDeck={deckDetail} />
        </div>
      </>
    );
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
          {displayDeck()}
          <h2>{deckDetail.name}</h2>
          <p>{deckDetail.description}</p>
          <p>From: {deckDetail.user.name}</p>
        </>
      )}
      <div className="flex pt-16 space-x-5 w-full h-full items-center justify-center 2xl:w-full tails-selected-element">
        <div className="flex h-full w-96 bg-gray-300 2xl:h-full "></div>
      </div>
    </div>
  );
}
