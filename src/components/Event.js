import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL;

export default function Event({ eventId }) {
  const [event, setEvent] = useState(null);
  console.log(eventId);

  const navigate = useNavigate();

  const getEvent = () => {
    axios
      .get(`${API_URL}/api/events/${eventId}`)
      .then((response) => {
        console.log(response.data);
        setEvent(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <>
      {event ? (
        <>
          <div class="p-4 lg:w-1/3">
            <div class="h-full bg-white bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
              <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                By {event.creator.name}
              </h2>
              <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                {event.name}
              </h1>
              <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                {event.date}
              </h2>
              <p class="leading-relaxed mb-3">{event.description}</p>

              <div className="flex w-full flex-col justify-center">
                <Link
                  to={`/events/${event._id}`}
                  className="m-1 text-center bg-gray-900 text-white hover:bg-gray-700 hover:text-white rounded-md mx-2 px-5 py-2 text-sm font-medium"
                >
                  Details
                </Link>
                <Link
                  to="EVENT PARTICIPATE"
                  className="m-1 text-center bg-gray-900 text-white hover:bg-gray-700 hover:text-white rounded-md mx-2 px-5 py-2 text-sm font-medium"
                >
                  Participate
                </Link>
              </div>
              <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                {event.type}
              </div>
              <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                <span class="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                  {event.date}
                </span>
                <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                  {event.type}
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
