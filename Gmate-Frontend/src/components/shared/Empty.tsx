import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyProps {
  onAdd: () => void;
}

export default function Empty({ onAdd }: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center border-2 border-dashed border-border rounded-[3rem] bg-muted/20">
      <div className="bg-background text-muted-foreground/30 mb-6 flex h-20 w-20 items-center justify-center rounded-[2rem] shadow-inner">
        <Plus size={40} />
      </div>
      <h3 className="text-xl font-bold tracking-tight">No items found</h3>
      <p className="text-muted-foreground mt-2 max-w-xs text-sm font-medium mb-10">
        It looks like there's nothing here yet. Start by creating your first entry.
      </p>
      <Button 
        onClick={onAdd}
        className="rounded-full px-8 h-12 font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
      >
        <Plus className="mr-2 h-5 w-5" />
        Add New Item
      </Button>
    </div>
  );
}
