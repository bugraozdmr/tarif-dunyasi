import {create} from 'zustand';

// Kullanıcı durumu interface'i
interface AuthState {
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
}

// Store oluşturma
const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  setAuthenticated: (auth) => set({ isAuthenticated: auth }),
}));

export default useAuthStore;
