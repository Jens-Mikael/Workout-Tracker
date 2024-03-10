import CreateSet from "./CreateSet";
import SelectOption from "./SelectOption";
import Set from "./Set";
import { Button } from "./ui/button";
const CreateExercise = () => {
  return (
    <div className="rounded-t-2xl overflow-hidden bg-white">
      <div className="flex justify-center bg-stone-900 text-white text-xl p-3">
        <div>Exercise 1</div>
      </div>
      <div className="border-black/20 border border-t-0 rounded-b-2xl p-5 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <div className="font-medium">Exercise Type:</div>
          <SelectOption selectType="movement" workoutType="Pull" />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-stretch text-center">
            <div className="flex-1">Set</div>
            <div className="flex-1">Weigth (kg)</div>
            <div className="flex-1">Reps</div>
          </div>
          <CreateSet />
          <CreateSet />
          <CreateSet />
          <CreateSet />
          <Button variant="default">Add set</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateExercise;
