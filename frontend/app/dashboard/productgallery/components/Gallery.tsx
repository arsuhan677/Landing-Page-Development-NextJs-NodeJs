import { ProductGallery } from "@/types/gallery";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

interface GProps {
  productGallery: ProductGallery;
  refetch?: () => void;
}

export default function GalleryCard({ productGallery, refetch }: GProps) {
  return (
    <div className="flex items-center justify-between gap-4 border shadow-sm container mx-auto px-4 rounded-sm py-3 hover:bg-muted/50">
      <img
        src={productGallery.image}
        alt="gallery img"
        className="h-12 w-12 rounded-md object-cover"
      />

      {/* Actions */}
      <div className="flex gap-2">
        <EditButton id={productGallery.id} />
        <DeleteButton id={productGallery.id} onSuccess={refetch} />
      </div>
    </div>
  );
}
