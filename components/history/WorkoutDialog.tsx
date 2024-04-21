"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useGetAllPreviousWorkouts } from "@/lib/hooks/get";
import { durationAsString, getWeekDay } from "@/lib/utils";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import Link from "next/link";
import StarRating from "../StarRating";
interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  indexes: number[];
}

const WorkoutDialog = ({ open, setOpen, indexes }: IProps) => {
  const { data } = useGetAllPreviousWorkouts();
  if (indexes.length <= 0) return;
  console.log(indexes);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        {indexes.map((i) => (
          <>
            <DialogHeader>
              <DialogTitle>
                {getWeekDay(data![i].created?.getDay()!)} {data![i].type}{" "}
                {data![i].created!.getMonth() + 1}/{data![i].created!.getDate()}{" "}
                🏋️‍♂️
              </DialogTitle>

              <DialogDescription>
                <div>Time: {data![i].created?.toLocaleTimeString()}</div>
                <div>Type: {data![i].type}</div>
                <div>Duration: {durationAsString(data![i].duration!)}</div>
                <div className="flex items-center justify-center gap-1 sm:justify-start">
                  Rating: <StarRating rating={data![i].rating!} size={16} />
                </div>
                {data![i].description && (
                  <div className="mt-2 font-light italic">
                    {data![i].description}
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Link href={`/workout/${data![i].id}`}>
                <Button>View</Button>
              </Link>
            </DialogFooter>
          </>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default WorkoutDialog;
