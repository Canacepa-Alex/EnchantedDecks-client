import axios from "axios";
import { useState, useEffect } from "react";

import CardDisplay from "./../components/CardDisplay";

import Select from "react-select";

import types from "../typeList.json";

function SearchEngine() {
  const [cardsList, setCardsList] = useState(null);

  const [numberOfCard, setNumberOfCard] = useState(null);
  const [numberOfPage, setNumberOfPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [previousDisabled, setPreviousDisabled] = useState("disabled");
  const [nextDisabled, setNextDisabled] = useState("disabled");

  const [orderType, setOrderType] = useState("name");
  const [orderDir, setOrderDir] = useState("asc");

  const [colorList, setColorlist] = useState(""); //store the list of color
  const [typeColorSearch, setTypeColorSearch] = useState("="); // store how the list of color will be searched = <= >=
  const [ColorSearchParam, setColorSearchParam] = useState(""); // mix colorList & ColorSearchParam for the query

  const [manaCost, setManaCost] = useState(null); //store the mana cost value
  const [typeManaCostSearch, setTypeManaCostSearch] = useState("="); // store how mana cost will be searched = <= >=
  const [manaCostSearchParam, setManaCostSearchParam] = useState(""); // mix manaCost & typeManaCostSearch for the query

  const [typeSearchParam, setTypeSearchParam] = useState(""); // join the response array from selec and used for query

  const getAllCards = () => {
    axios
      .get(
        `https://api.scryfall.com/cards/search?unique=prints&order=${orderType}&dir=${orderDir}&q=game=paper+lang:en+${ColorSearchParam}+${typeSearchParam}+${manaCostSearchParam}&page=${currentPage}`
      )
      .then((response) => {
        console.log("response:.........", response.data);
        setNumberOfCard(response.data.total_cards);
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
    switch (e.target.id) {
      case "btn-previous":
        pagination(1, e.target.id);
        break;
      case "btn-next":
        pagination(1, e.target.id);
        break;
      case "btn-first":
        pagination(currentPage - 1, e.target.id);
        break;
      case "btn-last":
        pagination(numberOfPage - currentPage, e.target.id);
        break;
      default:
        console.log(`Sorry, we are out.`);
    }
  };

  const pagination = (value, btnId) => {
    if (
      (btnId === "btn-previous" || btnId === "btn-first") &&
      currentPage > 1
    ) {
      setCurrentPage(currentPage - value);
    } else if (
      (btnId === "btn-next" || btnId === "btn-last") &&
      currentPage < numberOfPage
    ) {
      setCurrentPage(currentPage + value);
    }
  };

  const managePagination = () => {
    console.log("numberOfCard.......", numberOfCard);
    if (numberOfCard <= 175) {
      setPreviousDisabled("disabled");
      setNextDisabled("disabled");
    } else if (currentPage === 1) {
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

  const handleSubmitColor = (e) => {
    if (e.target.checked) {
      setColorlist(colorList + e.target.value);
    } else {
      const colorArray = colorList
        .split("")
        .filter((element) => element !== e.target.value);
      setColorlist(colorArray.join(""));
    }
  };

  const createColorSearchParam = () => {
    if (colorList !== "") {
      setColorSearchParam("color" + typeColorSearch + colorList);
    } else {
      setColorSearchParam("");
    }
  };

  const handleSubmitType = (e) => {
    let result = e.map((a) => a.value.toLowerCase()).join("+type=");
    if (result === "") {
      setTypeSearchParam("");
    } else {
      setTypeSearchParam("type=" + result);
    }
  };

  const createManaCostSearchParam = () => {
    if (manaCost === "" || manaCost === null) {
      setManaCostSearchParam("");
    } else {
      setManaCostSearchParam("cmc" + typeManaCostSearch + manaCost);
    }
  };

  const toggleOrderDir = () => {
    if (orderDir === "asc") {
      setOrderDir("desc");
    } else {
      setOrderDir("asc");
    }
  };

  useEffect(() => {
    getAllCards();
  }, []);

  useEffect(() => {
    setCardsList(null);
    getAllCards();
    managePagination();
  }, [
    currentPage,
    numberOfCard,
    ColorSearchParam,
    typeSearchParam,
    manaCostSearchParam,
    orderType,
    orderDir,
  ]);

  useEffect(() => {
    createColorSearchParam();
  }, [typeColorSearch, colorList]);

  useEffect(() => {
    createManaCostSearchParam();
  }, [manaCost, typeManaCostSearch]);

  return (
    <div className="cards-list">
      <h1>Search Engine</h1>
      <div>
        <form>
          <span>Mana Cost</span>
          <select
            name="manaCostTypeSearch"
            onChange={(e) => setTypeManaCostSearch(e.target.value)}
          >
            <option value="=" default>
              equal to
            </option>
            <option value="<">less than</option>
            <option value=">">greater than</option>
            <option value="<=">less than or equal to</option>
            <option value=">=">greater than or equal to</option>
            <option value="!=">not equal to</option>
          </select>
          <label>
            <input
              type="number"
              name="manaCost"
              value={manaCost}
              onChange={(e) => setManaCost(e.target.value)}
            />
          </label>
        </form>
        <form>
          <span>Type Line</span>
          <Select
            isMulti
            options={types}
            onChange={(e) => handleSubmitType(e)}
          />
        </form>
        <form>
          <span>Mana Color</span>
          <select
            name="colorTypeSearch"
            onChange={(e) => setTypeColorSearch(e.target.value)}
          >
            <option value="=" default>
              Exactly these colors
            </option>
            <option value=">=">Including these colors</option>
            <option value="<=">At most these colors</option>
          </select>
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
      <span>Order By:</span>
      <select
        name="manaCostTypeSearch"
        onChange={(e) => setOrderType(e.target.value)}
      >
        <option value="name" default>
          Name
        </option>
        <option value="rarity">Rarity</option>
        <option value="color">Color</option>
        <option value="power">Power</option>
        <option value="cmc">Mana Cost</option>
      </select>
      <button onClick={toggleOrderDir}>Toggle Order {orderDir}</button>
      <p>number of cards: {numberOfCard}</p>
      {displayPagination()}
      <div className="flex justify-center flex-wrap overflow-scroll">
        <CardDisplay listOfCard={cardsList} />
      </div>
      {displayPagination()}
    </div>
  );
}

export default SearchEngine;
