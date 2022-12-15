import dynamic from "next/dynamic";

const SignInDialog = dynamic(
  () => import("@/features/home/dialogs/sign-in/layout")
);

export default SignInDialog;
