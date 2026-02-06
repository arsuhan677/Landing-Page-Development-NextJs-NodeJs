import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardFooter,
} from "@/components/ui/card"



import { ProductGallery } from "@/types/gallery";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

interface GProps {
  productGallery: ProductGallery;
  refetch?: () => void;
}

export default function GalleryPage({ productGallery, refetch }: GProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm flex border pt-0">
      
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />

      <img
        src={productGallery.image}
        alt="gallery img"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
      />

      <CardFooter className="flex gap-2">
        <EditButton id={productGallery.id} />
        <DeleteButton id={productGallery.id} onSuccess={refetch} />
      </CardFooter>
    </Card>
  )
}
