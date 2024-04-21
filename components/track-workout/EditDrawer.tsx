"use client";
import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { useLongPress } from "use-long-press";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useEditSet } from "@/lib/hooks/mutate";

interface IProps {
  setId: string;
  defaultValue: number;
  type: "reps" | "weight";
}

export function EditDrawer({ setId, defaultValue, type }: IProps) {
  const [count, setCounter] = React.useState(defaultValue);
  const [submitValue, setSubmitValue] = React.useState(defaultValue);
  const [isPressed, setIsPressed] = React.useState(false);
  const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout>();
  const [isIncrement, setIsIncrement] = React.useState(false);

  const { mutateAsync: editSet } = useEditSet();

  function onClick(adjustment: number) {
    setCounter((prev) => prev + adjustment);
  }

  React.useEffect(() => {
    if (isPressed) {
      const id = setInterval(() => {
        setCounter((prevCounter) =>
          isIncrement ? prevCounter + 1 : prevCounter - 1,
        );
      }, 50);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isPressed]);

  const bind = useLongPress(
    () => {
      setIsPressed(true);
    },
    {
      onFinish: () => setIsPressed(false),
      onCancel: () => setIsPressed(false),
    },
  );

  const handleSubmit = async () => {
    setSubmitValue(count);
    await editSet({ setId, type, amount: count });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">{submitValue}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{type === "weight" ? "Weight" : "Reps"}</DrawerTitle>
            <DrawerDescription>
              {type === "weight"
                ? "Set the amount of weight you lifted"
                : "Set the amount of reps you did"}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                disabled={count <= 0}
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => {
                  onClick(-1);
                }}
                onMouseDown={() => setIsIncrement(false)}
                {...bind()}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {count}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  {type === "weight" ? "kilograms" : "reps"}
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => {
                  onClick(1);
                }}
                onMouseDown={() => setIsIncrement(true)}
                {...bind()}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button onClick={handleSubmit}>Submit</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default EditDrawer;
