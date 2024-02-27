"use client";

import { signIn } from "next-auth/react";

const Login = () => {
  return <button onClick={() => signIn()}>Login</button>;
};
export default Login;
