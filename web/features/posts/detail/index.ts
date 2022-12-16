import dynamic from "next/dynamic";

const PostLayout = dynamic(() => import("@/features/posts/detail/layout"));

export default PostLayout;
