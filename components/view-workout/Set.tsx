import { TSet } from "@/types";

interface IProps {
  set: TSet;
  index: number;
}
const Set = ({ set, index }: IProps) => {
  return (
    <div className="flex">
      <div className="flex flex-1 items-center justify-center">{index + 1}</div>
      <div className="flex flex-1 items-center justify-center">
        {set.weight || 0}
      </div>
      <div className="flex flex-1 items-center justify-center">
        {set.reps || 0}
      </div>
    </div>
  );
};
export default Set;
