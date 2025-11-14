import { apiClient } from "./apiClient";

export type UserProfile = {
  _id: string;
  email: string;
  fullName: string;
  role?: string;
  profileImage?: string | null;
  isDelete?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type UserProfileResponse = {
  success?: boolean;
  data?: UserProfile;
};

export const getCurrentUser = async (): Promise<UserProfile> => {
  const { data } = await apiClient.get<UserProfile | UserProfileResponse>("/users/me");
  
  if (typeof data === 'object' && data !== null && 'data' in data && 'success' in data) {
    return (data as UserProfileResponse).data!;
  }
  
  return data as UserProfile;
};

