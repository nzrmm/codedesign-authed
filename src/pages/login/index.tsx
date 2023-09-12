import Head from "next/head";
import Link from "next/link";
import * as yup from "yup";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { NextPageWithLayout } from "@/pages/_app";

import { Button, TextInput } from "@/components";
import { cn } from "@/utils/style";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const Login: NextPageWithLayout = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin: SubmitHandler<FieldValues> = async (data) => {
    const status = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
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
            required
            id="email"
            type="email"
            placeholder="Email"
            register={register}
            errors={errors}
          />

          <TextInput
            required
            id="password"
            type="password"
            placeholder="Password"
            register={register}
            errors={errors}
          />
        </div>

        <div className={cn("w-full mb-4")}>
          <Button onClick={handleSubmit(handleLogin)}>Login</Button>
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
