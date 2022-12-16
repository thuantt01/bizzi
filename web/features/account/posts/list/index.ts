import dynamic from "next/dynamic";

const AccountPostsLayout = dynamic(
  () => import("@/features/account/posts/list/layout")
);

export default AccountPostsLayout;
