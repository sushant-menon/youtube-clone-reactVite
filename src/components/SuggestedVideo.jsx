// import React from "react";
// import { useState, useEffect } from "react";
// import { YOUTUBE_RELATED_VIDEO_API } from "../utils/Constant";
// import { GOOGLE_API_KEY } from "../utils/Constant";
// import { Link } from "react-router-dom";
// import TimeAgo from "react-timeago";

// const SuggestedVideo = ({ information }) => {
//   console.log(information?.snippet?.localized?.title);
//   const vidName = (information?.snippet?.localized?.title ?? "").replace(
//     /[^a-zA-z0-9 ]/g,
//     ""
//   );
//   const [videoDetails, setVideoDetails] = useState([]);
//   useEffect(() => {
//     getVideoDetail();
//   }, []);

//   const getVideoDetail = async () => {
//     const data = await fetch(
//       YOUTUBE_RELATED_VIDEO_API + vidName + "&key=" + GOOGLE_API_KEY
//     );
//     const json = await data.json();
//     setVideoDetails(json.items);
//   };

//   return !videoDetails ? null : videoDetails.length === 0 ? null : (
//     <div className="my-4 mx-6 shadow-lg shadow-gray-300 rounded-lg p-2">
//       {videoDetails.map((item, index) => {
//         return (
//           <Link
//             key={item?.id.videoId + index}
//             to={"/watch?v=" + item?.id?.videoId}
//           >
//             <SuggestedVideoCard details={item} />
//           </Link>
//         );
//       })}
//     </div>
//   );
// };

// const SuggestedVideoCard = ({ details }) => {
//   const viewFun = view => {
//     return view < 1000
//       ? view
//       : view > 1000 && view < 1000000
//       ? (view / 1000).toFixed(0) + "K"
//       : (view / 1000000).toFixed(1) + "M";
//   };

//   return (
//     <div className="w-full my-2 grid grid-flow-col grid-cols-5 gap-3 p-1">
//       <div className="col-span-2 content-center">
//         <img
//           className="rounded-md bg-contain min-w-full h-[100px]"
//           src={details?.snippet?.thumbnails?.medium?.url}
//           alt="video-poster"
//         />
//       </div>
//       <div className="col-span-3">
//         <p className="text-base font-medium mb-2 line-clamp-2 ">
//           {details?.snippet?.title}
//         </p>
//         <p className="text-xs font-semibold">{details.snippet.channelTitle}</p>
//         <span className="text-xs font-semibold">
//           <TimeAgo date={details?.snippet?.publishedAt} />
//         </span>
//       </div>
//     </div>
//   );
// };

// export default SuggestedVideo;

// Solution from gpt

import React, { useState, useEffect, useCallback } from "react";
import {
  YOUTUBE_RELATED_VIDEO_API,
  GOOGLE_API_KEY,
  YOUTUBE_VIDEOS_API_BY_ID,
  YOUTUBE_VIDEOS_API,
  YOUTUBE_SEARCH_API,
} from "../utils/Constant";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import _ from "lodash";

const SuggestedVideo = ({ information }) => {
  console.log(information?.snippet?.localized?.title);
  const vidName = (information?.snippet?.localized?.title ?? "")
    .replace(/[^\w\s]/gi, "")
    .trim();
  const [videoDetails, setVideoDetails] = useState([]);

  const getVideoDetail = useCallback(
    _.debounce(async () => {
      const data = await fetch(
        YOUTUBE_RELATED_VIDEO_API + vidName + "&key=" + GOOGLE_API_KEY
      );
      const json = await data.json();
      setVideoDetails(json.items);
    }, 500),
    [vidName]
  );

  useEffect(() => {
    getVideoDetail();
  }, [getVideoDetail]);

  return !videoDetails || videoDetails.length === 0 ? null : (
    <div className="my-4 mx-6 shadow-lg shadow-gray-300 rounded-lg p-2">
      {videoDetails.map((item, index) => {
        return (
          <Link
            key={item?.id.videoId + index}
            to={"/watch?v=" + item?.id?.videoId}
          >
            <SuggestedVideoCard details={item} />
          </Link>
        );
      })}
    </div>
  );
};

const SuggestedVideoCard = ({ details }) => {
  const viewFun = view => {
    return view < 1000
      ? view
      : view > 1000 && view < 1000000
      ? (view / 1000).toFixed(0) + "K"
      : (view / 1000000).toFixed(1) + "M";
  };

  return (
    <div className="w-full my-2 grid grid-flow-col grid-cols-5 gap-3 p-1">
      <div className="col-span-2 content-center">
        <img
          className="rounded-md bg-contain min-w-full h-[100px]"
          src={details?.snippet?.thumbnails?.medium?.url}
          alt="video-poster"
        />
      </div>
      <div className="col-span-3">
        <p className="text-base font-medium mb-2 line-clamp-2 ">
          {details?.snippet?.title}
        </p>
        <p className="text-xs font-semibold">{details.snippet.channelTitle}</p>
        <span className="text-xs font-semibold">
          <TimeAgo date={details?.snippet?.publishedAt} />
        </span>
      </div>
    </div>
  );
};

export default SuggestedVideo;
