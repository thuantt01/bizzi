import dynamic from "next/dynamic";

const HomeLayout = dynamic(() => import("@/features/home/layout"));

export default HomeLayout;
