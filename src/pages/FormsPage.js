import { useParams } from "react-router";
import DeckCreation from "../components/Forms/DeckCreation";
import DeckEdit from "../components/Forms/DeckEdit";
import EventCreation from "../components/Forms/EventCration";
import EventEdit from "../components/Forms/EventEdit";

export default function FormsPage() {
  const { form } = useParams();
  const headerText = () => {
    if (form === "deckCreate") {
      return "Create your deck";
    } else if (form === "deckEdit") {
      return "Update your deck";
    } else if (form === "eventCreate") {
      return "Create your event";
    } else if (form === "eventEdit") {
      return "Update your event";
    }
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {headerText()}
          </h1>
        </div>
      </header>
      {form === "deckCreate" && <DeckCreation />}
      {form === "deckEdit" && <DeckEdit />}
      {form === "eventCreate" && <EventCreation />}
      {form === "eventEdit" && <EventEdit />}
    </>
  );
}
