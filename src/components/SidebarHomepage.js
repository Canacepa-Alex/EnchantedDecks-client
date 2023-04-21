import { Fragment, useContext, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_SERVER_URL;

export default function SideBarHomepage() {
  const [selected, setSelected] = useState(null);
  const [decks, setDecks] = useState(null);
  const { user } = useContext(AuthContext);

  const getDecks = () => {
    axios
      .get(`${API_URL}/api/users/${user._id}`)
      .then((response) => {
        setDecks(response.data.decks);
        setSelected(response.data.decks[0]);
      })
      .catch((error) => console.log(error));
  };

  const getNumberOfCards = (cards) => {
    let numberOfCards = 0;
    cards.map((card) => {
      return (numberOfCards += card.numberOfCard);
    });
    return numberOfCards;
  };

  useEffect(() => {
    getDecks();
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const displayDecksList = () => {
    return (
      <ul role="list" className="m-3 divide-y divide-gray-900 ">
        {decks.map((deck) => (
          <li key={deck._id} className="flex bg-white rounded-md justify-between gap-x-6 py-5">
            <div className="flex m-1 gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={deck.imageUrl}
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {deck.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {getNumberOfCards(deck.cards)} cards
                </p>
              </div>
            </div>
            <div className="hidden  m-1 sm:flex sm:flex-col sm:items-end">
              <Link
                key={deck.name}
                to={`/decks/${deck._id}/edit`}
                className="bg-gray-900 text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                Edit cards
              </Link>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="h-[48.8rem] ">
      <div className=" sm:flex sm:flex-col">
        <Link
          to="/forms/deckCreate"
          className="bg-gray-900 text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 m-3 text-lg font-medium"
        >
          Create Deck
        </Link>
      </div>
      {decks ? displayDecksList() : ""}
    </div>
  );
}
