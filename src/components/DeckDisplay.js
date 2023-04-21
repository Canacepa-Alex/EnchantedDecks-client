import { Transition } from "@headlessui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CardDetail from "./CardDetails";
import CardDisplay from "./CardDisplay";

function DeckDisplay(props) {
  const IdDeck = props.deckId;
  const [deckCards, setDeckCards] = useState([]);

  const [openModalId, setOpenModalId] = useState(null);
  const handleOpenModal = (id) => {
    setOpenModalId(id);
  };

  const handleCloseModal = () => {
    setOpenModalId(null);
  };


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
          <>
          <CardDisplay listOfCard={[card]} />
          <div>{card.numberOfCard} cards</div>
          </>
        );
      });
  };

  const displayDeckList = () => {
    return (
      <div>
        <ul role="list" className="m-3 divide-y divide-gray-900 ">
        {deckCards.map((card) => (
          <li key={card._id} className="flex bg-white rounded-md justify-between gap-x-6 py-5">
            <div className="flex m-1 gap-x-4">
            {card.image_uris &&
              <img
                className="h-12 w-14 flex-none rounded-md bg-gray-50"
                src= {card.image_uris.art_crop}
                alt=""
              />
            }
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {card.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {card.numberOfCard} cards
                </p>
              </div>
            </div>
            <div className="hidden  m-1 sm:flex sm:flex-col sm:items-end">
            <button id={card.id} onClick={(e) => props.handleClickRemove(e.target.id)} className="bg-gray-900 text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
            remove
            </button>
            </div>
          </li>
        ))}
      </ul>
      </div>
    );
  };

  

  useEffect(() => {
    getCardsDetail();
  }, [props.detailDeck]);

  useEffect(() => {
    displayDeck();
    displayDeckCard();
    displayDeckList();
  }, [deckCards]);

  return <>{props.detailDeck ? displayDeck() : <p>..loading</p>}</>;
}

export default DeckDisplay;
