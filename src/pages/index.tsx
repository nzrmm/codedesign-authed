import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { useSession, signOut, getSession } from "next-auth/react";

import { Button } from "@/components";
import { cn } from "@/utils/style";

const Home = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div
      className={cn("flex flex-col justify-center items-center min-h-screen")}
    >
      {status === "authenticated" && (
        <div className={cn("flex flex-col items-center")}>
          <p className={cn("text-4xl font-semibold mb-4")}>
            Hello {session.user?.name || session.user?.email}
          </p>
          <Button
            variant={"outline-secondary"}
            className={cn("text-sm w-40 h-10")}
            onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
          >
            Logout
          </Button>
        </div>
      )}

      {status === "unauthenticated" && (
        <div className={cn("flex flex-col items-center")}>
          <p className={cn("text-4xl font-semibold mb-4")}>Hello Guest</p>
          <Button
            variant={"primary"}
            className={cn("text-sm w-40 h-10")}
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  session: Session;
}> = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Home;
