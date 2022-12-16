import { GetServerSidePropsContext } from "next";
import { getAuth } from "@/libs/cookies";

// TODO: refactor any params
const withAuthServerSideProps = (
  getServerSidePropsFunc: any,
  options = { isPublic: true }
) => {
  return async (context: GetServerSidePropsContext) => {
    const { isPublic } = options;
    const { isAuth, user } = getAuth(context);

    const { props: pageProps, redirect } = await getServerSidePropsFunc(
      context
    );

    if (redirect) {
      return {
        redirect: {
          ...redirect,
        },
      };
    }

    if (!isPublic && !isAuth) {
      return {
        redirect: {
          destination: "/",
        },
      };
    }

    return {
      props: {
        ...pageProps,
        isAuth,
        user,
      },
    };
  };
};

export default withAuthServerSideProps;
