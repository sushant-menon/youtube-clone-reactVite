import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { closeMenu } from "../utils/AppSlice";
import VideoContainer from "./VideoContainer";
import { YOUTUBE_VIDEOS_API } from "../utils/Constant";
import WatchPageDetails from "./WatchPageDetails";
import CommentsContainer from "./CommentsContainer";
import SuggestedVideo from "./SuggestedVideo";
import { GOOGLE_API_KEY } from "../utils/Constant";
import { YOUTUBE_VIDEOS_API_BY_ID } from "../utils/Constant";
import DescriptionDetails from "./DescriptionDetails";

// const WatchPage = () => {
//   const [vidDetails, setVidDetails] = useState("");
//   const [searchParams] = useSearchParams();
//   const vidId = searchParams.get("v");
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(closeMenu());
//     getVideoDetail(vidId);
//   }, [vidId]);

//   const getVideoDetail = async vidId => {
//     const data = await fetch(
//       YOUTUBE_VIDEOS_API_BY_ID + vidId + "&key=" + GOOGLE_API_KEY
//     );
//     const json = await data.json();
//     setVidDetails(json.items[0]);
//   };

//   return (
//     <>
//       <div className="mt-4 mx-4 md:mx-16 w-full h-[90vh] overflow-auto scrollbar-thin scrollbar-thumb-[#ff0000] scrollbar-track-gray-100 scrollbar-thumb-rounded-md">
//         <div className="flex flex-col md:flex-row md:justify-between">
//           <span className="flex flex-col">
//             <iframe
//               className="w-full h-[300px] md:w-[900px] md:h-[550px] rounded-lg"
//               src={"https://www.youtube.com/embed/" + vidId + "?autoplay=1"}
//               title="YouTube video player"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               allowFullScreen
//             ></iframe>
//             <div className="">
//               <WatchPageDetails details={vidDetails} />
//             </div>
//             <div className="md:w-[900px]">
//               <DescriptionDetails details={vidDetails} />
//             </div>
//             <div className="md:w-[900px] rounded-xl border border-gray-600 bg-gray-400 mt-3">
//               <CommentsContainer details={vidDetails} />
//             </div>
//           </span>
//           {/* <div className=" md:w-[600px] w-full mt-3 rounded-xl border border-gray-600">
//             <SuggestedVideo information={vidDetails} />
//           </div> */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default WatchPage;

// using localstorage method

// const WatchPage = () => {
//   const [vidDetails, setVidDetails] = useState("");
//   const [searchParams] = useSearchParams();
//   const vidId = searchParams.get("v");

//   useEffect(() => {
//     // Check local storage first
//     const cachedData = localStorage.getItem(`vidDetails_${vidId}`);
//     if (cachedData) {
//       setVidDetails(JSON.parse(cachedData));
//     } else {
//       getVideoDetail();
//     }
//   }, []);

//   const getVideoDetail = async () => {
//     const data = await fetch(
//       YOUTUBE_VIDEOS_API_BY_ID + vidId + "&key=" + GOOGLE_API_KEY
//     );
//     const json = await data.json();
//     setVidDetails(json.items[0]);

//     // Store in local storage
//     localStorage.setItem(`vidDetails_${vidId}`, JSON.stringify(json.items[0]));
//   };

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(closeMenu());
//   }, []);

//   return (
//     <>
//       <div className="mt-4 mx-4 md:mx-16 w-full h-[90vh] overflow-auto scrollbar-thin scrollbar-thumb-[#ff0000] scrollbar-track-gray-100 scrollbar-thumb-rounded-md">
//         <div className="flex flex-col md:flex-row md:justify-between">
//           <span className="flex flex-col">
//             <iframe
//               className="w-full h-[300px] md:w-[900px] md:h-[550px] rounded-lg"
//               src={"https://www.youtube.com/embed/" + vidId + "?autoplay=1"}
//               title="YouTube video player"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               allowFullScreen
//             ></iframe>
//             <div className="">
//               <WatchPageDetails details={vidDetails} />
//             </div>
//             <div className="md:w-[900px]">
//               <DescriptionDetails details={vidDetails} />
//             </div>
//             <div className="md:w-[900px] rounded-xl border border-gray-600 bg-gray-400 mt-3">
//               <CommentsContainer details={vidDetails} />
//             </div>
//           </span>
//           {/* <div className=" md:w-[600px] w-full mt-3 rounded-xl border border-gray-600">
//             <SuggestedVideo information={vidDetails} />
//           </div> */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default WatchPage;

// updated localstorage solution

const WatchPage = () => {
  const [vidDetails, setVidDetails] = useState("");
  const [searchParams] = useSearchParams();
  const vidId = searchParams.get("v");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu());
    const cachedData = localStorage.getItem(vidId);
    if (cachedData) {
      setVidDetails(JSON.parse(cachedData));
    } else {
      getVideoDetail(vidId);
    }
  }, [vidId]);

  const getVideoDetail = async vidId => {
    const data = await fetch(
      YOUTUBE_VIDEOS_API_BY_ID + vidId + "&key=" + GOOGLE_API_KEY
    );
    const json = await data.json();
    setVidDetails(json.items[0]);
    localStorage.setItem(vidId, JSON.stringify(json.items[0]));
  };

  return (
    <>
      <div className="mt-4 mx-1 md:mx-16 w-full h-3/4 overflow-auto scrollbar-thin scrollbar-thumb-[#ff0000] scrollbar-track-gray-100 scrollbar-thumb-rounded-md">
        <div className="flex flex-col md:flex-row md:justify-between">
          <span className="flex flex-col">
            <iframe
              className=" h-[250px] md:w-[900px] md:h-[550px] mx-2 md:mx-0"
              src={"https://www.youtube.com/embed/" + vidId + "?autoplay=1"}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <div className="mx-2 md:mx-0">
              <WatchPageDetails details={vidDetails} />
            </div>
            <div className="md:w-[900px] mx-1 md:mx-0">
              <DescriptionDetails details={vidDetails} />
            </div>
            <div className="md:w-[900px] rounded-xl border border-gray-600 bg-gray-400 mt-3 mx-1 md:mx-0">
              <CommentsContainer details={vidDetails} />
            </div>
          </span>
          {/* <div className=" md:w-[600px] w-full mt-3 rounded-xl border border-gray-600">
            <SuggestedVideo information={vidDetails} />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default WatchPage;
