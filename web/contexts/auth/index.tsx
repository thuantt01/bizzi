import React, {
  useRef,
  ReactNode,
  useState,
  useContext,
  createContext,
} from "react";

import { initAuth, TokenInfo, cleanAuth } from "@/libs/cookies";

type AuthProviderProps = {
  user: TokenInfo;
  children: ReactNode;
  authenticated: boolean;
};

interface AuthContextTypes {
  user: TokenInfo;
  isAuth: boolean;
  useCleanAuth: () => boolean;
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

  const useCleanAuth = () => {
    cleanAuth();
    setAuth(false);

    return true;
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, useInitAuth, user: userRef.current, useCleanAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth };

export default AuthProvider;
