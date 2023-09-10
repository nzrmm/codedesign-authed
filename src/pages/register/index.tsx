import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "@/pages/_app";

import { Button, TextInput } from "@/components";
import { cn } from "@/utils/style";

const Register: NextPageWithLayout = () => {
  const router = useRouter();
  const [user, setUser] = useState(
    {} as {
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
    }
  );

  const handleRegister = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    await fetch("http://localhost:3000/api/auth/register", options)
      .then((response) => response.json())
      .then((data) => {
        if (data) router.push("http://localhost:3000/login");
      });
  };

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="a register page for user" />
      </Head>

      <div className={cn("flex flex-col justify-center items-center px-20")}>
        <div className={cn("w-full text-center mb-10")}>
          <p className={cn("text-4xl font-semibold text-neutral-900 mb-4")}>
            Register
          </p>
          <p
            className={cn(
              "mx-auto text-sm text-neutral-500 leading-relaxed w-10/12"
            )}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            harum natus numquam.
          </p>
        </div>

        <div className={cn("w-full flex flex-col gap-4 mb-8")}>
          <TextInput
            type="text"
            placeholder="Username"
            value={user.username || ""}
            onChange={({ target }) => {
              setUser({ ...user, username: target.value });
            }}
          />
          <TextInput
            type="email"
            placeholder="Email"
            value={user.email || ""}
            onChange={({ target }) => {
              setUser({ ...user, email: target.value });
            }}
          />
          <TextInput
            type="password"
            placeholder="Password"
            value={user.password || ""}
            onChange={({ target }) => {
              setUser({ ...user, password: target.value });
            }}
          />
          <TextInput
            type="password"
            placeholder="Confirm Password"
            value={user.confirmPassword || ""}
            onChange={({ target }) => {
              setUser({ ...user, confirmPassword: target.value });
            }}
          />
        </div>

        <div className={cn("w-full mb-10")}>
          <Button onClick={handleRegister}>Login</Button>
        </div>

        <div>
          <p className={cn("text-sm text-neutral-500")}>
            Have an account ?{" "}
            <Link href={"/login"} className={cn("text-blue-600 underline")}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

Register.layout = "LoginRegister";

export default Register;
