import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

const Home = async () => {
  const session = await getServerSession(authOptions);

  return session ? redirect("/dashboard") : redirect("/signin");
};

export default Home;
