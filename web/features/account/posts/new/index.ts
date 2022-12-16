import dynamic from "next/dynamic";

const AccountPostNewLayout = dynamic(
  () => import("@/features/account/posts/new/layout")
);

export default AccountPostNewLayout;
