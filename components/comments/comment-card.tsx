import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Avatar } from "@nextui-org/avatar";
import { Comment } from "@/types";
import { formatCreatedAt } from "@/helpers/format-time";
import { Calendar, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { AlertModal } from "../modals/alert-modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UseCurrentRole } from "@/hooks/use-current-role";
import useAuthStore from "@/hooks/use-authenticated";

export const CommentCard: React.FC<{ data: Comment,slug:string }> = ({ data,slug }) => {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  // CONTEXT CEKILDI
  const { isAuthenticated, setAuthenticated } = useAuthStore();

  const router = useRouter();

  const role = UseCurrentRole();

  // eğer böyle fonk içindeyse client ile beraber kullanılabiliyor server işi şeyler
  const onDelete = async () => {
    try {
      setPending(true);
      await axios.delete(`/api/comments/${data.id}`);
      router.push(`/${slug}`);
      router.refresh();
      toast.success("Yorum silindi.");
    } catch (error) {
      console.log(error);
      toast.error("Bir şeyler ters gitti");
    } finally {
      setPending(false);
      setOpen(false);
    }
  };

  return (
    <>
      {/* ALERT MODAL BURDA DURACAK */}
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={pending}
      />

      <Card className="w-full mt-2">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar isBordered radius="full" size="md" src={data.user.image} />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {data.user.name}
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                Üye
              </h5>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400">
          <p>{data.text}</p>
        </CardBody>
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">
              <Calendar />
            </p>
            <p className=" text-default-400 text-small mt-1">
              {formatCreatedAt(data.createdAt)}
            </p>
          </div>
        </CardFooter>
        {role === 'ADMIN' && isAuthenticated && (
          <div className="w-full flex justify-center">
          <Button
          className="w-full"
            variant="destructive"
            onClick={() => setOpen(true)}
            disabled={pending}
          >
            <Trash />
          </Button>
        </div>
        )}
      </Card>
    </>
  );
};
