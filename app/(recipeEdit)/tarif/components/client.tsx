"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { RecipeColumn, columns } from "../[recipeSlug]/components/columns";
import { DataTable } from "@/components/ui/data-table";

interface RecipesClientProps{
  data : RecipeColumn[]
}

export const RecipesClient : React.FC<RecipesClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${data.length})`}
          description="Manage colors for your store"
        />
      </div>
      <Separator />
      {/* Data table'a gore arama yap */}
      <DataTable
      searchKey="name" 
      columns={columns}
      data={data}
      />
    </>
  );
};
