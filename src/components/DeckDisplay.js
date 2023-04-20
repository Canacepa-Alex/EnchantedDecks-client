import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";



function DeckDisplay(props) {
  const IdDeck = props.deckId;
  const [deckCards, setDeckCards] = useState([]);
  console.log("PROPS", props.detailDeck);

  const getCardsDetail = () => {
    if (props.detailDeck) {
      setDeckCards([]);
      props.detailDeck.cards.map((card, index) => {
        console.log("CARD ID", card._id);
        axios
          .get(`https://api.scryfall.com/cards/${card.cardId}`)
          .then((response) => {
            response.data.numberOfCard = props.detailDeck.cards[index].numberOfCard;

            setDeckCards((oldArray) => [...oldArray, response.data]);
            console.log(deckCards);
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
          <div
            key={index}
            className="relative m-2 grid h-[20rem] w-full max-w-[14rem] items-end justify-center text-center rounded-lg shadow"
          >

          </div>
          <div
            key={index}
            className="flex rounded-md "
          >

            <div
                color="transparent"
                className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
                style={{
                  backgroundImage: `url(${card.image_uris.border_crop})`,
                }}
              >
                <div className="to-bg-black-10 absolute inset-0 h-full w-full hover:bg-gradient-to-t from-black/80 via-black/50">
                  <div className="flex flex-col justify-between h-full w-full py-8 px-6 md:px-12 text-transparent hover:text-white dark:hover:text-white">
                    <div
                      variant="h2"
                      color="white"
                      className="mb-2 text-2xl font-bold tracking-tight"
                    >
                      {card.name}
                    </div>
                    <div className="mb-4 flex">
                      <button
                        type="button"
                        // onClick={() => handleOpenModal(card.id)}
                        className="inline-flex items-center rounded-md px-4 py-1 text-base font-medium transition duration-200 hover:bg-purple-600 active:bg-purple-700  dark:hover:bg-purple-300 dark:active:bg-purple-200"
                        id={card.id}
                      >
                        Details
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 ml-2 -mr-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="mb-4 flex">
                      {props.handleClick && (
                        <button
                          onClick={(e) => props.handleClick(e.target.id)}
                          className="inline-flex items-center rounded-xl px-4 py-1 text-base font-medium transition duration-200 hover:bg-purple-600 active:bg-purple-700  dark:hover:bg-purple-300 dark:active:bg-purple-200"
                          id={card.id}
                        >
                          Add to Deck
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 ml-2 -mr-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            
            <p>{card.numberOfCard}</p>
          </div>
          </>
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
