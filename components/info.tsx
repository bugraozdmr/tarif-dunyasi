"use client";

import React, { useState } from "react";

import { Comment, Recipe } from "../types";

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
import { usePathname, useRouter } from "next/navigation";
import { CommentCard } from "./comments/comment-card";
import { useCurrentUser } from "@/hooks/use-current-user";
import CommentForm from "./comments/comment-form";
import { Button } from "./ui/button";
import { Edit, Trash } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { AlertModal } from "./modals/alert-modal";
import { UseCurrentRole } from "@/hooks/use-current-role";
import ClientLoading from "./client-loading";

interface InfoProps {
  data: Recipe;
  comment_count: number;
  comments: Comment[];
}

export const Info: React.FC<InfoProps> = ({
  data,
  comment_count,
  comments,
}) => {
  // Modal Checker
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const [loading,setLoading] = useState(false);

  const router = useRouter();

  // KONTROL AMACLI DESC
  const pathname = usePathname();

  const url = `${process.env.NEXT_PUBLIC_APP_URL}/${data.slug}`;

  // Get Category
  const category = GetCategory(data?.categoryId);

  // USER
  const user = useCurrentUser();

  // ROLE
  const role = UseCurrentRole();

  // replacing instructions and recipes
  data.description = data.description.replace(/\n/g, "<br />");
  data.ingredients = data.ingredients.replace(/\n/g, "<br />");

  // eğer böyle fonk içindeyse client ile beraber kullanılabiliyor server işi şeyler
  const onDelete = async () => {
    try {
      setPending(true);
      await axios.delete(`/api/recipes/${data.slug}`);
      router.push(`/`);
      router.refresh();
      toast.success("Tarif silindi.");
    } catch (error) {
      console.log(error);
      toast.error("Bir şeyler ters gitti");
    } finally {
      setPending(false);
      setOpen(false);
    }
  };

  return (
    <div>
      {/* LOADING COMP */}
      {loading && (
        <ClientLoading />
  
      )}
      {/* ALERT MODAL BURDA DURACAK */}
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={pending}
      />

      {pathname === `/${data.slug}` && role === 'ADMIN' && (
        <div className="flex flex-row justify-center mx-5 mb-8">
          <Button
            variant="destructive"
            onClick={() => setOpen(true)}
            disabled={pending}
          >
            <Trash />
          </Button>
          <Button
            variant="secondary"
            className="ml-4"
            disabled={pending}
            onClick={() => {
              setLoading(true);
              router.push(`/tarif/${data.slug}`);
            }}
          >
            <Edit />
          </Button>
        </div>
      )}

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
              Yorumlar ({comment_count})
            </h3>
            {user && (
              <>
                <CommentForm recipeId={data.id} />
              </>
            )}
            {!user && (
              <>
                <Button
                  variant="link"
                  color="primary"
                  onClick={() => router.push("/auth/login")}
                >
                  Yorum yazmak için giriş yap
                </Button>
              </>
            )}
            {/* COMMENT SECTION */}
            <div className="mt-4">
              {comment_count === 0 && (
                <div className="text-xl font-semibold text-center">
                  Gösterilecek yorum yok
                </div>
              )}
              {comment_count !== 0 && (
                <>
                  {comments.map((comment, index) => (
                    <CommentCard key={index} data={comment} slug={data.slug} />
                  ))}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
