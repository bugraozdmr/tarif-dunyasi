"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiBowlSteamFill } from "react-icons/pi";
import ClientLoading from "./client-loading";

const AddRecipeButton = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && <ClientLoading />}
      <div className="flex justify-center items-center h-full w-full mt-3">
        <Button
          className="w-full h-12 flex justify-center items-center mx-16 leading-relaxed"
          endContent={<PiBowlSteamFill size={25} />}
          onClick={() => {
            setLoading(true);
            router.push("/tarif/yeni");
          }}
        >
          <p className="text-lg md:text-2xl lg:text-3xl font-serif text-center text-gray-800 leading-relaxed">
            Tarif mi paylaşmak istiyorsun?
          </p>
        </Button>
      </div>
    </>
  );
};

export default AddRecipeButton;
