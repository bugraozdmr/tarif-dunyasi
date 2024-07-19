'use server';

import { signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect";

//! BOYLE YAPMAK ZORUNDA KALDIM ASLINDA LOGOUT OLUYOR AMA REDIRECT ERROR DONUYOR ONU YAKALAMAK ZORUNLU DIGER HATALARDA SUCCESS FALSE DONECEKTIR ZATEN
export const logout = async () => {
    try {
        await signOut();

        return { success: true };
      } catch (error) {
        console.log(2312);
        if (isRedirectError(error)) {
            return { success: true };
        }
        return { success: false};
        
      }
}