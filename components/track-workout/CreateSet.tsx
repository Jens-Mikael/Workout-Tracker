"use client";
import { LegacyRef, useRef } from "react";
import { Input } from "../ui/input";
import EditDrawer from "./EditDrawer";
import { TSet } from "@/types";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDeleteSet } from "@/lib/hooks/mutate";

interface IProps {
  set: TSet;
  index: number;
  handleDeleteSet: (setId: string) => void;
}

const CreateSet = ({ set, index, handleDeleteSet }: IProps) => {
  return (
    <div className="relative flex items-center text-lg ">
      <div className="flex flex-1 items-center justify-center">{index + 1}</div>
      <div className="flex flex-1 items-center justify-center">
        <EditDrawer
          setId={set.id}
          defaultValue={set.weight || 0}
          type="weight"
        />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <EditDrawer setId={set.id} defaultValue={set.reps || 0} type="reps" />
      </div>
      <div
        onClick={() => handleDeleteSet(set.id)}
        className="absolute right-2 h-fit cursor-pointer rounded-full p-2.5 transition-all hover:bg-black/5"
      >
        <FaRegTrashAlt size={16} />
      </div>
    </div>
  );
};

export default CreateSet;
