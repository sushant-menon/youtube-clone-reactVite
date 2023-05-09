import React from "react";

const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;
  const viewFun = view => {
    return view < 1000
      ? view
      : view > 1000 && view < 1000000
      ? (view / 1000).toFixed(0) + "K"
      : (view / 1000000).toFixed(1) + "M";
  };
  return (
    <div className="m-2 w-80">
      <img className="rounded-2xl" src={thumbnails.medium.url} />
      <ul className="ml-2 mt-3">
        <li className="font-bold">{title}</li>
        <li>{channelTitle}</li>
        <li>{viewFun(statistics.viewCount)} views</li>
      </ul>
    </div>
  );
};

export default VideoCard;
