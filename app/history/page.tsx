import History from "@/components/history/Main";
import { allPreviousWorkoutsOptions } from "@/lib/hooks";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const Fetch = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(allPreviousWorkoutsOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <History />
    </HydrationBoundary>
  );
};

export default Fetch;
