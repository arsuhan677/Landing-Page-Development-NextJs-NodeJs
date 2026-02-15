import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

interface AfterBeforProps {
  afterBefor: {
    id: string;
    before: string;
    after: string;
  };
  refetch?: () => void;
}

export default function AfterPage({ afterBefor, refetch }: AfterBeforProps) {
  return (
    <div className="flex items-center justify-between gap-4 border shadow-sm container mx-auto px-4 rounded-sm py-3 hover:bg-muted/50">
      
      {/* Before Image */}
      <img
        src={afterBefor.before}
        alt="Before"
        className="h-12 w-12 rounded-md object-cover"
      />

      {/* After Image */}
      <img
        src={afterBefor.after}
        alt="After"
        className="h-12 w-12 rounded-md object-cover"
      />

      {/* Actions */}
      <div className="flex gap-2">
        <EditButton id={afterBefor.id} />
        <DeleteButton id={afterBefor.id} onSuccess={refetch} />
      </div>
    </div>
  );
}
