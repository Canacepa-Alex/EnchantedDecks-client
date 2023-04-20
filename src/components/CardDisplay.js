import { Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import CardDetail from "./CardDetails";

function CardDisplay(props) {
  const [openModalId, setOpenModalId] = useState(null);
  console.log("PROPS", props);
  const handleOpenModal = (id) => {
    setOpenModalId(id);
  };

  const handleCloseModal = () => {
    setOpenModalId(null);
  };

  const displayCard = () => {
    return props.listOfCard.map((card, index) => {
      return (
        <>
          <div
            key={index}
            className="relative m-2 grid h-[20rem] w-full max-w-[14rem] items-end justify-center text-center rounded-lg shadow"
          >
            <div
              color="transparent"
              className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
              style={{
                backgroundImage: card.image_uris
                  ? `url(${card.image_uris.border_crop})`
                  : "",
              }}
            >
              <div className="to-bg-black-10 absolute inset-0 h-full w-full hover:bg-gradient-to-t from-black/80 via-black/50">
                <div className="flex flex-col justify-between h-full w-full py-8 px-6 md:px-12 text-transparent hover:text-white dark:hover:text-white">
                  <div
                    variant="h2"
                    color="white"
                    className="mb-2 text-2xl font-bold tracking-tight"
                  >
                    {card.name}
                  </div>
                  <div className="mb-4 flex">
                    <button
                      type="button"
                      onClick={() => handleOpenModal(card.id)}
                      className="inline-flex items-center rounded-md px-4 py-1 text-base font-medium transition duration-200 hover:bg-purple-600 active:bg-purple-700  dark:hover:bg-purple-300 dark:active:bg-purple-200"
                      id={card.id}
                    >
                      Details
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 ml-2 -mr-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="mb-4 flex">
                    {props.handleClick && (
                      <button
                        onClick={(e) => props.handleClick(e.target.id)}
                        className="inline-flex items-center rounded-xl px-4 py-1 text-base font-medium transition duration-200 hover:bg-purple-600 active:bg-purple-700  dark:hover:bg-purple-300 dark:active:bg-purple-200"
                        id={card.id}
                      >
                        Add to Deck
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 ml-2 -mr-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {openModalId === card.id && (
            <Transition.Root show={true}>
              <Transition.Child>
                <div className="fixed w-screen h-screen inset-0 z-10 bg-gray-500 bg-opacity-50" />
              </Transition.Child>

              <div className="fixed h-screen inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <div className="relative transform rounded-md bg-white text-left shadow-xl transition-all sm:my-8 h-auto">
                      <CardDetail cardId={card.id} />
                      <div className="bg-gray-50 rounded-md px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={handleCloseModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </div>
            </Transition.Root>
          )}
        </>
      );
    });
  };

  return <>{props.listOfCard ? displayCard() : <p>..loading</p>}</>;
}

export default CardDisplay;
