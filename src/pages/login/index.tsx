import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { NextPageWithLayout } from "@/pages/_app";

import { Button, TextInput } from "@/components";
import { cn } from "@/utils/style";

const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const [user, setUser] = useState({} as { email: string; password: string });

  const handleLogin = async () => {
    const status = await signIn("credentials", {
      redirect: false,
      email: user.email,
      password: user.password,
      callbackUrl: "/",
    });

    if (status?.ok && status?.url) {
      router.push(status.url);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="a login page for user" />
      </Head>

      <div className={cn("flex flex-col justify-center items-center px-20")}>
        <div className={cn("w-full text-center mb-10")}>
          <p className={cn("text-4xl font-semibold text-neutral-900 mb-4")}>
            Login
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
        </div>

        <div className={cn("w-full mb-4")}>
          <Button onClick={handleLogin}>Login</Button>
        </div>

        <div className={cn("mb-4")}>
          <p className={cn("text-sm text-neutral-500")}>-- Or --</p>
        </div>

        <div className={cn("w-full flex flex-col gap-2 mb-10")}>
          <Button
            variant={"outline-secondary"}
            className={cn("text-sm")}
            onClick={() =>
              signIn("google", { callbackUrl: "http://localhost:3000" })
            }
          >
            <FcGoogle size={20} />
            Login with Google
          </Button>
          <Button
            variant={"outline-secondary"}
            className={cn("text-sm")}
            onClick={() =>
              signIn("github", { callbackUrl: "http://localhost:3000" })
            }
          >
            <FaGithub size={20} />
            Login with Github
          </Button>
        </div>

        <div>
          <p className={cn("text-sm text-neutral-500")}>
            Don&apos;t have an account yet ?{" "}
            <Link href={"/register"} className={cn("text-blue-600 underline")}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

Login.layout = "LoginRegister";

export default Login;
