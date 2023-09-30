import { cn } from "@/utils/style";
import { ComponentProps } from "react";

const Logo = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "w-14 h-14 rounded-xl bg-[#EEF2FF]",
        "flex items-center justify-center",
        className
      )}
      {...props}
    >
      <span className={cn("text-3xl font-semibold text-[#4F46E5]")}>G</span>
    </div>
  );
};

export default Logo;
