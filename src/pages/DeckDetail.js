import IsPrivate from "../components/IsPrivate";
import { Link, useParams } from "react-router-dom";

import DeckDisplay from "../components/DeckDisplay";

export default function DeckDetail() {
  const { deckId } = useParams();
  

  return (
    <div>
      <div className="flex pt-16 space-x-5 w-full h-full items-center justify-center 2xl:w-full tails-selected-element">
        <div className="flex h-full w-96 bg-gray-300 2xl:h-full "> </div>
        <DeckDisplay deckId={deckId} display="card"/>
      </div>
    </div>
  );
}
