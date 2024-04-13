import { Calendar } from "@/components/ui/calendar"
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";

const History = () => {
  return (
    <div className="flex min-h-screen flex-col gap-7 p-5">
      <Link
        href="/"
        className="w-fit rounded-full p-2 transition-all hover:bg-black/5"
      >
        <IoArrowBackOutline size={24} />
      </Link>
      <div className="flex items-center justify-center">
        <div className="flex w-full max-w-xl flex-col gap-7">
          <Calendar
            mode="single"
            className="rounded-md border flex-1"
            
          />
        </div>
      </div>
    </div>
  );
};

export default History;
