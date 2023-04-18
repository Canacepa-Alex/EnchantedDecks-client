import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

  const displayCard = () => {
    return cardsList.map((card, index) => {
      return (
        <div
          key={index}
          className="relative m-2 grid h-[20rem] w-full max-w-[14rem] items-end justify-center overflow-hidden text-center rounded-lg shadow"
        >
          {card.image_uris ? (
            <div
              floated={false}
              shadow={false}
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
                    <Link
                      to="#"
                      className="inline-flex items-center rounded-xl px-4 py-1 text-base font-medium transition duration-200 hover:bg-purple-600 active:bg-purple-700  dark:hover:bg-purple-300 dark:active:bg-purple-200"
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
                    </Link>
                    <Link
                      to="#"
                      className="inline-flex items-center rounded-xl px-4 py-1 text-base font-medium text-white transition duration-200 hover:bg-purple-600 active:bg-purple-700 dark:text-white dark:hover:bg-purple-300 dark:active:bg-purple-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              floated={false}
              shadow={false}
              color="transparent"
              className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center"
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
                    <Link
                      to="#"
                      className="inline-flex items-center rounded-xl px-4 py-1 text-base font-medium transition duration-200 hover:bg-purple-600 active:bg-purple-700 dark:hover:bg-purple-300 dark:active:bg-purple-200"
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
                    </Link>
                    <Link
                      to="#"
                      className="inline-flex items-center rounded-xl px-1 py-2 text-base font-medium text-white transition duration-200 hover:bg-purple-600 active:bg-purple-700 dark:text-white dark:hover:bg-purple-300 dark:active:bg-purple-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    });
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
    orderDir
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
        <div>
          <p>DEV VALUES -TO BE REMOVED</p>
          <br />
          <p>colorList .{colorList}.</p>
          <p>typeColorSearch .{typeColorSearch}.</p>
          <p>ColorSearchParam .{ColorSearchParam}.</p>
          <br />
          <p>manaCost .{manaCost}.</p>
          <p>typeManaCostSearch .{typeManaCostSearch}.</p>
          <p>manaCostSearchParam .{manaCostSearchParam}.</p>
          <br />
          <p>typeSearchParam .{typeSearchParam}.</p>
          <br />
          <p>orderType .{orderType}.</p>
          <p>orderDir .{orderDir}.</p>
          <br />
        </div>

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
        {cardsList ? displayCard() : <p>..loading</p>}
      </div>
      {displayPagination()}
    </div>
  );
}

export default SearchEngine;
