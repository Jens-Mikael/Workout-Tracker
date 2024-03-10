"use client";
import { useState } from "react";
import CreateSet from "./CreateSet";
import SelectOption from "./SelectOption";
import { IoIosArrowDown } from "react-icons/io";

import Set from "./Set";
import { Button } from "./ui/button";
const Exercise = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rounded-t-2xl overflow-hidden bg-white">
      <div className="flex justify-center bg-stone-900 text-white text-xl p-3">
        <div>Dumbbell press</div>
      </div>
      <div className="border-black/20 border border-t-0 rounded-b-2xl p-5 flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div
            id="container"
            style={{
              height: isOpen
                ? document.querySelector(`#container`)?.scrollHeight
                : 0,
            }}
            className="flex flex-col gap-5 transition-[height] overflow-hidden"
          >
            <div className="flex items-stretch text-center">
              <div className="flex-1">Set</div>
              <div className="flex-1">Weigth (kg)</div>
              <div className="flex-1">Reps</div>
            </div>
            <Set />
            <Set />
            <Set />
            <Set />
            <Set />
            <Set />
          </div>
          <div className="flex items-stretch text-center font-bold text-lg">
            <div className="flex-1">4 Sets</div>
            <div className="flex-1">≈46 kg</div>
            <div className="flex-1">≈9 Reps</div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" className="w-fit">
              Delete
            </Button>
            <Button className="w-fit">Edit</Button>
          </div>
          <button
            className={`${
              isOpen && "rotate-180"
            } p-2 hover:bg-black/5 rounded-full transition-all h-fit`}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <IoIosArrowDown size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Exercise;
