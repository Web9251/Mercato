"use client"

import Image from "next/image"
import { useState } from "react"

function SingleProductImage({ images }: { images: string[] }) {
  const [currentImage, setCurrentImage] = useState(images[0])

  return (
    <div className="flex flex-col gap-3">
      <Image
        src={currentImage}
        alt="product image"
        height={480}
        width={480}
        unoptimized
        sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw "
        className="object-cover rounded-md aspect-square"
      />
      <div className="grid grid-cols-5 gap-3 ">
        {images.map((image, index) => {
          const currentClass =
            image === currentImage && "border border-destructive"
          return (
            <Image
              src={image}
              alt="product image"
              height={100}
              width={100}
              unoptimized
              sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw "
              className={`object-cover rounded-md aspect-square ${currentClass}`}
              key={index}
              onClick={() => setCurrentImage(image)}
            />
          )
        })}
      </div>
    </div>
  )
}
export default SingleProductImage
