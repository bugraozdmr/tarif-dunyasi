import React from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import {Avatar} from "@nextui-org/avatar";
import { Comment } from "@/types";
import { formatCreatedAt } from "@/helpers/format-time";
import { Calendar } from "lucide-react";



export const CommentCard: React.FC<{ data: Comment }> = ({ data }) => {
  return (
    <Card className="w-full mt-2">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={data.user.image} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{data.user.name}</h4>
            <h5 className="text-small tracking-tight text-default-400">Üye</h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>
        {data.text}
        </p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small"><Calendar /></p>
          <p className=" text-default-400 text-small mt-1">{formatCreatedAt(data.createdAt)}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
