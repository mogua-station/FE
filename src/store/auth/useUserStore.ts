import { create } from "zustand";

interface User {
  id: string;
  email: string;
  nickname: string;
  imageUrl: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
    localStorage.setItem("user", JSON.stringify(user));
  },
  clearUser: () => {
    set({ user: null });
    localStorage.removeItem("user");
  },
}));

export default useUserStore;
