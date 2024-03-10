"use client";
import { LegacyRef, useRef } from "react";
import { Input } from "./ui/input";
import EditDrawer from "./EditDrawer";

const CreateSet = () => {
  const ref = useRef<HTMLFormElement>(null);
  const action = (data: FormData) => {
    console.log(data.set("weight", "1033"));
  };
  return (
    <form action={action} ref={ref} className="flex text-lg">
      <div className="flex-1 flex justify-center items-center">1</div>
      <div className="flex-1 flex justify-center items-center">
        <EditDrawer />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <EditDrawer />
      </div>
    </form>
  );
};

export default CreateSet;
