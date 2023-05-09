import React from "react";
import { list } from "./ButtonListItems";
import { useState } from "react";

const Button = ({ name }) => {
  return (
    <div className="flex-none snap-always snap-center">
      <button
        className="border rounded-lg bg-zinc-100 py-[2px] px-2 my-2 mx-3
         hover:bg-zinc-200 duration-300 ease-in-out"
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
