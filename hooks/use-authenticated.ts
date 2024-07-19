import {create} from 'zustand';
import Cookies from 'js-cookie';
import getCookies from '@/helpers/get-cookies';


// Kullanıcı durumu interface'i
interface AuthState {
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
  controlUser: () => Promise<void>;
}

// Store oluşturma
const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  setAuthenticated: (auth) => set({ isAuthenticated: auth }),
  controlUser: async () => {
    //__Secure-authjs.session-token -- sitede bu var
    //! COOKIE KONTROL ILE USER CONTROL
    try {
      const cookiess = await getCookies(); // Await the async function
      const sessionCookie = cookiess.find(cookie => cookie.name === '__Secure-authjs.session-token');


      const isAuthenticated = !!sessionCookie; 
      set({ isAuthenticated });
    } catch (error) {
      console.error('Error fetching cookies:', error);
      set({ isAuthenticated: false });
    }
  }
}));

export default useAuthStore;
