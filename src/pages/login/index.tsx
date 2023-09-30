import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import * as yup from "yup";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { NextPageWithLayout } from "@/pages/_app";

import { Logo, Button, TextInput } from "@/components";
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
        <title>Login - Codedesign Authed</title>
        <meta name="description" content="a login page for user" />
      </Head>

      <div className={cn("w-full min-h-screen grid grid-cols-2")}>
        <div className={cn("px-36 py-24")}>
          <Logo className={cn("mb-14")} />

          <div className={cn("mb-11")}>
            <h1 className={cn("font-semibold text-4xl mb-[10px]")}>
              Masuk ke akun kamu
            </h1>
            <p className={cn("text-[#4B5563] leading-relaxed")}>
              Belajar gratis di Namanyajugabelajar.io, dan memulai karir yang
              kamu cita-citata sejak dalam embrio!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className={cn("mb-8")}>
            <div className={cn("grid gap-6 mb-8")}>
              <TextInput
                id="email"
                label="Email"
                type="email"
                placeholder="Masukkan email..."
                register={register}
                errors={errors}
              />

              <TextInput
                id="password"
                label="Kata Sandi"
                type="password"
                placeholder="Masukkan kata sandi..."
                register={register}
                errors={errors}
              />
            </div>

            <Button type="submit">Login</Button>
          </form>

          <div className={cn("mb-8 text-center")}>
            <p className={cn("text-neutral-500")}>-- / --</p>
          </div>

          <div className={cn("w-full flex gap-4 mb-14")}>
            <Button
              variant={"outline"}
              className={cn("text-sm")}
              onClick={() =>
                signIn("google", { callbackUrl: "http://localhost:3000" })
              }
            >
              <FcGoogle size={20} />
              Login with Google
            </Button>
            <Button
              variant={"outline"}
              className={cn("text-sm")}
              onClick={() =>
                signIn("github", { callbackUrl: "http://localhost:3000" })
              }
            >
              <FaGithub size={20} />
              Login with Github
            </Button>
          </div>

          <div className={cn("text-center")}>
            <p className={cn("font-semibold text-[#4B5563]")}>
              Belum punya akun ?{" "}
              <Link href={"/register"} className={cn("text-[#4F46E5]")}>
                Daftar sekarang!
              </Link>
            </p>
          </div>
        </div>

        <div className={cn("relative w-full h-full")}>
          <Image fill src={"/images/login-image.png"} alt="login-image" />
        </div>
      </div>
    </>
  );
};

Login.layout = "LoginRegister";

export default Login;
