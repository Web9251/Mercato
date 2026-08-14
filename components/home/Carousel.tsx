import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Banner1 from "@/public/images/banner-1.jpg"
import Banner2 from "@/public/images/banner-2.jpg"
import Image from "next/image"

const images = [Banner1, Banner2]

export default function CarouselHome() {
  return (
    <Carousel>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Card className="bg-transparent">
              <CardContent className="flex items-center justify-center">
                <Image src={image} alt="" className="rounded-md object-cover" />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
