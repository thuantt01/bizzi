import JwtDecode from "jwt-decode";

import {
  getCookie,
  setCookies,
  checkCookies,
  removeCookies,
} from "cookies-next";
import { GetServerSidePropsContext } from "next";

export const TokenNameSpace = "token";

export type TokenInfo = { email: string; name: string };

export const getAuth = ({ req, res }: GetServerSidePropsContext) => {
  const init = { isAuth: false, user: null };

  const token = getCookie(TokenNameSpace, { req, res }) as string;
  if (!token) {
    return init;
  }

  try {
    const { name, email } = JwtDecode(token) as TokenInfo;

    return { isAuth: true, user: { name, email } };
  } catch (ex) {
    return init;
  }
};

export const initAuth = (token: string) => {
  try {
    const { exp, name, email } = JwtDecode(token) as {
      exp: number;
    } & TokenInfo;

    setCookies(TokenNameSpace, token, { expires: new Date(exp * 1000) });

    return [true, { name, email }];
  } catch (_) {
    return [false, null];
  }
};

export { getCookie, setCookies, checkCookies, removeCookies };
