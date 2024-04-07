"use client";
import { LegacyRef, useRef } from "react";
import { Input } from "../ui/input";
import EditDrawer from "./EditDrawer";
import { TSet } from "@/types";

const CreateSet = ({ set, index }: { set: TSet; index: number }) => {
  const ref = useRef<HTMLFormElement>(null);
  const action = async (data: FormData) => {
    console.log(data.set("weight", "1033"));
  };
  return (
    <form action={action} ref={ref} className="flex text-lg">
      <div className="flex flex-1 items-center justify-center">{index}</div>
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
    </form>
  );
};

export default CreateSet;
