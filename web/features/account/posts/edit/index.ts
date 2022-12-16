import dynamic from "next/dynamic";

const AccountPostEditLayout = dynamic(
  () => import("@/features/account/posts/edit/layout")
);

export default AccountPostEditLayout;
