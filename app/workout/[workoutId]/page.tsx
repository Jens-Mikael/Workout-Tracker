import { getWorkout } from "@/db/read";
import { workoutOptions } from "@/lib/hooks";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import ViewWorkout from "@/components/view-workout/Main";

export default async function Fetch({
  params,
}: {
  params: { workoutId: string };
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(workoutOptions(params.workoutId));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ViewWorkout />
    </HydrationBoundary>
  );
}
