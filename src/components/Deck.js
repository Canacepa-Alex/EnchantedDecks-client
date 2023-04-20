import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL;

export default function Deck({ deckId }) {
  const [deck, setDeck] = useState(null);

  const getDeck = () => {
    axios
      .get(`${API_URL}/api/decks/${deckId}`)
      .then((response) => {
        console.log(response.data);
        setDeck(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getDeck();
  }, []);
  return (
    <>
      <section class="w-full text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            {deck ? (
              <>
                <div class="p-4 lg:w-1/3">
                  <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                    <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                      CATEGORY
                    </h2>
                    <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                    {deck.name}
                    </h1>
                    <p class="leading-relaxed mb-3">
                    {deck.description}
                    </p>
                    <Link
                  key={deck.name}
                  to={`/decks/${deck._id}/edit`}
                  className="w-40 bg-gray-900 text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  EDIT
                </Link>
                    <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                      <span class="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                        <svg
                          class="w-4 h-4 mr-1"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        1.2K
                      </span>
                      <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                        <svg
                          class="w-4 h-4 mr-1"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                        </svg>
                        6
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    </>
  );
}
