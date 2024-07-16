"use client";

import React, { useState } from "react";

import { Recipe } from "../types";

import { FaWhatsapp, FaFacebook, FaTelegram, FaTwitter } from "react-icons/fa";

import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { GetCategory } from "@/data/get-category-name";
import { formatCreatedAt } from "@/helpers/format-time";

// Avatar burdan import edilmezse hata alıyor
import { Avatar } from "@nextui-org/avatar";
import { usePathname } from "next/navigation";
import { Button, Textarea } from "@nextui-org/react";
import CommentCard from "./comments/comment-card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { SendIcon } from "lucide-react";

interface InfoProps {
  data: Recipe;
}

export const Info: React.FC<InfoProps> = ({ data }) => {
  const [isSending, setIsSending] = useState(false);

  // KONTROL AMACLI DESC
  const pathname = usePathname();

  const url = `${process.env.NEXT_PUBLIC_APP_URL}/${data.slug}`;

  // Get Category
  const category = GetCategory(data?.categoryId);

  // USER
  const user = useCurrentUser();

  // replacing instructions and recipes
  data.description = data.description.replace(/\n/g, "<br />");
  data.ingredients = data.ingredients.replace(/\n/g, "<br />");

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">{category?.name}</p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Oluşturuldu</h3>
          <div>{formatCreatedAt(data.createdAt)}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <Avatar
            isBordered
            color="secondary"
            src={data.user?.image}
            size="md"
          />
          <p className="text-gray-600 text-medium">{data.user?.name}</p>
        </div>
        {pathname === `/${data.slug}` && (
          <div className="flex flex-col gap-x-4">
            <h3 className="font-semibold text-black">İçindekiler</h3>
            <div>
              <p
                dangerouslySetInnerHTML={{
                  __html: data.ingredients,
                }}
              ></p>
            </div>
          </div>
        )}
        {pathname === `/${data.slug}` && (
          <div className="flex flex-col gap-x-4">
            <h3 className="font-semibold text-black">Hazırlanışı</h3>
            <div>
              <p
                dangerouslySetInnerHTML={{
                  __html: data.description,
                }}
              ></p>
            </div>
          </div>
        )}
      </div>
      <div className="mt-10 flex gap-x-3 flex-col">
        <p className="text-xl mb-2">Paylaş</p>
        <hr />
        <div className="mt-2 flex space-x-4">
          {/* Share Section */}
          <FacebookShareButton
            url={url}
            className="flex items-center justify-center rounded-full "
          >
            <FaFacebook className="w-7 h-7 text-blue-600 hover:text-blue-700" />
          </FacebookShareButton>
          <WhatsappShareButton
            url={url}
            className="flex items-center justify-center rounded-full"
          >
            <FaWhatsapp className="w-7 h-7 text-green-500 hover:text-green-600" />
          </WhatsappShareButton>
          <TwitterShareButton
            url={url}
            className="flex items-center justify-center rounded-full"
          >
            <FaTwitter className="w-7 h-7 text-blue-400 hover:text-blue-500" />
          </TwitterShareButton>
          <TelegramShareButton
            url={url}
            className="flex items-center justify-center rounded-full "
          >
            <FaTelegram className="w-7 h-7 text-blue-500 hover:text-blue-600" />
          </TelegramShareButton>
        </div>
      </div>
      {pathname === `/${data.slug}` && (
        <>
          <hr className="mt-6" />
          <div className="flex flex-col gap-x-4 mt-5">
            <h3 className="font-semibold text-black text-2xl mb-2">
              Yorumlar (0)
            </h3>
            {user && (
              <>
                <Textarea
                  label="Yorum Yaz"
                  variant="bordered"
                  placeholder="Tarif hakkında düşüncelerini belirt"
                  disableAnimation
                  disableAutosize
                  classNames={{
                    base: "w-full",
                    input: "resize-y min-h-[60px]",
                  }}
                />
                {isSending ? (
                  <Button
                    color="primary"
                    className="mt-1.5"
                    variant="bordered"
                    isLoading
                  >
                    <span className="text-lg">Gönderiliyor</span>
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    className="mt-1.5"
                    variant="bordered"
                    onClick={() => setIsSending(true)}
                  >
                    <span className="text-lg">Gönder</span> <SendIcon />
                  </Button>
                )}
              </>
            )}
            {/* COMMENT SECTION */}
            <div className="mt-2">
              {/* AVATARDAN HATA ALIYOR */}
              <CommentCard />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
