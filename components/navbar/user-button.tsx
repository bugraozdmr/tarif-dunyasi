"use client";
import { logout } from "@/actions/signout";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import { Avatar } from "@nextui-org/avatar";
import { LogOut, User } from "lucide-react";

import UserImage from "@/public/user.png";
import { useRouter } from "next/navigation";

import { Button as CustomButton } from "@/components/ui/button";
import useAuthStore from "@/hooks/use-authenticated";
import { useEffect } from "react";


//? ZUSTAND ILE CONTEXT OLUSTURULDU ORDAN ALINIYOR AUTH

export const UserButton = () => {

  // CONTEXT CEKILDI
  const { controlUser , isAuthenticated, setAuthenticated } = useAuthStore();

  const user = useCurrentUser();

  const router = useRouter();

  useEffect(() => {
    // eger oncesinde baska resimli hesapla girdiysen sorun olur
    // ama ustune tıklayınca gidiyor
    controlUser();
  },[controlUser]);

  if (!isAuthenticated) {
    return (
        <CustomButton onClick={() => router.push("/auth/login")}>
          <User className="mr-2 h-4 w-4" /> Giriş Yap
        </CustomButton>
      );
  }


  //! BOYLE ISE ASYNC IZIN VAR DENMISTI
  const handleLogout = async () => {
    try {
      const result = await logout();
  
      if (result.success) {
        setAuthenticated(false);
        router.push("/");
      } else {
        console.error("Bir hata oluştu.");
      }
    } catch (error) {
      console.error("Logout işlemi sırasında bir hata oluştu:", error);
    }
  }

  return (
    <>
    {isAuthenticated && (
        <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="warning"
            name="Grant Alemdar"
            size="sm"
            src={user?.image ? user.image : UserImage.src}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Giriş yapıldı</p>
            <p className="font-semibold">{user?.email}</p>
          </DropdownItem>
          <DropdownItem key="settings" onClick={() => router.push("/ayarlar")}>
            Ayarlar
          </DropdownItem>
          <DropdownItem key="analytics" onClick={() => router.push("/tarif")} >Tariflerim</DropdownItem>
          <DropdownItem key="help_and_feedback" onClick={() => router.push("/server")}>Kullanıcı Hakkında</DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            onClick={handleLogout}
          >
            <LogOut />
            Çıkış Yap
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )}
    </>
  );
};