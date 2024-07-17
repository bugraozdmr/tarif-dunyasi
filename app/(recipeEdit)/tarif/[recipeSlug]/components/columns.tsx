"use client"
// https://ui.shadcn.com/docs/components/data-table
import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type RecipeColumn = {
  id: string
  name: string
  slug : string
  createdAt : string
}

export const columns: ColumnDef<RecipeColumn>[] = [
  {
    accessorKey: "name",
    header: "Tarif Adı",
  },
  {
    accessorKey: "createdAt",
    header: "Tarih",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
]
