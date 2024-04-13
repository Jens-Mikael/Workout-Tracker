import EditDrawer from "@/components/track-workout/EditDrawer";
import Login from "@/components/Login";
import Logout from "@/components/Logout";
import MobileTap from "@/components/MobileTap";
import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { LuLayoutTemplate } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { previousWorkoutOptions } from "@/lib/hooks";
import PreviousWorkout from "@/components/PreviousWorkout";

export default async function Home() {
  const session = await auth();
  const queryClient = new QueryClient();
  if (session) await queryClient.prefetchQuery(previousWorkoutOptions);
  if (!session)
    return (
      <div>
        <Login />
      </div>
    );
  else
    return (
      <div className="flex min-h-screen flex-col items-center p-5">
        <div className="flex w-full max-w-3xl flex-col gap-8">
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
            <div className="flex flex-col items-center gap-2 text-xs font-bold ">
              <Link
                href="plan"
                className="w-fit rounded-2xl border border-black/20 p-4 transition-colors hover:bg-black/5"
              >
                <LuLayoutTemplate size={36} />
              </Link>
              New Template
            </div>
            {NavMap.map((i) => (
              <div className="flex flex-col items-center gap-2 text-xs font-bold ">
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
          <HydrationBoundary state={dehydrate(queryClient)}>
            <PreviousWorkout />
          </HydrationBoundary>
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
    src: "calendar.svg",
  },
  {
    text: "Statistics",
    href: "statistics",
    src: "stats.svg",
  },
];
