import Head from "next/head";
import Link from "next/link";
import { NextPageWithLayout } from "../_app";

import { Button, TextInput } from "@/components";
import { cn } from "@/utils/style";

const Register: NextPageWithLayout = () => {
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
          <TextInput type="text" placeholder="Username" />
          <TextInput type="email" placeholder="Email" />
          <TextInput type="password" placeholder="Password" />
          <TextInput type="password" placeholder="Confirm Password" />
        </div>

        <div className={cn("w-full mb-10")}>
          <Button>Login</Button>
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
