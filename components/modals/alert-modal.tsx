'use client';

import { useEffect, useState } from "react";
import { Modal } from "../ui/modal_A";
import { Button } from "../ui/button";

interface AlertModalProps{
    isOpen:boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

export const AlertModal : React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading
}) => {
    const [isMounted,SetIsMounted] = useState(false);

    useEffect(() => {
        SetIsMounted(true);
    },[]);

    if(!isMounted){
        return null;
    }

    return (
        <Modal
        title="Emin misin ?"
        description="Bu işlem geri alınamaz."
        isOpen={isOpen}
        onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                disabled={loading}
                variant='outline'
                onClick={onClose}
                >
                    İptal et
                </Button>
                <Button
                disabled={loading}
                variant='destructive'
                onClick={onConfirm}
                >
                    Devam et
                </Button>
            </div>
        </Modal>
    )
}