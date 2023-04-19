import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL = process.env.REACT_APP_SERVER_URL;

function DeckDisplay(props) {
    console.log(props);
  const IdDeck = props.deckId;
  
  console.log(IdDeck);
  const [deckDetail, setdeckDetail] = useState(null);
  const [deckCards, setDeckCards] = useState([]);
  const getDeck = () => {
    axios
      .get(`${API_URL}/api/decks/${IdDeck}`)
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

  const displayDeck = () => {
    if (props.display === "card"){
        return displayDeckCard();
    } else if(props.display === "list"){
        return displayDeckList();
    }
  };

  const displayDeckCard = () => {
    return deckCards.map((card, index) => {
        console.log("card........", card);
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

  const displayDeckList = () => {
    return deckCards.map((card, index) => {
        console.log("card........", card);
        return (
          <div key={index}>
              <p>Name: {card.name}</p>
            <p>Number: {card.numberOfCard}</p>
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
    displayDeck();
  }, [deckCards]);

  return <>{deckDetail ? displayDeck() : <p>..loading</p>}</>;
}

export default DeckDisplay;
