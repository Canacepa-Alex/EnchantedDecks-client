import Navbar from "../components/Navbar";
import IsPrivate from "../components/IsPrivate";

import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL = process.env.REACT_APP_SERVER_URL;

export default function DeckDetail() {
  const { deckId } = useParams();
  const [deckDetail, setdeckDetail] = useState(null);
  const [deckCards, setDeckCards] = useState([]);
  const getDeck = () => {
    axios
      .get(`${API_URL}/api/decks/${deckId}`)
      .then((response) => {
        console.log("response getDeck:.........", response.data);
        setdeckDetail(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getCardsDetail = () => {
    if (deckDetail) {
      setDeckCards([]);
      deckDetail.cards.map((card, index) => {
        axios
          .get(`https://api.scryfall.com/cards/${card.cardKey}`)
          .then((response) => {
            response.data.numberOfCard = deckDetail.cards[index].numberOfCard;

            setDeckCards((oldArray) => [...oldArray, response.data]);
          })
          .catch((error) => console.log(error));
      });
    }
  };

  const displayDeckCard = () => {
    return deckCards.map((card, index) => {
        console.log("card........", card)
      return (
        <div
          key={index}
          className="flex h-full w-full bg-gray-300 rounded-md 2xl:w-screen"
        >
          <div className="relative m-2 grid h-[20rem] w-full max-w-[14rem] items-end justify-center overflow-hidden text-center rounded-lg shadow">
            <p>{card.name}</p>
          </div>
            <p>{card.numberOfCard}</p>
        </div>
      );
    });
  };

  useEffect(() => {
    getDeck();
  }, []);

  useEffect(() => {
    getCardsDetail();
  }, [deckDetail]);

  useEffect(() => {
    displayDeckCard();
  }, [deckCards]);

  return (
    <div>
      <Navbar />

      <div className="flex pt-16 space-x-5 w-full h-full items-center justify-center 2xl:w-full tails-selected-element">
        <div className="flex h-full w-96 bg-gray-300 2xl:h-full "> </div>

        {deckDetail ? displayDeckCard() : <p>..loading</p>}
      </div>
    </div>
  );
}
