import Login from "@/components/Login";
import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { LuLayoutTemplate } from "react-icons/lu";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { previousWorkoutOptions } from "@/lib/hooks";
import PreviousWorkout from "@/components/PreviousWorkout";
import { getPreviousWorkout } from "@/db/read";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();
  const queryClient = new QueryClient();
  if (session)
    await queryClient.prefetchQuery({
      queryKey: ["previous-workout"],
      queryFn: getPreviousWorkout,
    });
  if (!session)
    return (
      <div>
        <Login />
      </div>
    );
  else
    return (
      <div className="flex min-h-screen flex-col items-center sm:p-10 p-5">
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
          <div className="flex gap-3 xs:gap-7 text-center justify-between xs:justify-start">
            {NavMap.map((i) => (
              <div
                key={i.src}
                className="flex flex-col items-center gap-2 text-xs font-bold "
              >
                <Link
                  href={i.href}
                  className="w-fit rounded-2xl border 2xs:w-min p-4 transition-colors hover:bg-muted"
                >
                  <Image
                    src={`/icons/${i.src}`}
                    height={40}
                    width={40}
                    className="2xs:h-10 2xs:w-10 h-8 w-8 2xs:min-h-10 2xs:min-w-10 min-h-8 min-w-8"
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
    text: "New Template",
    href: "plan",
    src: "addTemplate.svg",
  },
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
