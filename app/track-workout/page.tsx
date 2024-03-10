import CreateExercise from "@/components/CreateExercise";
import Exercise from "@/components/Exercise";
import MobileTap from "@/components/MobileTap";
import SelectOption from "@/components/SelectOption";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";

const NewWorkout = () => {
  return (
    <div className="min-h-screen flex flex-col gap-7 p-5">
      <Link
        href="/"
        className="p-2 hover:bg-black/5 transition-all w-fit rounded-full"
      >
        <IoArrowBackOutline size={24} />
      </Link>
      <div className="font-semibold text-3xl">Track New Workout 🏋️‍♂️</div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <div>Workout type:</div>
          <SelectOption selectType="workout" workoutType="Push" />
        </div>
      </div>

      <Exercise />
      <CreateExercise />
      {/* ADD EXERCISE */}
      <MobileTap className="border border-black/20 rounded-2xl text-xl py-10 hover:scale-105 transition-all">
        Add Exercise
      </MobileTap>

      <Button className="self-end">Finish Workout</Button>
    </div>
  );
};

export default NewWorkout;
