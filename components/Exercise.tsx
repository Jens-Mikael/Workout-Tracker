"use client";
import { useState } from "react";
import CreateSet from "./track-workout/CreateSet";
import SelectOption from "./SelectOption";
import { IoIosArrowDown } from "react-icons/io";

import Set from "./Set";
import { Button } from "./ui/button";
const Exercise = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-t-2xl bg-white">
      <div className="flex justify-center bg-stone-900 p-3 text-xl text-white">
        <div>Dumbbell press</div>
      </div>
      <div className="flex flex-col gap-10 rounded-b-2xl border border-t-0 border-black/20 p-5">
        <div className="flex flex-col gap-5">
          <div
            id="container"
            style={{
              height: isOpen
                ? document.querySelector(`#container`)?.scrollHeight
                : 0,
            }}
            className="flex flex-col gap-5 overflow-hidden transition-[height]"
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
          <div className="flex items-stretch text-center text-lg font-bold">
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
            } h-fit rounded-full p-2 transition-all hover:bg-black/5`}
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
