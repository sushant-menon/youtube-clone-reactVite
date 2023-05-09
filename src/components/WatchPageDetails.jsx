import React from "react";
import VideoContainer from "./VideoContainer";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

const WatchPageDetails = ({ details }) => {
  const viewFun = view => {
    return view < 1000
      ? view
      : view > 1000 && view < 1000000
      ? (view / 1000).toFixed(0) + "K"
      : (view / 1000000).toFixed(1) + "M";
  };
  return (
    <div className="my-4 w-full">
      <h1 className="text-xl font-bold max-w-4xl">
        {details?.snippet?.localized?.title}
      </h1>
      <div className="container my-2">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="flex flex-row items-center">
            <img
              className="w-14 h-14 rounded-full"
              src={details?.snippet?.thumbnails?.high?.url}
              alt="profile-logo"
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-bold text-lg text-gray-700 cursor-pointer">
                {details?.snippet?.channelTitle}
              </h3>
              <p className="text-gray-500">5.7M subscribers</p>
            </div>
            <div className="bg-gray-300 px-5 py-2 rounded-full cursor-pointer hover:bg-gray-500 ml-7 flex space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-bell"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span>Subscribe</span>
            </div>
          </div>
          <div className="flex flex-row mt-2 justify-evenly space-x-2 md:ml-16">
            <div className="bg-gray-300 px-5 py-2 rounded-full cursor-pointer hover:bg-gray-500 flex space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-thumbs-up"
              >
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
              <span> {viewFun(details?.statistics?.likeCount)}</span>
            </div>
            <div className="bg-gray-300 px-5 py-2 rounded-full cursor-pointer hover:bg-gray-500 flex space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-share-2"
              >
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              <span>Share</span>
            </div>
            <div className="bg-gray-300 px-5 py-2 rounded-full cursor-pointer hover:bg-gray-500 flex space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-download"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Download</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPageDetails;
