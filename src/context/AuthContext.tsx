import {createContext,useCallback,useContext,useEffect,useMemo,useState,type ReactNode,} from "react";
import { isAxiosError } from "axios";
import { setAuthToken } from "../services/apiClient";
import {login as loginRequest,logout as logoutRequest,register as registerRequest,type LoginPayload, type RegisterPayload,} from "../services/authService";
import { getCurrentUser, type UserProfile } from "../services/userService";

type AuthContextValue = {
  user: UserProfile | null;
  token: string | null;
  isInitializing: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AUTH_STORAGE_KEY = "emarket_token";

const parseError = (error: unknown) => {
  if (isAxiosError(error)) {
    const data = error.response?.data as { message?: string; error?: string };
    return data?.message ?? data?.error ?? error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Une erreur inattendue s'est produite.";
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(AUTH_STORAGE_KEY),
  );
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const clearSession = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setToken(null);
    setUser(null);
    setAuthToken(null);
  }, []);

  const hydrateUser = useCallback(async () => {
    try {
      const profile = await getCurrentUser();
      setUser(profile);
    } catch (error) {
      console.warn("Impossible de récupérer le profil :", error);
      clearSession();
    }
  }, [clearSession]);

  useEffect(() => {
    const existingToken = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!existingToken) {
      setIsInitializing(false);
      return;
    }

    setToken(existingToken);
    setAuthToken(existingToken);

    hydrateUser().finally(() => setIsInitializing(false));
  }, [hydrateUser]);

  const login = useCallback(
    async (payload: LoginPayload) => {
      try {
        const { accessToken } = await loginRequest(payload);
        localStorage.setItem(AUTH_STORAGE_KEY, accessToken);
        setToken(accessToken);
        setAuthToken(accessToken);
        await hydrateUser();
      } catch (error) {
        clearSession();
        throw new Error(parseError(error));
      }
    },
    [clearSession, hydrateUser],
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      try {
        await registerRequest(payload);
        await login({ email: payload.email, password: payload.password });
      } catch (error) {
        throw new Error(parseError(error));
      }
    },
    [login],
  );

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } catch (error) {
      console.warn("Erreur lors de la déconnexion :", error);
    } finally {
      clearSession();
    }
  }, [clearSession]);

  const value = useMemo(
    () => ({
      user,
      token,
      isInitializing,
      login,
      register,
      logout,
    }),
    [user, token, isInitializing, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};

