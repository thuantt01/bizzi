import dynamic from "next/dynamic";

const SignUpDialog = dynamic(
  () => import("@/features/home/dialogs/sign-up/layout")
);

export default SignUpDialog;
