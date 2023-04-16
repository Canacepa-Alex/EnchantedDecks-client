import axios from "axios";
import { useState, useEffect } from "react";

function SearchEngine() {
  const [cardsList, setCardsList] = useState(null);
  const [numberOfPage, setNumberOfPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [previousDisabled, setPreviousDisabled] = useState("disabled");
  const [nextDisabled, setNextDisabled] = useState("");

  const [colorList, setColorlist] = useState("");

  const getAllCards = () => {
    axios
      .get(
        `https://api.scryfall.com/cards/search?unique=prints&order=name&dir=asc&q=lang:en+&page=${currentPage}`
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
          id="btn-first"
          disabled={previousDisabled}
          onClick={(e) => handleClick(e)}
        >
          First
        </button>
        <button
          id="btn-previous"
          disabled={previousDisabled}
          onClick={(e) => handleClick(e)}
        >
          Previous
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
        <button
          id="btn-last"
          disabled={nextDisabled}
          onClick={(e) => handleClick(e)}
        >
          Last
        </button>
      </div>
    );
  };

  const handleClick = (e) => {
    console.log("e........", e);
    setCardsList(null);
    switch (e.target.id) {
      case "btn-previous":
        console.log("previous");
        pagination(1, e.target.id);
        break;
      case "btn-next":
        console.log("next");
        pagination(1, e.target.id);
        break;
      case "btn-first":
        console.log("first");
        pagination(currentPage - 1, e.target.id);
        break;
      case "btn-last":
        console.log("last");
        pagination(numberOfPage - currentPage, e.target.id);
        break;
      default:
        console.log(`Sorry, we are out.`);
    }
  };

  const pagination = (value, btnId) => {
    console.log("value.......", value);
    if (
      (btnId === "btn-previous" || btnId === "btn-first") &&
      currentPage > 1
    ) {
      console.log("previous2");
      setCurrentPage(currentPage - value);
    } else if (
      (btnId === "btn-next" || btnId === "btn-last") &&
      currentPage < numberOfPage
    ) {
      console.log("next2");
      setCurrentPage(currentPage + value);
    }
  };

  const managePagination = () => {
    console.log("currentPage........", currentPage);
    if (currentPage === 1) {
      setPreviousDisabled("disabled");
      setNextDisabled("");
    } else if (currentPage === numberOfPage) {
      setNextDisabled("disabled");
      setPreviousDisabled("");
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

  const handleSubmitColor = (e) => {
    console.log("handleSubmit e", e);
    if (e.target.checked) {
      setColorlist(colorList + e.target.value);
    } else {
      const colorArray = colorList.split("").filter((element) => element !== e.target.value);
      setColorlist(colorArray.join(''));
      console.log("colorArray.......", colorArray.join(''));
    }
    console.log("colorList.......", colorList);
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
      <div>
        <h3>Selec Color</h3>
        <p>{colorList}</p>
        <form>
          <label>
            Blue
            <input
              type="checkbox"
              name="color"
              value="U"
              onChange={(e) => handleSubmitColor(e)}
            />
          </label>
          <label>
            Red
            <input
              type="checkbox"
              name="color"
              value="R"
              onChange={(e) => handleSubmitColor(e)}
            />
          </label>
          <label>
            Green
            <input
              type="checkbox"
              name="color"
              value="G"
              onChange={(e) => handleSubmitColor(e)}
            />
          </label>
          <label>
            Black
            <input
              type="checkbox"
              name="color"
              value="B"
              onChange={(e) => handleSubmitColor(e)}
            />
          </label>
          <label>
            White
            <input
              type="checkbox"
              name="color"
              value="W"
              onChange={(e) => handleSubmitColor(e)}
            />
          </label>
          <label>
            Colorless
            <input
              type="checkbox"
              name="color"
              value="C"
              onChange={(e) => handleSubmitColor(e)}
            />
          </label>
        </form>
      </div>
      {displayPagination()}
      <div className="cards-section">
        {cardsList ? displayCard() : <p>..loading</p>}
      </div>
    </div>
  );
}

export default SearchEngine;
