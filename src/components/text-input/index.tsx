import { ComponentProps } from "react";
import { cn } from "@/utils/style";
import { cva, type VariantProps } from "class-variance-authority";
import { FieldErrors, UseFormRegister } from "react-hook-form";

const textInputVariants = cva(
  "w-full rounded-lg focus:outline-none px-4 py-3 border",
  {
    variants: {
      variant: {
        outline: ["border-neutral-200 focus:ring-1 focus:ring-neutral-300"],
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
);

type ITextInputProps = {
  wrapperClassName?: string;
  errors: FieldErrors;
  register: UseFormRegister<any>;
} & ComponentProps<"input"> &
  VariantProps<typeof textInputVariants>;

const TextInput = ({
  errors,
  variant,
  register,
  className,
  wrapperClassName,
  ...props
}: ITextInputProps) => {
  return (
    <div className={cn("w-full", wrapperClassName)}>
      <input
        className={cn(textInputVariants({ variant, className }), {
          "border-rose-500": errors[props.id!],
        })}
        {...register(props.id!, { required: props.required })}
        {...props}
      />
    </div>
  );
};

export default TextInput;
