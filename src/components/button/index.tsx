import { ComponentProps } from "react";
import { cn } from "@/utils/style";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  ["w-full font-medium rounded-lg", "flex justify-center items-center gap-2 "],
  {
    variants: {
      size: {
        md: "h-16 px-6 text-base",
      },
      variant: {
        primary: ["bg-[#4F46E5] text-white", "hover:bg-[#4F46E5]/80"],
        outline: ["border border-neutral-300"],
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
    },
  }
);

type IButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

const Button = ({
  size,
  variant,
  className,
  children,
  ...props
}: IButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ size, variant, className }))}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
