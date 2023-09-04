import { LoginResponse } from "@task-management/api";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface AppState {
  user: LoginResponse["user"] | undefined;
  setUser: (user: LoginResponse["user"]) => void;
  removeUser: () => void;
}

export const useAppState = create<AppState>()(
  devtools(
    immer((set) => ({
      user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user") as string)
        : undefined || undefined,

      setUser: (user) =>
        set((state) => {
          state.user = user;
        }),

      removeUser: () =>
        set((state) => {
          state.user = undefined;
        }),
    })),
  ),
);
