import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import Deck from "../components/Deck";
import { Tab } from "@headlessui/react";
import Event from "../components/Event";
import { CLOSING } from "ws";

const API_URL = process.env.REACT_APP_SERVER_URL;

export default function Profile(props) {
  const { userId } = useParams();
  const { user } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);

  const [deckName, setDeckName] = useState(null);
  const [deckDescription, setDeckDescription] = useState(null);
  const getUser = () => {
    axios
      .get(`${API_URL}/api/users/${userId}`)
      .then((response) => {
        setUserProfile(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getCurrentUser = () => {};

  const displayDecks = () => {
    return (
      <section class=" text-gray-600 h-[43rem] overflow-auto hover:overflow-y-scroll body-font">
          <Link
            to={`/forms/deckCreate`}
            className="flex justify-center text-center bg-gray-900 text-white hover:bg-gray-700 hover:text-white rounded-md my-10 mx-2 px-5 py-2 text-sm font-medium"
          >
            Create a deck
          </Link>
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            {userProfile.decks.map((deck, index) => {
              return <Deck deckId={deck._id} key={index} />;
            })}
          </div>
        </div>
      </section>
    );
  };

  const displayEvents = () => {
    return (
      <section class=" text-gray-600 h-[43rem] overflow-auto hover:overflow-y-scroll body-font">
          <Link
            to={`/forms/deckCreate`}
            className="flex justify-center text-center bg-gray-900 text-white hover:bg-gray-700 hover:text-white rounded-md my-10 mx-2 px-5 py-2 text-sm font-medium"
          >
            Create a deck
          </Link>
        <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">
            {userProfile.events.map((event, index) => {
                console.log(event._id)
              return <Event eventId={event._id} key={index} />;
            })}
          </div>
        </div>
      </section>
    );
  };

  const handleSubmit = (element) => {
    element.preventDefault();
    const newDeck = {
      name: deckName,
      description: deckDescription,
      user: userId,
    };
    const storedToken = localStorage.getItem("authToken");
    axios
      .post(API_URL + "/api/decks", newDeck, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {});
  };

  const [categories, setCategories] = useState({
    Decks: "NO DATA",
    Events: "NO DATA",
  });

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (userProfile) {
      setCategories({
        Decks: displayDecks(),
        Events: displayEvents(),
      });
    }
  }, [userProfile]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="flex flex-row items-center text-3xl font-bold tracking-tight text-gray-900">
            {userProfile ? (
              <>
                <img
                  alt="..."
                  src={userProfile.imageURL}
                  className="rounded-full h-10 w-10 mr-5"
                />
                <span>{userProfile.name}</span>{" "}
              </>
            ) : (
              ""
            )}
          </h1>
        </div>
      </header>

      {userProfile ? (
        <div className="flex justify-center ">
          <div className="w-full px-2 sm:px-0">
            <Tab.Group>
              <Tab.List className="flex w-full justify-center items-center space-x-1 rounded-md bg-gray-700 p-1">
                {Object.keys(categories).map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-md py-2.5 text-sm font-medium leading-5",
                        selected
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      )
                    }
                  >
                    {category}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-2 w-full">
                {Object.values(categories).map((posts, idx) => (
                  <Tab.Panel
                    key={idx}
                    className={classNames(
                      "rounded-xl bg-white p-3",
                      "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                    )}
                  >
                    <ul>{posts}</ul>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
}
