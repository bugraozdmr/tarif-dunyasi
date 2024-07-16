"use client";

import { Textarea } from "@nextui-org/react";
import { SendIcon } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";

import { Input } from "@/components/ui/input";

import axios from "axios";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Controller, useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { notFound, useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";

const formSchema = z.object({
  text: z.string().min(1, {
    message: "Yorum alanı gerekli",
  }),
  userId: z.string().min(1),
  recipeId: z.string().min(1),
});

type CommentFormValues = z.infer<typeof formSchema>;

const CommentForm = ({ recipeId }: { recipeId: string }) => {
  const [isSending, setIsSending] = useState(false);

  const router = useRouter();

  // user
  const user = useCurrentUser();

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      userId: user?.id,
      recipeId: recipeId,
    },
  });

  if (!user) {
    return notFound();
  }

  const onSubmit = async (data: CommentFormValues) => {
    try {
      setIsSending(true);
      await axios.post(`/api/comments`, data);
      // route yenilenir bilgiler guncellenir
      console.log(data);
      router.refresh();
      toast.success("Yorum gönderildi");
    } catch (error) {
      console.log(error);
      toast.error("Bir şeyler ters gitti!");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>İçindekiler</FormLabel>
                <FormControl>
                  <Textarea
                    label="Yorum Yaz"
                    variant="bordered"
                    placeholder="Tarif hakkında düşüncelerini belirt"
                    disableAnimation
                    disableAutosize
                    {...field}
                    classNames={{
                      base: "w-full",
                      input: "resize-y min-h-[60px]",
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Controller
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Controller
            control={form.control}
            name="recipeId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="hidden" placeholder="Product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {isSending ? (
              <Button
                color="primary"
                className="w-full"
                variant="bordered"
                isLoading
              >
                <span className="text-lg">Gönderiliyor</span>
              </Button>
            ) : (
              <Button
                color="primary"
                className="w-full"
                variant="bordered"
                type="submit"
              >
                <span className="text-lg">Gönder</span> <SendIcon />
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
};

export default CommentForm;
