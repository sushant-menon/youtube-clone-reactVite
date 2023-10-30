import React, { useEffect, useState } from "react";
import { toggleMenu } from "../utils/AppSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { YOUTUBE_SEARCH_API } from "../utils/Constant";
import { cacheResults } from "../utils/SearchSlice";
import SuggestedVideo from "./SuggestedVideo";
import { set } from "lodash";
import { useRef } from "react";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef();

  const searchCache = useSelector(store => store.search);
  const dispatch = useDispatch();

  useEffect(() => {
    // Make an api call after every key stroke
    // if the difference between 2 api calls is <200ms , simply decline the api call

    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  /**
   * key- i
   * - render the component
   * - useEffect()
   * - start timer => makes api call after 200ms
   *
   * key- i
   * - destroy the component (useEffect return method)
   * - render the component
   * - useEffect()
   * - start timer => makes api call after 200ms
   *
   *
   *- If I press "i" it will render the component and  call the useEffect and it is not making api call right away. It will start the timer and make an api call after 200ms.
   *- But what happens if we press another keystroke before 200ms? i.e. ip = It triggers reconciliation process again , when it happens it has to clear things up. return () => {
      clearTimeout(timer);
    }; This component is called when the component is unmounted , when it is refreshing.

   - ClearTimeout function is called:
   *Every time the component is rerendered , it is destroying and appearing again. 

   - setTimeout(200) - makes an API call after 200ms
   *
   */

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);

    //update cache
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="flex justify-between items-center p-5 shadow-xl w-screen">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 cursor-pointer hover:bg-gray-300 hover:rounded-full hover:p-1"
          src="https://icons.veryicon.com/png/o/miscellaneous/linear-icon-45/hamburger-menu-5.png"
          alt="menu"
        />
        <Link to="/">
          <img
            className="h-8"
            src="https://blog.logomyway.com/wp-content/uploads/2020/09/youtube-logo2-1.jpg"
          />
        </Link>
      </div>
      <div className="col-span-3">
        <div className=" px-5 md:px-10 items-center justify-between">
          <div className="flex justify-between">
            <input
              type="text"
              placeholder="search..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setShowSuggestions(false)}
              className=" border border-gray-400 p-2 rounded-l-full md:w-[600px] placeholder:text-lg placeholder:text-gray-400 w-[100px] focus:border-blue-800 focus:border-2 md:focus:w-[700px] outline-none"
            />
            <Link key={"id" + searchQuery} to={"/search?q=" + searchQuery}>
              <button className="border border-gray-700 px-3 p-2 rounded-r-full bg-gray-500 w-16 md:w-24">
                Search
              </button>
            </Link>
          </div>
          {showSuggestions && (
            <div className="fixed z-20 bg-white py-2 px-3 w-[250px] rounded-lg md:w-[700px] shadow-lg border-2 mt-[1px] border-gray-200">
              <ul>
                {suggestions.map(suggest => {
                  return (
                    <li
                      key={suggest}
                      className="shadow-sm py-2 hover:bg-gray-200 w-full cursor-pointer"
                      onClick={() => {
                        setSearchQuery(suggest);
                        setShowSuggestions(false);
                      }}
                    >
                      🔍{suggest}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div>
        <img
          className="h-8"
          src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
          alt="user-icon"
        />
      </div>
    </div>
  );
};

export default Head;
