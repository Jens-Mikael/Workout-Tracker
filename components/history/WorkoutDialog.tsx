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
  index: number;
}

const WorkoutDialog = ({ open, setOpen, index }: IProps) => {
  const { data } = useGetAllPreviousWorkouts();
  if (index < 0) return;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {getWeekDay(data![index].created?.getDay()!)}{" "}
            {data![index].created!.getMonth() + 1}/
            {data![index].created!.getDate()} 🏋️‍♂️
          </DialogTitle>

          <DialogDescription>
            <div>Type: {data![index].type}</div>
            <div>Duration: {durationAsString(data![index].duration!)}</div>
            <div className="flex items-center justify-center gap-1 sm:justify-start">
              Rating: <StarRating rating={data![index].rating!} size={16} />
            </div>
            {data![index].description && (
              <div className="mt-2 font-light italic">
                {data![index].description}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Link href={`/workout/${data![index].id}`}>
            <Button>View</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkoutDialog;
