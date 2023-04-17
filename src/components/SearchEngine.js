import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
          <div key={index} className="relative m-2 grid h-[20rem] w-full max-w-[14rem] items-end justify-center overflow-hidden text-center rounded-lg shadow">
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

  useEffect(() => {
    getAllCards();
  }, []);

  useEffect(() => {
    getAllCards();
    managePagination();
  }, [currentPage]);
  
  return (
    <div className="">
      <h1>Search Engine</h1>
      {displayPagination()}
      <div className="flex justify-center flex-wrap overflow-scroll">
      {cardsList ? displayCard() : <p>..loading</p>}
      </div>
      {displayPagination()}
    </div>
  );
}

export default SearchEngine;
