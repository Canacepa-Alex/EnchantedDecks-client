import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import Event from "../components/Event";
import { Tab } from "@headlessui/react";

const API_URL = process.env.REACT_APP_SERVER_URL;

export default function EventsList() {
  const [allEvents, setAllEvents] = useState(null);

  const getEvents = () => {
    axios
      .get(`${API_URL}/api/events`)
      .then((response) => {
        setAllEvents(response.data);
      })
      .catch((error) => console.log(error));
  };

  const displayEvents = () => {
    return (
      <section class=" text-gray-600 h-[48.8rem] overflow-auto hover:overflow-y-scroll body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            {allEvents.map((event, index) => {
              return <Event eventId={event._id} key={index} />;
            })}
          </div>
        </div>
      </section>
    );
  };

  useEffect(() => {
    getEvents();
  }, []);

  

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="flex flex-row items-center text-3xl font-bold tracking-tight text-gray-900">
            Events
          </h1>
        </div>
      </header>
      {allEvents && displayEvents()}
    </>
  );
}
