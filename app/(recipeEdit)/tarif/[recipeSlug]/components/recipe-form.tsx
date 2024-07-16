"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { Image, Recipe } from "@prisma/client";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { ImageUpload } from "@/components/ui/image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types";
import { Textarea } from "@nextui-org/react";

// duzgun tanimla interface'i
interface RecipeFormProps {
  initialData:
    | (Recipe & {
        images: Image[];
      })
    | null;
  categories: Category[];
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "İsim alanı gerekli",
  }),
  images: z.object({ url: z.string() }).array(),
  categoryId: z.union([z.number(), z.string()]),
  description: z.string().min(1).max(1000),
  ingredients: z.string().min(1).max(500),
});

type RecipeFormValues = z.infer<typeof formSchema>;

// boyle tanimlayinca direkt proplara vermemis oluruz
export const RecipeForm: React.FC<RecipeFormProps> = ({
  initialData,
  categories,
}) => {
  const title = initialData ? "Tarifi düzenle" : "Tarif oluştur";
  const description = initialData ? "Tarifi düzenle" : "Tarif oluştur";
  const toastMessage = initialData ? "Tarif düzenlendi" : "Tarif oluşturuldu";
  const action = initialData ? "Değişiklikleri kaydet" : "Oluştur";

  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          name: "",
          images: [],
          categoryId: 0,
          description: "",
          ingredients: "",
        },
  });

  const onSubmit = async (data: RecipeFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/recipes/${params.recipeSlug}`, data);
      } else {
        await axios.post(`/api/recipes`, data);
      }
      // route yenilenir bilgiler guncellenir
      router.push(`/`);
      // REFRESH SONRA OLMALIKI SAYFAYA DIREKT YENI BILGILER YANSISIN
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      console.log(error);
      toast.error("Bir şeyler ters gitti!");
    } finally {
      setLoading(false);
    }
  };

  // Vermesek mi
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/recipes/${params.recipeSlug}`);
      // sira onemli once push sonra refresh
      router.push(`/`);
      router.refresh();
      toast.success("Tarif silindi.");
    } catch (error) {
      console.log(error);
      toast.error("Bir şeyler ters gitti!");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            disabled={loading}
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {/* UPLOAD MULTIPLE IMAGE FIELD */}
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Resimler</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value?.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* NAME FIELD */}
          <div className="w-full gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tarif İsmi</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Bu tarifin adı ne?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Ingredients FIELD */}
          <div className="w-full gap-8">
            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>İçindekiler</FormLabel>
                  <FormControl>
                    <Textarea
                      label="İçindekiler ?"
                      disabled={loading}
                      placeholder="Marketten ne alınacak?"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full gap-8">
            {/* DESCRIPTION FIELD */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      label="Nasıl Yapılır ?"
                      disabled={loading}
                      placeholder="Nasıl yapıldığını açıkla"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full gap-8">
            {/* CATEGORY SELECT */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <FormControl>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()} // CHECK
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Kategoriyi seç"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id?.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
