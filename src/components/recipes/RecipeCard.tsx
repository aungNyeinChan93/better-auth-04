import React, { FC } from "react";

interface Props {
  name?: string;
  image?: string;
}

const RecipeCard: FC<Props> = ({ name, image }) => {
  return (
    <React.Fragment>
      <div className="bg-white border border-gray-200 shadow-md w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
        <div className="aspect-[3/2]">
          <img
            src={image || "https://readymadeui.com/Imagination.webp"}
            className="w-full h-full object-cover"
            alt="Card image"
          />
        </div>

        <div className="p-6">
          <h3 className="text-slate-900 text-xl font-semibold">{name}</h3>

          <button
            type="button"
            className="mt-6 px-6 py-2.5 rounded-lg text-white text-sm font-medium tracking-wider border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600 cursor-pointer"
          >
            View
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RecipeCard;
