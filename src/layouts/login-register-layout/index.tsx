import type { ReactNode } from "react";
import { cn } from "@/utils/style";

type ILoginRegisterLayoutProps = {
  children: ReactNode;
};

const LoginRegisterLayout = ({ children }: ILoginRegisterLayoutProps) => {
  return (
    <div className={cn("antialiased w-full min-h-screen")}>{children}</div>
  );
};

export default LoginRegisterLayout;
