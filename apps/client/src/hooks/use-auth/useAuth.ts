import { AppState, useAppState } from "../../global-state/zustand";

export const useAuth = () => {
  const user = useAppState((state: AppState) => state.user);
  const isAuthenticated = !!user;

  return {
    user,
    isAuthenticated,
  };
};
