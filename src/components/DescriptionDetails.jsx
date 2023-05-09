import React, { useState } from "react";

const DescriptionDetails = ({ details }) => {
  const [showFullText, setShowFullText] = useState("false");

  const toggleButton = () => {
    setShowFullText(!showFullText);
  };

  const publishedDate = new Date(details?.snippet?.publishedAt);
  const options = { month: "short", day: "numeric", year: "numeric" };
  const finalDate = publishedDate.toLocaleString("en-US", options);

  const viewFun = view => {
    return view < 1000
      ? view
      : view > 1000 && view < 1000000
      ? (view / 1000).toFixed(0) + "K"
      : (view / 1000000).toFixed(1) + "M";
  };
  return (
    <div>
      <div className="w-full rounded-xl bg-gray-400 py-2 px-3">
        <div className="w-full">
          <div className="flex flex-row space-x-4 font-bold text-white">
            <p>{viewFun(details?.statistics?.viewCount)} Views</p>
            <p>Uploaded on {finalDate}</p>
          </div>
          <div className="overflow-hidden">
            <p className=" font-bold leading-snug text-gray-950">
              {!showFullText
                ? details?.snippet?.description
                : `${details?.snippet?.description.slice(0, 100)}...`}
            </p>
            <button
              onClick={toggleButton}
              className="mt-2 font-bold text-blue-800 hover:text-blue-700 focus:outline-none"
            >
              {showFullText ? "Show More" : "Show Less"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionDetails;
