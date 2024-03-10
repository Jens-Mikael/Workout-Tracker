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

interface ISelectOption {
  selectType: "workout" | "movement";
  workoutType?: (typeof workoutTypes)[number];
}

export function SelectOption({ selectType, workoutType }: ISelectOption) {
  return (
    <Select>
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
