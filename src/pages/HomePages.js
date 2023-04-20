
import IsPrivate from "../components/IsPrivate";
import SearchEngine from "../components/SearchEngine";
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import SideBarHomepage from "../components/SidebarHomepage";
import axios from "axios";

export default function HomePage() {
  const [selected, setSelected] = useState(null);
  const [decks, setDecks] = useState(null);
  const { user } = useContext(AuthContext);

  // const getDecks = () => {
  //   axios
  //     .get(`http://localhost:5005/api/users/${user._id}`)
  //     .then((response) => {
  //       setDecks(response.data.decks);
  //       setSelected(response.data.decks[0])
  //       console.log(response.data);
  //     })
  //     .catch((error) => console.log(error));
  // };
  
    
  //   useEffect(() => {
  //       getDecks();
  //   }, []);

  return (
    <div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Cards
          </h1>
        </div>
      </header>
      <main>
        <div className="flex flex-row mx-auto w-screen h-full">
          <div className="flex  h-full w-full items-center justify-center 2xl:w-full tails-selected-element">
            {user ? (
              <div className=" justify-center h-full w-96 bg-gray-300">
                <SideBarHomepage />
              </div>
            ) : (
              ""
            )}

            <div className="flex w-full h-full ">
              <SearchEngine />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
