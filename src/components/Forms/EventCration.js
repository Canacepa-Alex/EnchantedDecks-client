import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

const API_URL = "http://localhost:5005";

export default function EventCreation() {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [position, setPosition] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleDate = (e) => setDate(e.target.value);
  const handleType = (e) => setType(e.target.value);
  const handlePosition = (e) => setPosition(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { description, name, position, date };

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/api/events`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate(`/decks/${response.data.event._id}`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };
  return (
    <div>
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-lg pt-16 mx-auto sm:max-w-md">
          <div className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl dark:shadow-slate-800">
            <form
              className="flex flex-col gap-y-3"
              onSubmit={handleSignupSubmit}
            >
              <div>
                <label className="text-sm font-medium">
                  <p>Name</p>
                </label>
                <div className="relative mt-1">
                  <input
                    className="w-full p-3 pr-12 text-sm shadow-sm border border-gray-200 rounded-global"
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleName}
                  />
                  <span className="absolute inset-y-0 inline-flex items-center right-4">
                    <span className="w-fit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    </span>
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">
                  <p>Description</p>
                </label>
                <div className="relative mt-1">
                  <input
                    className="w-full p-3 pr-12 text-sm shadow-sm border border-gray-200 rounded-global"
                    type="textarea"
                    name="description"
                    value={description}
                    onChange={handleDescription}
                  />
                  <span className="absolute inset-y-0 inline-flex items-center right-4">
                    <span className="w-fit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-400"
                      >
                        <path
                          strokeLinecap="round"
                          d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                        />
                      </svg>
                    </span>
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">
                  <p>Date</p>
                </label>
                <div className="relative mt-1">
                  <input
                    className="w-full p-3 pr-12 text-sm shadow-sm border border-gray-200 rounded-global"
                    type="date"
                    name="date"
                    value={date}
                    onChange={handleDate}
                  />
                  <span className="absolute inset-y-0 inline-flex items-center right-4">
                    <span className="w-fit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-400"
                      >
                        <path
                          strokeLinecap="round"
                          d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                        />
                      </svg>
                    </span>
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">
                  <p>Type</p>
                </label>
                <div className="relative mt-1">
                  <input
                    className="w-full p-3 pr-12 text-sm shadow-sm border border-gray-200 rounded-global"
                    type="text"
                    name="type"
                    value={type}
                    onChange={handleType}
                  />
                  <span className="absolute inset-y-0 inline-flex items-center right-4">
                    <span className="w-fit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-400"
                      >
                        <path
                          strokeLinecap="round"
                          d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                        />
                      </svg>
                    </span>
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">
                  <p>Position</p>
                </label>
                <div className="relative mt-1">
                  <input
                    className="w-full p-3 pr-12 text-sm shadow-sm border border-gray-200 rounded-global"
                    type="text"
                    name="position"
                    value={position}
                    onChange={handlePosition}
                  />
                  <span className="absolute inset-y-0 inline-flex items-center right-4">
                    <span className="w-fit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-400"
                      >
                        <path
                          strokeLinecap="round"
                          d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                        />
                      </svg>
                    </span>
                  </span>
                </div>
              </div>

              <button
                className="block w-full px-5 py-3 text-sm font-medium text-white bg-blue-500 rounded-global mt-3 hover:bg-blue-700"
                type="submit"
              >
                Create
              </button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
