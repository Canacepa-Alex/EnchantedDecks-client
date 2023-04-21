import axios from "axios";
import { useState, useEffect } from "react";

import IsPrivate from "../components/IsPrivate";
import { Link, useNavigate, useParams } from "react-router-dom";

import DeckDisplay from "../components/DeckDisplay";

import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import CardDisplay from "../components/CardDisplay";

const API_URL = process.env.REACT_APP_SERVER_URL;

export default function EventDetail() {
  const { eventId } = useParams();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [eventDetail, seteventDetail] = useState(null);

  const getDeck = () => {
    axios
      .get(`${API_URL}/api/events/${eventId}`)
      .then((response) => {
        seteventDetail(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("authToken");

    axios
      .delete(`${API_URL}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate(`/profile/${user._id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const displayButtons = () => {
    if (user && eventDetail) {
      if (user._id === eventDetail.creator._id) {
        return (
          <div className="flex w-full flex-col justify-center">
            <Link
              key={eventDetail.name}
              to={`/forms/eventEdit/${eventDetail._id}`}
              className="m-1 text-center bg-gray-900 text-white hover:bg-gray-700 hover:text-white rounded-md mx-2 px-5 py-2 text-sm font-medium"
            >
              Edit details
            </Link>
            <button
              onClick={""}
              className="m-1 text-center bg-gray-900 text-white hover:bg-gray-700 hover:text-white rounded-md mx-2 px-5 py-2 text-sm font-medium"
            >
              Delete
            </button>
          </div>
        );
      }
    }
  };

  const displayDeck = () => {
    return (
      <>
        <header className="bg-white shadow">
          <div className=" flex flex-row justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {eventDetail.name}
            </h1>

            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              Made by: {eventDetail.creator.name}
            </h1>
          </div>
        </header>
        <div className="flex flex-row mx-auto w-screen h-full">
          <div className="flex  h-full w-full items-center justify-center 2xl:w-full tails-selected-element">
            <div className=" justify-center h-full w-96 bg-gray-300">
            <div className="h-[48.8rem] ">
              <div className=" w-96 sm:flex ">
              {displayButtons()}
              </div>
              <p className="font-bold p-5">{eventDetail.description}</p>
            </div>
            </div>

            <div className="flex w-full h-full ">
              <div className="w-full ">
                <div className="flex w-full h-[45rem] justify-center flex-wrap overflow-auto hover:overflow-y-scroll">
                  Participants :
                  {/* DISPLAY PARTICIPANTS */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  useEffect(() => {
    getDeck();
  }, []);

  useEffect(() => {
    displayButtons();
  }, [eventDetail, user]);

  return <div>{eventDetail && <>{displayDeck()}</>}</div>;
}
