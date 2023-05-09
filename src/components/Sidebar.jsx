import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const isMenuOpen = useSelector(store => store.app.isMenuOpen);

  // Early return
  if (!isMenuOpen) return null;
  return (
    <div className="p-4 shadow-lg">
      <ul className="border-b-2 border-gray-300 pb-5 w-52">
        <li>
          <Link to="/"> Home </Link>
        </li>
        <li>Shorts</li>
        <li>Subscriptions</li>
        <li>Originals</li>
        <li>Youtube Music</li>
      </ul>
      <h1 className="font-bold text-lg mt-6 ">Subscriptions</h1>
      <ul className="border-b-2 border-gray-300 pb-5 cursor-pointer">
        <li>Music</li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Movies</li>
      </ul>
      <h1 className="font-bold text-lg mt-6">Watch Later</h1>
      <ul className="cursor-pointer">
        <li>Music</li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Movies</li>
      </ul>
    </div>
  );
};

export default Sidebar;
