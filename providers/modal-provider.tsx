"use client";

import React from "react";

import { PreviewModal } from "../components/ui/preview-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if(!isMounted){
    return null;
  }

  return (
    <>
      <PreviewModal />
    </>
  );
};
