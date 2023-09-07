import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { NextPageWithLayout } from "../_app";

import { Button, TextInput } from "@/components";
import { cn } from "@/utils/style";
import { ReactElement } from "react";
import { LoginRegisterLayout } from "@/layouts";

const Login: NextPageWithLayout = () => {
  return (
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
        <TextInput type="text" placeholder="Email" />
        <TextInput type="password" placeholder="Password" />
      </div>

      <div className={cn("w-full mb-4")}>
        <Button>Login</Button>
      </div>

      <div className={cn("mb-4")}>
        <p className={cn("text-sm text-neutral-500")}>-- Or --</p>
      </div>

      <div className={cn("w-full flex flex-col gap-2 mb-10")}>
        <Button variant={"outline-secondary"} className={cn("text-sm")}>
          <FcGoogle size={20} />
          Sign in with Google
        </Button>
        <Button variant={"outline-secondary"} className={cn("text-sm")}>
          <FaGithub size={20} />
          Sign in with Github
        </Button>
      </div>

      <div>
        <p className={cn("text-sm text-neutral-500")}>
          Don&apos;t have an account yet ?{" "}
          <Link href={"/"} className={cn("text-blue-600 underline")}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

Login.getLayout = (page: ReactElement) => {
  return <LoginRegisterLayout>{page}</LoginRegisterLayout>;
};

export default Login;
