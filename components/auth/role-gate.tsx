'use client';

import { UseCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import React from "react";
import { FormError } from "../form-error";

interface RoleGateProps{
    children : React.ReactNode,
    allowedRole : UserRole
};

export const RoleGate = ({
    children,
    allowedRole
} : RoleGateProps) => {
    const role = UseCurrentRole();

    if(role !== allowedRole){
        return (
            <FormError message="Bu içeriği görmek için yetkin yok" />
        )
    }

    return (
        <>
            {children}
        </>
    );
}