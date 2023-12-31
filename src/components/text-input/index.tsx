import { ComponentProps } from "react";
import { cn } from "@/utils/style";
import { FiAlertCircle } from "react-icons/fi";
import { cva, type VariantProps } from "class-variance-authority";
import { FieldErrors, FieldError, UseFormRegister } from "react-hook-form";

const textInputVariants = cva("w-full rounded-lg focus:outline-none", {
  variants: {
    size: {
      md: "h-16 px-10",
    },
    variant: {
      primary: ["bg-[#F3F4F6]"],
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

type ITextInputProps = {
  id: string;
  label?: string;
  wrapperClassName?: string;
  errors: FieldErrors;
  register: UseFormRegister<any>;
} & ComponentProps<"input"> &
  VariantProps<typeof textInputVariants>;

const TextInput = ({
  id,
  label,
  errors,
  variant,
  register,
  className,
  wrapperClassName,
  ...props
}: ITextInputProps) => {
  return (
    <div className={cn("w-full", wrapperClassName)}>
      {label && (
        <label htmlFor={id} className={cn("font-semibold")}>
          {label}
        </label>
      )}

      <input
        id={id}
        className={cn(textInputVariants({ variant, className }), {
          "mt-2": label,
        })}
        {...(register && { ...register(id) })}
        {...props}
      />

      {errors && errors[id] && (
        <div className={cn("flex items-center gap-2 px-1 mt-2")}>
          <FiAlertCircle color={"#F43F5E"} />

          <span className={cn("text-sm text-rose-500")}>
            {(errors[id] as FieldError).message}
          </span>
        </div>
      )}
    </div>
  );
};

export default TextInput;
