import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import * as yup from "yup";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { NextPageWithLayout } from "@/pages/_app";

import { Logo, Button, TextInput } from "@/components";
import { cn } from "@/utils/style";

const schema = yup
  .object({
    username: yup.string().min(3).max(20).required(),
    email: yup.string().email().required(),
    password: yup.string().min(3).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")])
      .required(),
  })
  .required();

const Register: NextPageWithLayout = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister: SubmitHandler<FieldValues> = async (data) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
        <title>Register - Codedesign Authed</title>
        <meta name="description" content="a register page for user" />
      </Head>

      <div className={cn("w-full min-h-screen grid grid-cols-2")}>
        <div className={cn("px-36 py-24")}>
          <Logo className={cn("mb-14")} />

          <div className={cn("mb-11")}>
            <h1 className={cn("font-semibold text-4xl mb-[10px]")}>
              Bikin akun baru
            </h1>
            <p className={cn("text-[#4B5563] leading-relaxed")}>
              Nggak susah kok, kamu cuma tinggal masukin beberapa data aja terus
              langsung jadi deh!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleRegister)} className={cn("mb-8")}>
            <div className={cn("grid gap-6 mb-8")}>
              <TextInput
                id="username"
                label="Username"
                type="text"
                placeholder="Masukkan Username..."
                register={register}
                errors={errors}
              />
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
              <TextInput
                id="confirmPassword"
                label="Konfirmasi Kata Sandi"
                type="password"
                placeholder="Masukkan konfirmasi kata sandi..."
                register={register}
                errors={errors}
              />
            </div>

            <Button type="submit">Mendaftar</Button>
          </form>

          <div className={cn("text-center")}>
            <p className={cn("font-semibold text-[#4B5563]")}>
              Sudah punya akun ?{" "}
              <Link href={"/login"} className={cn("text-[#4F46E5]")}>
                Silahkan login!
              </Link>
            </p>
          </div>
        </div>

        <div className={cn("relative w-full h-full")}>
          <Image fill src={"/images/register-image.png"} alt="register-image" />
        </div>
      </div>
    </>
  );
};

Register.layout = "LoginRegister";

export default Register;
