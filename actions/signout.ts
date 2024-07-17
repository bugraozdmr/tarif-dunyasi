'use server';


import { signOut } from "@/auth";
import { revalidatePath } from "next/cache";


export const logout = async () => {

    // some server stuff
    await signOut({
        redirectTo : '/'
    });
    
    revalidatePath(`/`,"layout");
}