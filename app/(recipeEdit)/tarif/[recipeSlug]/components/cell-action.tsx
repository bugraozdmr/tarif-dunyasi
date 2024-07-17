"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { RecipeColumn } from "./columns";

interface CellActionProps {
  data: RecipeColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {

  const router = useRouter();


  const onCopy = (slug: string) => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/${slug}`);
    toast.success("Panoya kopyalandı");
  };

  // DELETE ISLEMI SILINDI KULLANICI SILEMEZ USTA

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            {/* sadece screen viewer gozukur diyor */}
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.slug)}>
            <Copy className="mr-2 h-4 w-4" />
            Linki kopyala
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/tarif/${data.slug}`)
            }
          >
            <Edit className="mr-2 h-4 w-4" />
            Düzenle
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
