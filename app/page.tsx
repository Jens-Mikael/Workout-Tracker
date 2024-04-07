import EditDrawer from "@/components/track-workout/EditDrawer";
import Login from "@/components/Login";
import Logout from "@/components/Logout";
import MobileTap from "@/components/MobileTap";
import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  if (!session)
    return (
      <div>
        <Login />
      </div>
    );
  else
    return (
      <div className="flex min-h-screen flex-col gap-8 p-5">
        <div className="flex flex-col gap-2">
          <div className="text-3xl font-bold">
            Hi{" "}
            {session.user?.name?.slice(
              0,
              session.user?.name.indexOf("-") ||
                session.user?.name.indexOf(" "),
            )}{" "}
            👋
          </div>
          <div className="font-semibold">What are we hitting today?</div>
        </div>
        {/* MENU */}
        <div className="flex gap-7">
          {NavMap.map((i) => (
            <div className="flex flex-col items-center gap-2 text-xs font-bold">
              <Link
                href={i.href}
                className="w-fit rounded-2xl border border-black/20 p-4 transition-colors hover:bg-black/5"
              >
                <Image
                  src={`/icons/${i.src}`}
                  height={36}
                  width={36}
                  alt="ico"
                />
              </Link>
              {i.text}
            </div>
          ))}
        </div>
        {/* PREVIOUS WORKOUT */}
        <div className=" flex flex-col gap-3">
          <div className="text-xl font-semibold">Your Previous Workout:</div>
          <div className="overflow-hidden rounded-t-2xl ">
            <div className="flex justify-between bg-stone-900 p-3 text-xl text-white">
              <div>Pull Day</div>
              <div>10/8/2023</div>
            </div>
            <div className="flex flex-col gap-2 rounded-b-2xl border border-t-0 border-black/20 p-5">
              <div className="flex justify-between">
                <div>Face Pulls</div>
                <div>4x8-12</div>
              </div>
              <div className="flex justify-between">
                <div>Lat Pull-down</div>
                <div>4x8-12</div>
              </div>
              <div className="flex justify-between">
                <div>Bent over Pull-down</div>
                <div>4x8-12</div>
              </div>
              <div className="flex justify-between">
                <div>Biceps</div>
                <div>4x8-12</div>
              </div>
              <div className="flex justify-between">
                <div>Rear Delts</div>
                <div>4x8-10</div>
              </div>
            </div>
          </div>
        </div>
        {/* FEED */}
      </div>
    );
}

const NavMap = [
  {
    text: "Track Workout",
    href: "track-workout",
    src: "weight.svg",
  },

  {
    text: "History",
    href: "history",
    src: "history.svg",
  },
  {
    text: "Statistics",
    href: "statistics",
    src: "stats.svg",
  },
];
