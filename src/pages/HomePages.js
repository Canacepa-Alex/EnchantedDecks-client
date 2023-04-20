
import IsPrivate from "../components/IsPrivate";
import SearchEngine from "../components/SearchEngine";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import SideBarHomepage from "../components/SidebarHomepage";

export default function HomePage() {
  const { user } = useContext(AuthContext);

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
        <div className="mx-auto h-full">
          <div className="flex space-x-5 h-full w-full items-center justify-center 2xl:w-full tails-selected-element">
            {user ? (
              <div className=" justify-center h-full w-96 bg-gray-300">
                {" "}
                <SideBarHomepage />{" "}
              </div>
            ) : (
              ""
            )}

            <div className="flex w-full h-full bg-gray-300 rounded-md 2xl:w-screen ">
              <SearchEngine />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
