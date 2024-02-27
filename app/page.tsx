import Login from "@/components/Login";
import Logout from "@/components/Logout";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  console.log(session);

  return <div>{session ? <Logout /> : <Login />}</div>;
}
