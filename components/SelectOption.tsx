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
import { ControllerRenderProps } from "react-hook-form";
import { useSetExerciseMovement } from "@/lib/hooks/mutate";
import { useGetTrackWorkout } from "@/lib/hooks/get";

interface ISelectOption {
  selectType: "workout" | "movement";
  workoutType?: string;
  field?: ControllerRenderProps<any, any>;
  exerciseId?: string;
  defaultVal?: string;
}

function SelectOption({
  selectType,
  workoutType,
  field,
  exerciseId,
  defaultVal,
}: ISelectOption) {
  const { mutateAsync: setMovement } = useSetExerciseMovement();

  async function handleChange(movement: string) {
    if (!movement || !exerciseId) return;
    await setMovement({ exerciseId, movement });
  }
  return (
    <Select
      onValueChange={selectType === "movement" ? handleChange : field?.onChange}
      defaultValue={selectType === "movement" ? defaultVal : field?.value}
    >
      <SelectTrigger className="w-fit min-w-[180px] gap-2">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup key={exerciseId}>
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
            : exercisesByType[workoutType as string].map((i) => (
                <SelectItem key={i} value={i}>{i}</SelectItem>
              ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectOption;
