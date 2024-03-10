import EditDrawer from "@/components/EditDrawer";
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
      <div className="min-h-screen flex flex-col gap-8 p-5">
        <div className="flex flex-col gap-2">
          <div className="font-bold text-3xl">
            Hi{" "}
            {session.user?.name?.slice(
              0,
              session.user?.name.indexOf("-") || session.user?.name.indexOf(" ")
            )}{" "}
            👋
          </div>
          <div className="font-semibold">What are we hitting today?</div>
        </div>
        {/* MENU */}
        <div className="flex gap-7">
          {NavMap.map((i) => (
            <div className="flex flex-col gap-2 text-xs font-bold items-center">
              <Link
                href={i.href}
                className="p-4 border rounded-2xl border-black/20 w-fit hover:bg-black/5 transition-colors"
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
          <div className="font-semibold text-xl">Your Previous Workout:</div>
          <div className="rounded-t-2xl overflow-hidden ">
            <div className="flex justify-between bg-stone-900 text-white text-xl p-3">
              <div>Pull Day</div>
              <div>10/8/2023</div>
            </div>
            <div className="border-black/20 border border-t-0 rounded-b-2xl p-5 flex flex-col gap-2">
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
