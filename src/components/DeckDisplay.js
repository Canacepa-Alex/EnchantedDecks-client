import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";



function DeckDisplay(props) {
  const IdDeck = props.deckId;
  const [deckCards, setDeckCards] = useState([]);
  

  const getCardsDetail = () => {
    if (props.detailDeck) {
      setDeckCards([]);
      props.detailDeck.cards.map((card, index) => {
        axios
          .get(`https://api.scryfall.com/cards/${card.cardKey}`)
          .then((response) => {
            response.data.numberOfCard = props.detailDeck.cards[index].numberOfCard;

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
        return (
          <div key={index}>
              <p>Name: {card.name}</p>
            <p>Number: {card.numberOfCard}</p>
          </div>
        );
      });
  };

  

  useEffect(() => {
    getCardsDetail();
  }, [props.detailDeck]);

  useEffect(() => {
    displayDeck();
  }, [deckCards]);

  return <>{props.detailDeck ? displayDeck() : <p>..loading</p>}</>;
}

export default DeckDisplay;
