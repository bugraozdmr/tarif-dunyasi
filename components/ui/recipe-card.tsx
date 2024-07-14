"use client";

import React from "react";

import toast from "react-hot-toast";


import { Recipe } from "../../types";
import Image from "next/image";
import { IconButton } from "./icon-button";
import { Copy, Expand } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import usePreviewModal from "../../hooks/use-preview-modal";

interface RecipeCardProps {
  data: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ data }) => {
  const previewModal = usePreviewModal();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${data?.slug}`);
  };

  const onPreview : MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  }

  // emin degilim duzeltme gerekir
  const onCopy = (link: string): MouseEventHandler<HTMLButtonElement> => (event) => {
    event.stopPropagation();
    navigator.clipboard.writeText(link);
    toast.success("Copied to the clipboard");
  };
  

  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      {/* Images and Actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          alt="Image"
          src={data?.images?.[0]?.url}
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={() => onCopy(data?.slug)}
              icon={<Copy size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="font-semibold text-gray-500">{data.Category?.name}</p>
      </div>
      {/* TODO */}
      <div className="flex items-center justify-between">
        TODO
      </div>
    </div>
  );
};
