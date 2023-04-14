import axios from "axios";
import { useState, useEffect } from "react";

function SearchEngine() {
  const [cardsList, setCardsList] = useState([]);

  const getAllCards = () => {
    axios
      .get(`https://api.scryfall.com/cards/search?order=name&dir=asc&q=lang:en`)
      .then((response) => {
        setCardsList(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  const displayCard= () =>{


  };

  useEffect(() => {
    getAllCards();
  }, []);

  return (
    <div className="cards-list">
      <h1>Search Engine</h1>
      {cardsList.map((card, index) => {
        return (
          <div key={index}>
            <a href={card.id}>
            <h3>{card.name}</h3>
            {card.image_uris ? (
              <img
                src={card.image_uris.small}
                alt={card.name}
              />
            ) : (
              ""
            )}
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default SearchEngine;
