import Navbar from "../components/Navbar";
import IsPrivate from "../components/IsPrivate";
import SearchEngine from "../components/SearchEngine";

export default function HomePage() {
  return (
    <div>
      <Navbar />

      <div className="flex pt-16 space-x-5 w-full h-full items-center justify-center 2xl:w-full tails-selected-element">
        <div className="flex h-full w-96 bg-gray-300 2xl:h-full "> </div>

        <div className="flex h-full w-full bg-gray-300 rounded-md 2xl:w-screen">
          <SearchEngine />
        </div>
      </div>
    </div>
  );
}
