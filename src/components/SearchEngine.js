import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  FunnelIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

import CardDisplay from "./../components/CardDisplay";

import Select from "react-select";

import types from "../typeList.json";
import { Link } from "react-router-dom";

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
        setNumberOfCard(response.data.total_cards);
        setNumberOfPage(Math.ceil(response.data.total_cards / 175));
        setCardsList([...response.data.data]);
      })
      .catch((error) => console.log(error));
  };

  const displayPagination = () => {
    return (
      <>
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              id="btn-previous"
              disabled={previousDisabled}
              onClick={(e) => handleClick(e)}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              id="btn-next"
              disabled={nextDisabled}
              onClick={(e) => handleClick(e)}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{numberOfCard}</span>{" "}
                cards
              </p>
            </div>
            <div>
              <div className="flex flex-row">
              <p className="text-sm min-w-fit p-2 text-gray-700">Order by :</p>
                <select
                  name="manaCostTypeSearch"
                  onChange={(e) => setOrderType(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="name" default>
                    Name
                  </option>
                  <option value="rarity">Rarity</option>
                  <option value="color">Color</option>
                  <option value="power">Power</option>
                  <option value="cmc">Mana Cost</option>
                </select>
                <button
                  className="text-sm px-2 text-gray-700"
                  onClick={toggleOrderDir}
                >
                  <span className="sr-only"></span>
                  {orderDir === "asc" ? (
                    <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-row">
                  <p className="text-sm p-2 text-gray-700">
                    Filters 
                    <span className="font-medium">
                    </span>
                  </p>
                <button
                  type="button"
                  className="rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                  onClick={() => setOpen(true)}
                >
                  <span className="sr-only">Open panel</span>
                      <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  id="btn-first"
                  disabled={previousDisabled}
                  onClick={(e) => handleClick(e)}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">First</span>
                  <ChevronDoubleLeftIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
                <button
                  id="btn-previous"
                  disabled={previousDisabled}
                  onClick={(e) => handleClick(e)}
                  className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>

                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                  {currentPage} / {numberOfPage}
                </span>

                <button
                  id="btn-next"
                  disabled={nextDisabled}
                  onClick={(e) => handleClick(e)}
                  className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  id="btn-last"
                  disabled={nextDisabled}
                  onClick={(e) => handleClick(e)}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Last</span>
                  <ChevronDoubleRightIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </>
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

  const [open, setOpen] = useState(false);

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
    <div className="w-full ">
      {displayPagination()}

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          Filters
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="">
                          <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <form className="sm:col-span-6">
                              <label
                                htmlFor="last-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Type line
                              </label>
                              <div className="mt-2">
                                <Select
                                  isMulti
                                  options={types}
                                  onChange={(e) => handleSubmitType(e)}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </form>

                            <form className="sm:col-span-6">
                              <legend className="text-sm mb-5 font-semibold leading-6 text-gray-900">
                                Colors
                              </legend>
                              <div className="mt-2">
                                <select
                                  name="colorTypeSearch"
                                  onChange={(e) =>
                                    setTypeColorSearch(e.target.value)
                                  }
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                  <option value="=" default>
                                    Exactly these colors
                                  </option>
                                  <option value=">=">
                                    Including these colors
                                  </option>
                                  <option value="<=">
                                    At most these colors
                                  </option>
                                </select>
                              </div>

                              <fieldset>
                                <div className="mt-6 space-y-6 columns-2">
                                  <div className=" flex h-6 w-1/2 gap-x-3">
                                    <div className="flex h-6 items-center">
                                      <input
                                        type="checkbox"
                                        name="color"
                                        value="U"
                                        onChange={(e) => handleSubmitColor(e)}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      />
                                    </div>
                                    <div className="text-sm leading-6">
                                      <label className=" text-gray-900">
                                        Blue
                                      </label>
                                    </div>
                                  </div>

                                  <div className=" flex h-6 w-1/2 gap-x-3">
                                    <div className="flex h-6 items-center">
                                      <input
                                        type="checkbox"
                                        name="color"
                                        value="R"
                                        onChange={(e) => handleSubmitColor(e)}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      />
                                    </div>
                                    <div className="text-sm leading-6">
                                      <label className=" text-gray-900">
                                        Red
                                      </label>
                                    </div>
                                  </div>

                                  <div className=" flex h-6 w-1/2 gap-x-3">
                                    <div className="flex h-6 items-center">
                                      <input
                                        type="checkbox"
                                        name="color"
                                        value="G"
                                        onChange={(e) => handleSubmitColor(e)}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      />
                                    </div>
                                    <div className="text-sm leading-6">
                                      <label className=" text-gray-900">
                                        Green
                                      </label>
                                    </div>
                                  </div>

                                  <div className=" flex h-6 w-1/2 gap-x-3">
                                    <div className="flex h-6 items-center">
                                      <input
                                        type="checkbox"
                                        name="color"
                                        value="B"
                                        onChange={(e) => handleSubmitColor(e)}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      />
                                    </div>
                                    <div className="text-sm leading-6">
                                      <label className=" text-gray-900">
                                        Black
                                      </label>
                                    </div>
                                  </div>

                                  <div className=" flex h-6 w-1/2 gap-x-3">
                                    <div className="flex h-6 items-center">
                                      <input
                                        type="checkbox"
                                        name="color"
                                        value="W"
                                        onChange={(e) => handleSubmitColor(e)}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      />
                                    </div>
                                    <div className="text-sm leading-6">
                                      <label className=" text-gray-900">
                                        White
                                      </label>
                                    </div>
                                  </div>

                                  <div className=" flex h-6 w-1/2 gap-x-3">
                                    <div className="flex h-6 items-center">
                                      <input
                                        type="checkbox"
                                        name="color"
                                        value="C"
                                        onChange={(e) => handleSubmitColor(e)}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      />
                                    </div>
                                    <div className="text-sm leading-6">
                                      <label className=" text-gray-900">
                                        Colorless
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </fieldset>
                            </form>

                            <form className="col-span-6">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Mana Cost
                              </label>
                              <div className="mt-2 flex">
                                <select
                                  name="manaCostTypeSearch"
                                  onChange={(e) =>
                                    setTypeManaCostSearch(e.target.value)
                                  }
                                  className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                  <option value="=" default>
                                    equal to
                                  </option>
                                  <option value="<">less than</option>
                                  <option value=">">greater than</option>
                                  <option value="<=">
                                    less than or equal to
                                  </option>
                                  <option value=">=">
                                    greater than or equal to
                                  </option>
                                  <option value="!=">not equal to</option>
                                </select>
                                <input
                                  type="number"
                                  name="manaCost"
                                  value={manaCost}
                                  onChange={(e) => setManaCost(e.target.value)}
                                  className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="flex w-full h-[45rem] justify-center flex-wrap overflow-auto hover:overflow-y-scroll">
        <CardDisplay listOfCard={cardsList} />
      </div>
    </div>
  );
}

export default SearchEngine;
