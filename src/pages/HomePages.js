import Navbar from "../components/Navbar";
import IsPrivate from "../components/IsPrivate";
import SearchEngine from "../components/SearchEngine";

export default function HomePage() {
  return (
    <div>
      <Navbar />

      <div
        className="flex pt-16 space-x-5 w-full h-full items-center justify-center 2xl:w-full tails-selected-element"
        data-dashlane-rid="f889e1c10e691a4a"
        data-form-type=""
        contenteditable="true"
      >

        <div
          className="flex h-full w-96 bg-gray-300 2xl:h-full "
          data-dashlane-rid="24f5db7738b269a5"
          data-form-type=""
        > </div>

        <div
          className="flex h-full w-full bg-gray-300 rounded-md 2xl:w-screen"
          data-dashlane-rid="bc6b54a782e1f073"
        ><SearchEngine /></div>
      </div>
    </div>
  );
}
