import LoginRegisterLayout from "@/layouts/login-register-layout";

export const Layouts = {
  Main: LoginRegisterLayout,
};

export type LayoutKeys = keyof typeof Layouts;
