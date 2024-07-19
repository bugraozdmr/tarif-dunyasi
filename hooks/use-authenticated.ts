import {create} from 'zustand';
import Cookies from 'js-cookie';


// Kullanıcı durumu interface'i
interface AuthState {
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
  controlUser: () => void;
}

// Store oluşturma
const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  setAuthenticated: (auth) => set({ isAuthenticated: auth }),
  controlUser: () => {
    //__Secure-authjs.session-token
    //! COOKIE KONTROL ILE USER CONTROL
    const sessionCookie = Cookies.get();
    console.log(sessionCookie)
    const isAuthenticated = !!sessionCookie;
    set({ isAuthenticated });
  }
}));

export default useAuthStore;
