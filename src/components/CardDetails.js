import axios from "axios";
import { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import DeckDisplay from "../components/DeckDisplay";

import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

const API_URL = `https://api.scryfall.com/cards/`;

export default function CardDetail({ cardId }) {
  const [cardDetail, setCardDetail] = useState(null);

  const getDeck = () => {
    axios
      .get(`${API_URL}/${cardId}`)
      .then((response) => {
        setCardDetail(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getDeck();
  }, []);

  return (
    <div>
      {cardDetail && (
        <>
          <div class="flex h-full font-sans rounded-md">
            <div class="flex-none  p-2 w-96 min-h-max relative">
              <img
                src={cardDetail.image_uris.large}
                alt=""
                class=" w-full h-full object-cover rounded-md"
                loading="lazy"
              />
            </div>
            <div class="flex-auto p-6">
              <div class="flex flex-wrap">
                <h1 class="flex-auto text-lg font-semibold text-slate-900">
                {cardDetail.name}
                </h1>
                <div class="text-lg font-semibold text-slate-500">Mana: {cardDetail.mana_cost}</div>
                <div class="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                {cardDetail.type_line}
                </div>
              </div>
              <div class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
                
              </div>
              <p class="text-sm text-slate-700">
              {cardDetail.oracle_text}
              </p>
            </div>
          </div>
          

          <div className="flex pt-16 space-x-5 w-full h-full items-center justify-center 2xl:w-full tails-selected-element">
            <div className="flex h-full w-96 bg-gray-300 2xl:h-full "></div>
          </div>
        </>
      )}
    </div>
  );
}
