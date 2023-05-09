import React from "react";
import Button from "./Button";
import { list } from "./ButtonListItems";

const ButtonList = () => {
  return (
    <div className="flex  text-base md:max-w-full max-w-screen-lg mx-5 snap-x snap-mandatory no-scrollbar mt-2">
      {list.map((list, id) => {
        return <Button key={list.id} name={list.name} />;
      })}
    </div>
  );
};

export default ButtonList;
