import {
  Card,
  CardFooter,
} from "@/components/ui/card";

import { ProductGallery } from "@/types/gallery";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

interface GProps {
  productGallery: ProductGallery;
  refetch?: () => void;
}

export default function GalleryCard({ productGallery, refetch }: GProps) {
  return (
    <Card className="border pt-0 overflow-hidden shadow-sm hover:shadow-md transition grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      {/* Image */}
      <div className="relative">
        <img
          src={productGallery.image}
          alt="gallery img"
          className="aspect-video w-full object-cover"
        />
      </div>

      {/* Footer */}
      <CardFooter className="flex justify-between items-center p-4">
        <div className="flex gap-2">
          <EditButton id={productGallery.id} />
          <DeleteButton id={productGallery.id} onSuccess={refetch} />
        </div>
      </CardFooter>

    </Card>
  );
}

