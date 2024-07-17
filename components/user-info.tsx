import React from "react";

import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {

  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {user?.role === 'ADMIN' && (
          <>
            {/* ID */}
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <p className="text-sm font-medium">ID</p>
              <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                {user?.id}
              </p>
            </div>
          </>
        )}
        {/* Name */}
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">İsim</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.name}
          </p>
        </div>
        {/* Email */}
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.email}
          </p>
        </div>
        {/* Role */}
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Rolü</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.role === 'USER' && (
                <>KULLANICI</>
            )}
            {user?.role === 'ADMIN' && (
                <>ADMIN</>
            )}
          </p>
        </div>
        {/* 2FA */}
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">İki aşamalı doğrulama</p>
          {/* success verildi ekstra badge'e */}
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "AKTİF" : "KAPALI"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
