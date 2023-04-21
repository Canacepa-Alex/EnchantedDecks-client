import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import Deck from "../components/Deck";
import { Tab } from "@headlessui/react";

const API_URL = process.env.REACT_APP_SERVER_URL;

export default function DecksList(props) {
  const { userId } = useParams();
  const { user } = useContext(AuthContext);
  const [allDecks, setAllDecks] = useState(null);

  const getDecks = () => {
    axios
      .get(`${API_URL}/api/decks`)
      .then((response) => {
        setAllDecks(response.data);
      })
      .catch((error) => console.log(error));
  };

  const displayDecks = () => {
    return (
      <section class=" text-gray-600 h-[48.8rem] overflow-auto hover:overflow-y-scroll body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            {allDecks.map((deck, index) => {
              return <Deck deckId={deck._id} key={index} />;
            })}
          </div>
        </div>
      </section>
    );
  };



  useEffect(() => {
    getDecks();
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="flex flex-row items-center text-3xl font-bold tracking-tight text-gray-900">
            Decks
          </h1>
        </div>
      </header>
      {allDecks && displayDecks()}
      
    </>
  );
}
