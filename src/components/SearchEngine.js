import axios from "axios";
import { useState, useEffect } from "react";

function SearchEngine() {
  const [cardsList, setCardsList] = useState(null);
  const [numberOfPage, setNumberOfPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [previousDisabled, setPreviousDisabled] = useState("disabled");
  const [nextDisabled, setNextDisabled] = useState("");

  const getAllCards = () => {
    axios
      .get(
        `https://api.scryfall.com/cards/search?order=name&dir=asc&q=lang:en&page=${currentPage}`
      )
      .then((response) => {
        console.log("response:.........", response.data);
        setNumberOfPage(Math.ceil(response.data.total_cards / 175));
        setCardsList([...response.data.data]);
      })
      .catch((error) => console.log(error));
  };

  const displayPagination = () => {
    return (
      <div className="pagination">
        <button
          id="btn-previous"
          disabled={previousDisabled}
          onClick={(e) => handleClick(e)}
        >
          previous
        </button>
        <span>
          {currentPage}/{numberOfPage}
        </span>
        <button
          id="btn-next"
          disabled={nextDisabled}
          onClick={(e) => handleClick(e)}
        >
          Next
        </button>
      </div>
    );
  };

  const handleClick = (e) => {
    switch (e.target.id) {
      case "btn-previous":
        console.log("previous");
        pagination(1, e.target.id);
        break;
      case "btn-next":
        console.log("next");
        pagination(1, e.target.id);

        break;
      default:
        console.log(`Sorry, we are out.`);
    }
    console.log("e........", e);
  };

  const pagination = (value, btnId) => {
    console.log("value.......", value);
    if ((btnId === "btn-previous") & (currentPage > 1)) {
      console.log("previous2");
      setCurrentPage(currentPage - value);
    } else if ((btnId === "btn-next") & (currentPage < numberOfPage)) {
      console.log("next2");
      setCurrentPage(currentPage + value);
    }
  };

  const managePagination = () => {
    if (currentPage === 1) {
      setPreviousDisabled("disabled");
    } else if (currentPage === numberOfPage){
      setNextDisabled("disabled");
    } else {
      setPreviousDisabled("");
      setNextDisabled("");
    }

  };

  const displayCard = () => {
    return cardsList.map((card, index) => {
      return (
        <div key={index}>
          <a href={card.id}>
            <h3>{card.name}</h3>
            {card.image_uris ? (
              <img src={card.image_uris.small} alt={card.name} />
            ) : (
              ""
            )}
          </a>
        </div>
      );
    });
  };

  useEffect(() => {
    getAllCards();
  }, []);

  useEffect(() => {
    getAllCards();
    managePagination();
  }, [currentPage]);

  return (
    <div className="cards-list">
      <h1>Search Engine</h1>
      {displayPagination()}
      <div className="cards-section">
        {cardsList ? displayCard() : <p>..loading</p>}
      </div>
    </div>
  );
}

export default SearchEngine;
