import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import * as yup from "yup";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { NextPageWithLayout } from "@/pages/_app";

import { Button, TextInput } from "@/components";
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
            required
            id="username"
            type="text"
            placeholder="Username"
            register={register}
            errors={errors}
          />
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
          <TextInput
            required
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            register={register}
            errors={errors}
          />
        </div>

        <div className={cn("w-full mb-10")}>
          <Button onClick={handleSubmit(handleRegister)}>Register</Button>
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
