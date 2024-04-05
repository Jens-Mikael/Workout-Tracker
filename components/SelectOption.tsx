"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { exercisesByType, workoutTypes } from "@/selectData";
import { Control, ControllerRenderProps, FieldValues } from "react-hook-form";
import { getCurrentWorkout } from "@/lib/read";
import { useGetCurrentWorkout } from "@/lib/hooks";

interface ISelectOption {
  selectType: "workout" | "movement";
  workoutType?: (typeof workoutTypes)[number];
  field?: ControllerRenderProps<any, any>;
}

function SelectOption({ selectType, workoutType, field }: ISelectOption) {
  const { data } = useGetCurrentWorkout();
  async function handleChange(value: string) {
    console.log(data);
    console.log(value);
  }
  return (
    <Select
      onValueChange={selectType === "movement" ? handleChange : field?.onChange}
      defaultValue={selectType === "movement" ? "" : field?.value}
    >
      <SelectTrigger className="w-fit min-w-[180px] gap-2">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Workout</SelectLabel>
          {selectType === "workout"
            ? workoutTypes.map((i) => (
                <SelectItem
                  className={i === "Pull" ? "font-bold" : ""}
                  value={i}
                  key={i}
                >
                  {i} {i === "Pull" && "(Recommended)"}{" "}
                  {i === "Push" && "(Previous)"}
                </SelectItem>
              ))
            : exercisesByType[workoutType!].map((i) => (
                <SelectItem value={i}>{i}</SelectItem>
              ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectOption;
