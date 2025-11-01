import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, PencilBrush } from "fabric";
import { Button } from "@/components/ui/button";
import { Trash2, Pen } from "lucide-react";
import { toast } from "sonner";

interface SignatureDrawerProps {
  onSignatureCreated: (signatureDataUrl: string) => void;
  onCancel: () => void;
}

export const SignatureDrawer = ({ onSignatureCreated, onCancel }: SignatureDrawerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);

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

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-[0_20px_60px_-10px_hsl(var(--primary)/0.3)] p-6 max-w-3xl w-full space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Create Your Signature</h2>
          <p className="text-sm text-muted-foreground">
            Draw your signature below using your mouse or touchpad
          </p>
        </div>

        <div className="border-2 border-border rounded-lg overflow-hidden">
          <canvas ref={canvasRef} className="w-full" />
        </div>

        <div className="flex flex-wrap gap-3 justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear
          </Button>

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
