import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

import SigninForm from "../../components/SigninForm/SigninForm";

const SigninPage = async () => {
  const session = await getServerSession(authOptions);
  return <>{session ? redirect("/dashboard") : <SigninForm />}</>;
};

export default SigninPage;
