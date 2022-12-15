import React, {
  useRef,
  ReactNode,
  useState,
  useContext,
  createContext,
} from "react";

import { initAuth, TokenInfo } from "@/libs/cookies";

type AuthProviderProps = {
  user: TokenInfo;
  children: ReactNode;
  authenticated: boolean;
};

interface AuthContextTypes {
  user: TokenInfo;
  isAuth: boolean;
  useInitAuth: (token: string) => void;
}

export const AuthContext = createContext<AuthContextTypes>(
  {} as AuthContextTypes
);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children, authenticated, user }: AuthProviderProps) => {
  const userRef = useRef(user);
  const [isAuth, setAuth] = useState<boolean>(authenticated);

  const useInitAuth = (token: string) => {
    if (!token) {
      return false;
    }
    const [ok, user] = initAuth(token);

    userRef.current = user as TokenInfo;
    return setAuth(ok as boolean);
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, useInitAuth, user: userRef.current }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth };

export default AuthProvider;
