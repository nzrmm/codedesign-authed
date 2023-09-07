import type { ReactNode } from "react";
import { cn } from "@/utils/style";

type ILoginRegisterLayoutProps = {
  children: ReactNode;
};

const LoginRegisterLayout = ({ children }: ILoginRegisterLayoutProps) => {
  return (
    <div
      className={cn(
        "flex justify-center items-center h-screen",
        "bg-gradient-to-br from-blue-400 to-blue-500"
      )}
    >
      <div
        className={cn(
          "w-8/12 h-3/4 grid lg:grid-cols-2",
          "bg-white rounded-md overflow-hidden"
        )}
      >
        <div
          className={cn("bg-gradient-to-br from-blue-500 to-purple-500")}
        ></div>
        {children}
      </div>
    </div>
  );
};

export default LoginRegisterLayout;
