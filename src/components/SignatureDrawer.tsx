import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, PencilBrush } from "fabric";
import { Button } from "@/components/ui/button";
import { Eraser, Pen, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

interface SignatureDrawerProps {
  onSignatureCreated: (signatureDataUrl: string) => void;
  onCancel: () => void;
}

export const SignatureDrawer = ({ onSignatureCreated, onCancel }: SignatureDrawerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 600,
      height: 300,
      backgroundColor: "#ffffff",
      isDrawingMode: true,
    });

    const brush = new PencilBrush(canvas);
    brush.color = "#000000";
    brush.width = 2;
    canvas.freeDrawingBrush = brush;

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
    toast.success("Canvas cleared");
  };

  const handleSave = () => {
    if (!fabricCanvas) return;
    const dataUrl = fabricCanvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 2,
    });
    onSignatureCreated(dataUrl);
    toast.success("Signature created!");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      onSignatureCreated(dataUrl);
      toast.success("Signature uploaded!");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-[0_20px_60px_-10px_hsl(var(--primary)/0.3)] p-6 max-w-3xl w-full space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Create Your Signature</h2>
          <p className="text-sm text-muted-foreground">
            Draw your signature below or upload an image
          </p>
        </div>

        <div className="border-2 border-border rounded-lg overflow-hidden">
          <canvas ref={canvasRef} className="w-full" />
        </div>

        <div className="flex flex-wrap gap-3 justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
            >
              <Pen className="mr-2 h-4 w-4" />
              Use This Signature
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
