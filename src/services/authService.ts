import { apiClient } from "./apiClient";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  fullName: string;
};

export type RegisterResponse = {
  message: string;
};

export type LogoutResponse = {
  message: string;
};

export const login = async (payload: LoginPayload) => {
  const { data } = await apiClient.post<LoginResponse>("/auth/login", payload);
  return data;
};

export const register = async (payload: RegisterPayload) => {
  const { data } = await apiClient.post<RegisterResponse>(
    "/auth/register",
    payload,
  );
  return data;
};

export const logout = async () => {
  const { data } = await apiClient.post<LogoutResponse>("/auth/logout");
  return data;
};

