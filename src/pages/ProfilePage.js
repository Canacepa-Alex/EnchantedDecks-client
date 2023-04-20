import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import Deck from "../components/Deck";
import { Tab } from "@headlessui/react";

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
    console.log("Deck update ?");
    return userProfile.decks.map((deck, index) => {
      return <Deck deckId={deck._id} key={index} />;
    });
  };
  
  const displayEvents = () => {
    console.log("Deck update ?");
    return userProfile.events.map((event, index) => {
      return <Deck deckId={event._id} key={index} />;
    });
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
          <div className="w-full px-2 py-5 sm:px-0">
            <Tab.Group>
              <Tab.List className="flex max-w-md space-x-1 rounded-md bg-gray-800 p-1">
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

          {/* <section className=" py-16 bg-blueGray-100">
          <div className="container mx-auto px-4 -mt-64">
      <div className=" flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
              <div className="">
                <img
                  alt="..."
                  src={userProfile.imageURL}
                  className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                />
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
              <div className="py-6 px-3 mt-32 sm:mt-0">
                {/* {buttons.map((prop, key) => (
                  <Button {...prop} key={key} />
                ))} 
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4 lg:order-1">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block tracking-wide text-blueGray-700">
                      {userProfile.decks.lenght}
                    </span>
                    <span className="text-sm text-blueGray-500">
                      Decks
                    </span>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block tracking-wide text-blueGray-700">
                      {userProfile.events.lenght}
                    </span>
                    <span className="text-sm text-blueGray-500">
                      Events
                    </span>
                  </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-4xl font-bold leading-tight mb-2 mb-0">
              {userProfile.name}
            </h3>
             {userProfile.description ? (
              <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-500 font-bold uppercase">
                {userProfile.description}
              </div>
            ) : null}
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-300 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                jgvjv
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
        </section> */}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
