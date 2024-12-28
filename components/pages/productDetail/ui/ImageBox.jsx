"use client";

import NextImage from "next/image";

import { useState, useEffect } from "react";

import { Image as NextImageUI } from "@nextui-org/react";
import { images } from "@/constants";

export default function ImageBox({ image = [], title = "Image" }) {
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    if (image.length > 0) {
      setImgUrl(image[0]);
    }
  }, [image]);

  const handleImageClick = (img) => {
    setImgUrl(img);
  };

  return (
    <div className="w-full xl:w-[50%] flex flex-col items-center box border rounded-md p-4">
      <div className="w-full flex justify-center mb-4">
        {imgUrl ? (
          <NextImageUI
            src={imgUrl}
            as={NextImage}
            width={500}
            height={500}
            alt={title}
            className="rounded-md object-contain"
            showSkeleton
          />
        ) : (
          <div className="w-[500px] h-[500px] flex items-center justify-center bg-gray-100 text-gray-500 rounded-md">
            No Image
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {image.length > 0 ? (
          image.map((img, index) => (
            <NextImageUI
              key={index}
              src={img}
              as={NextImage}
              width={100}
              height={100}
              alt={`${title} thumbnail ${index + 1}`}
              className={`cursor-pointer rounded-md object-cover ${
                img === imgUrl
                  ? "border-2 border-blue-500"
                  : "border border-gray-300"
              }`}
              onClick={() => handleImageClick(img)}
              showSkeleton
              fallbackSrc={images.image_not_found}
            />
          ))
        ) : (
          <p className="text-gray-500">No thumbnails available</p>
        )}
      </div>
    </div>
  );
}
