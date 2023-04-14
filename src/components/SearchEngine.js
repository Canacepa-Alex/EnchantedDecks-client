import axios from "axios";
import { useState, useEffect } from "react";

function SearchEngine() {
  const [cardsList, setCardsList] = useState([]);

  const getAllCards = () => {
    axios
      .get(`https://api.magicthegathering.io/v1/cards?`)
      .then((response) => {
        console.log(response.data.cards);
        setCardsList(response.data.cards);
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
            <h3>{card.name}</h3>
            <img src={card.imageUrl} alt={card.name} />
          </div>
        );
      })}
    </div>
  );
}

export default SearchEngine;
