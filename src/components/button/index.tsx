import { ComponentProps } from "react";
import { cn } from "@/utils/style";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  ["w-full font-medium rounded-lg", "flex justify-center items-center gap-2 "],
  {
    variants: {
      size: {
        md: "h-12 px-6 text-base",
      },
      variant: {
        primary: [
          "bg-gradient-to-br from-blue-500 to-purple-500 text-white",
          "hover:from-purple-500 hover:to-blue-500",
        ],
        "outline-secondary": ["border border-neutral-300 text-neutral-800"],
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
