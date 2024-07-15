import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Avatar} from "@nextui-org/react";

export default function CommentCard() {

  return (
    <Card className="w-full">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
            <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>
          DATA gelcek
        </p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">Katılma tarihi</p>
          <p className=" text-default-400 text-small">TARİH GELCEK</p>
        </div>
      </CardFooter>
    </Card>
  );
}