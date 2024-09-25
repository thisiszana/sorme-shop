"use client";

import NextImage from "next/image";

import { useState } from "react";

import { Image } from "@nextui-org/react";

export default function ImageBox({ image, title }) {
  const [imgUrl, setImgUrl] = useState("");
  return (
    <div className="w-full xl:w-[50%] h-fit flex flex-col items-center box border">
      <div className="w-full xl:w-[50%] flex justify-center mb-4">
        {image?.map((img, index) => (
          <Image
            src={img}
            as={NextImage}
            key={index}
            width={500}
            height={500}
            alt={title}
            className="rounded-box"
            onClick={() => setImgUrl(img)}
          />
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Image
          src={imgUrl}
          width={100}
          height={100}
          className="rounded-box object-cover"
        />
      </div>
    </div>
  );
}
