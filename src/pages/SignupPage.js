import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const API_URL = process.env.REACT_APP_SERVER_URL;

export default function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-lg pt-16 mx-auto sm:max-w-md">
          <h1 className="text-3xl font-bold text-center text-primary-500">
            Get started today
          </h1>
          <p className="max-w-md mx-auto mt-4 text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
            sunt dolores deleniti inventore quaerat mollitia?
          </p>
          <div className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl dark:shadow-slate-800">
            <p className="text-lg font-medium">Sign in to your account</p>
            <form
              className="flex flex-col gap-y-3"
              onSubmit={handleSignupSubmit}
            >
              <div>
                <label className="text-sm font-medium">
                  <p>Username</p>
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
                  <p>Email</p>
                </label>
                <div className="relative mt-1">
                  <input
                    className="w-full p-3 pr-12 text-sm shadow-sm border border-gray-200 rounded-global"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
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
                  <p>Password</p>
                </label>
                <div className="relative mt-1">
                  <input
                    className="w-full p-3 pr-12 text-sm shadow-sm border border-gray-200 rounded-global"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
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
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
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
                Sign up
              </button>
              { errorMessage && <p className="error-message">{errorMessage}</p> }
            </form>
            <div className="flex items-center gap-x-1.5 justify-center">
              <p className="text-sm text-center text-gray-500">Already have an account? </p>
              <Link className="underline text-sm" to="/login">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
