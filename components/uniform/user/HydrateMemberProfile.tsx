/*  @ts-expect-error Server Component */
import { dehydrate, Hydrate } from "@tanstack/react-query";
import getQueryClient from "@/utils/getQueryClient";
import MemberProfile from "./MemberProfile";
import { getUser, getVisits } from "@/utils/api";

export default async function HydratedPosts() {
  const queryClient = getQueryClient();
  /*  @ts-expect-error Server Component */
  await queryClient.prefetchQuery(["user"], getUser);
  /*  @ts-expect-error Server Component */
  await queryClient.prefetchQuery(["visits"], getVisits);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <MemberProfile />
    </Hydrate>
  );
}
