import React, { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_API } from "../utils/Constant";
import { YOUTUBE_SEARCHED_VIDEO_API } from "../utils/Constant";
import { GOOGLE_API_KEY } from "../utils/Constant";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SearchContainer = () => {
  const [queryParams] = useSearchParams([]);
  const searchQuery = queryParams.get("q");
  const [searchedVideo, setSearchVideo] = useState([]);

  useEffect(() => {
    searchData();
  }, [searchQuery]);

  const searchData = async () => {
    const data = await fetch(
      YOUTUBE_SEARCHED_VIDEO_API + searchQuery + "&key=" + GOOGLE_API_KEY
    );
    const json = await data.json();
    console.log(json.items);
    setSearchVideo(json.items);
  };

  return !searchedVideo ? null : (
    <div className="mt-10 mx-4 w-full">
      <div className="flex flex-col">
        <p className="text-black text-xl">
          You searched for
          <span className="font-bold text-2xl"> {searchQuery}</span>
        </p>
        <span className="border border-gray-300 w-full mt-2"></span>
        <div className="mt-3 w-1/2">
          <p className="text-lg font-semibold">Latest from {searchQuery}</p>
          {searchedVideo.map((searchV, index) => {
            return (
              searchV.id.kind === "youtube#video" && (
                <Link
                  key={searchV?.id?.videoId + index}
                  to={"/watch?v=" + searchV?.id?.videoId}
                >
                  <SearchDetails
                    key={searchV?.id?.videoId + index}
                    vidInfo={searchV}
                  />
                </Link>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SearchDetails = ({ vidInfo }) => {
  let sliceValue;
  if ("sm:max-w-50 md:max-w-300".includes("md:max-w-300")) {
    sliceValue = 300;
  } else {
    sliceValue = 50;
  }
  const viewFun = view => {
    return view < 1000
      ? view
      : view > 1000 && view < 1000000
      ? (view / 1000).toFixed(0) + "K"
      : (view / 1000000).toFixed(1) + "M";
  };
  console.log(vidInfo);
  return (
    <>
      <div className="mt-7 w-full md:hover:shadow-md py-4 px-2 mb-3">
        <div className="flex space-x-3 container w-full">
          <img
            className=" w-[250px] h-[200px] rounded-xl md:w-[500px] md:h-[200px]"
            src={vidInfo?.snippet?.thumbnails?.high?.url}
            alt=""
          />
          <div className="flex flex-col space-y-3 container">
            <h3
              className="font-bold text-xl w-full line-clamp-2
          "
            >
              {vidInfo?.snippet?.title}
            </h3>
            <span className="flex space-x-1 items-center">
              <img
                className="w-10 h-10 rounded-full"
                src={vidInfo?.snippet?.thumbnails?.high?.url}
                alt=""
              />
              <p className="text-lg font-semibold">
                {vidInfo?.snippet?.channelTitle}
              </p>
            </span>

            <p className="line-clamp-3 text-lg">
              {`${vidInfo?.snippet?.description.slice(0, sliceValue)}...`}
            </p>
          </div>
        </div>
      </div>
      <div className="border border-gray-300 mt-3 mb-3"></div>
    </>
  );
};

export default SearchContainer;
