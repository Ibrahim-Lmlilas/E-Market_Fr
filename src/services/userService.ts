import { apiClient } from "./apiClient";

export type UserProfile = {
  id: string;
  email: string;
  fullName: string;
  role?: string;
};

export const getCurrentUser = async () => {
  const { data } = await apiClient.get<UserProfile>("/users/me");
  return data;
};

