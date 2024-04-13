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
interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const WorkoutDialog = ({ open, setOpen }: IProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pull Day - 4/19</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">View</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkoutDialog;
