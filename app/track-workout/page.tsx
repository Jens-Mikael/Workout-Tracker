import { getCurrentWorkout } from "@/lib/read";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import NewWorkout from "@/components/track-workout/Main";

export default async function Fetch() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["track-workout"],
    queryFn: getCurrentWorkout,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewWorkout />
    </HydrationBoundary>
  );
}
