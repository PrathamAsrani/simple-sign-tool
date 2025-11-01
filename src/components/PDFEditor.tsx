import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Download, Upload as UploadIcon, ArrowLeft, RotateCcw } from "lucide-react";
import { SignatureDrawer } from "./SignatureDrawer";
import { toast } from "sonner";
import { saveAs } from "file-saver";

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

interface PDFEditorProps {
  file: File;
  onBack: () => void;
}

interface SignaturePosition {
  x: number;
  y: number;
  width: number;
  height: number;
  dataUrl: string;
  page: number;
}

type ResizeHandle = "nw" | "ne" | "sw" | "se" | null;

export const PDFEditor = ({ file, onBack }: PDFEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const signatureImageRef = useRef<HTMLImageElement | null>(null);
  const [showSignatureDrawer, setShowSignatureDrawer] = useState(false);
  const [signature, setSignature] = useState<SignaturePosition | null>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<ResizeHandle>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [signatureStart, setSignatureStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadPDF();
  }, [file]);

  useEffect(() => {
    if (pdfDoc && currentPage) {
      renderPage(currentPage);
    }
  }, [pdfDoc, currentPage]);

  useEffect(() => {
    drawSignatureOverlay();
  }, [signature]);

  const loadPDF = async () => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setPdfDoc(pdf);
      setNumPages(pdf.numPages);
      setCurrentPage(1);
    } catch (error) {
      toast.error("Failed to load PDF");
      console.error(error);
    }
  };

  const renderPage = async (pageNum: number) => {
    if (!pdfDoc || !canvasRef.current || !overlayCanvasRef.current) return;

    try {
      const page = await pdfDoc.getPage(pageNum);
      
      // Calculate scale to fit container
      const containerWidth = containerRef.current?.clientWidth || 800;
      const desiredWidth = Math.min(containerWidth - 48, 900);
      const viewport = page.getViewport({ scale: 1 });
      const scale = desiredWidth / viewport.width;
      const scaledViewport = page.getViewport({ scale });

      const canvas = canvasRef.current;
      const overlayCanvas = overlayCanvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;
      overlayCanvas.width = scaledViewport.width;
      overlayCanvas.height = scaledViewport.height;

      if (context) {
        await page.render({
          canvasContext: context,
          viewport: scaledViewport,
        }).promise;
      }

      drawSignatureOverlay();
    } catch (error) {
      console.error("Error rendering page:", error);
      toast.error("Failed to render PDF page");
    }
  };

  const drawSignatureOverlay = () => {
    if (!overlayCanvasRef.current) return;
    
    const canvas = overlayCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear overlay
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw signature if on current page
    if (signature && signature.page === currentPage && signatureImageRef.current) {
      ctx.drawImage(
        signatureImageRef.current,
        signature.x,
        signature.y,
        signature.width,
        signature.height
      );

      // Draw selection border and handles
      ctx.strokeStyle = "hsl(var(--primary))";
      ctx.lineWidth = 2;
      ctx.strokeRect(signature.x, signature.y, signature.width, signature.height);

      // Draw resize handles
      const handleSize = 10;
      const handles = [
        { x: signature.x, y: signature.y }, // nw
        { x: signature.x + signature.width, y: signature.y }, // ne
        { x: signature.x, y: signature.y + signature.height }, // sw
        { x: signature.x + signature.width, y: signature.y + signature.height }, // se
      ];

      ctx.fillStyle = "#ffffff";
      handles.forEach((handle) => {
        ctx.strokeRect(
          handle.x - handleSize / 2,
          handle.y - handleSize / 2,
          handleSize,
          handleSize
        );
        ctx.fillRect(
          handle.x - handleSize / 2,
          handle.y - handleSize / 2,
          handleSize,
          handleSize
        );
      });
    }
  };

  const handleSignatureCreated = (dataUrl: string) => {
    const img = new Image();
    img.onload = () => {
      signatureImageRef.current = img;
      const aspectRatio = img.width / img.height;
      const defaultHeight = 80;
      const defaultWidth = defaultHeight * aspectRatio;

      setSignature({
        x: 50,
        y: 50,
        width: defaultWidth,
        height: defaultHeight,
        dataUrl,
        page: currentPage,
      });
      setShowSignatureDrawer(false);
      toast.success("Signature added! Drag to position, use corners to resize.");
    };
    img.src = dataUrl;
  };

  const handleSignatureImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      handleSignatureCreated(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const getResizeHandle = (x: number, y: number): ResizeHandle => {
    if (!signature) return null;

    const handleSize = 10;
    const handles = {
      nw: { x: signature.x, y: signature.y },
      ne: { x: signature.x + signature.width, y: signature.y },
      sw: { x: signature.x, y: signature.y + signature.height },
      se: { x: signature.x + signature.width, y: signature.y + signature.height },
    };

    for (const [key, handle] of Object.entries(handles)) {
      if (
        Math.abs(x - handle.x) <= handleSize &&
        Math.abs(y - handle.y) <= handleSize
      ) {
        return key as ResizeHandle;
      }
    }

    return null;
  };

  const isPointInSignature = (x: number, y: number): boolean => {
    if (!signature) return false;
    return (
      x >= signature.x &&
      x <= signature.x + signature.width &&
      y >= signature.y &&
      y <= signature.y + signature.height
    );
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!signature || !overlayCanvasRef.current || signature.page !== currentPage) return;

    const rect = overlayCanvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const handle = getResizeHandle(x, y);

    if (handle) {
      setIsResizing(true);
      setResizeHandle(handle);
      setDragStart({ x, y });
      setSignatureStart({
        x: signature.x,
        y: signature.y,
        width: signature.width,
        height: signature.height,
      });
    } else if (isPointInSignature(x, y)) {
      setIsDragging(true);
      setDragStart({ x, y });
      setSignatureStart({
        x: signature.x,
        y: signature.y,
        width: signature.width,
        height: signature.height,
      });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!signature || !overlayCanvasRef.current) return;

    const rect = overlayCanvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isResizing && resizeHandle) {
      const dx = x - dragStart.x;
      const dy = y - dragStart.y;
      const aspectRatio = signatureStart.width / signatureStart.height;

      let newWidth = signatureStart.width;
      let newHeight = signatureStart.height;
      let newX = signatureStart.x;
      let newY = signatureStart.y;

      switch (resizeHandle) {
        case "se":
          newWidth = Math.max(50, signatureStart.width + dx);
          newHeight = newWidth / aspectRatio;
          break;
        case "sw":
          newWidth = Math.max(50, signatureStart.width - dx);
          newHeight = newWidth / aspectRatio;
          newX = signatureStart.x + signatureStart.width - newWidth;
          break;
        case "ne":
          newWidth = Math.max(50, signatureStart.width + dx);
          newHeight = newWidth / aspectRatio;
          newY = signatureStart.y + signatureStart.height - newHeight;
          break;
        case "nw":
          newWidth = Math.max(50, signatureStart.width - dx);
          newHeight = newWidth / aspectRatio;
          newX = signatureStart.x + signatureStart.width - newWidth;
          newY = signatureStart.y + signatureStart.height - newHeight;
          break;
      }

      setSignature({
        ...signature,
        x: Math.max(0, Math.min(newX, overlayCanvasRef.current.width - newWidth)),
        y: Math.max(0, Math.min(newY, overlayCanvasRef.current.height - newHeight)),
        width: newWidth,
        height: newHeight,
      });
    } else if (isDragging) {
      const dx = x - dragStart.x;
      const dy = y - dragStart.y;

      setSignature({
        ...signature,
        x: Math.max(0, Math.min(signatureStart.x + dx, overlayCanvasRef.current.width - signature.width)),
        y: Math.max(0, Math.min(signatureStart.y + dy, overlayCanvasRef.current.height - signature.height)),
      });
    } else {
      // Update cursor based on position
      const handle = getResizeHandle(x, y);
      if (handle) {
        overlayCanvasRef.current.style.cursor = `${handle}-resize`;
      } else if (isPointInSignature(x, y)) {
        overlayCanvasRef.current.style.cursor = "move";
      } else {
        overlayCanvasRef.current.style.cursor = "default";
      }
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle(null);
  };

  const handleReset = () => {
    setSignature(null);
    signatureImageRef.current = null;
    toast.success("Signature removed");
  };

  const handleDownload = async () => {
    if (!signature) {
      toast.error("Please add a signature first");
      return;
    }

    try {
      toast.loading("Processing PDF...");
      
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      const page = pages[signature.page - 1];

      // Convert signature to embedded image
      const signatureImageBytes = await fetch(signature.dataUrl).then((res) =>
        res.arrayBuffer()
      );
      const signatureImage = await pdfDoc.embedPng(signatureImageBytes);

      // Calculate position (PDF coordinates are from bottom-left)
      const { height: pageHeight, width: pageWidth } = page.getSize();
      const scale = pageWidth / (canvasRef.current?.width || 1);

      page.drawImage(signatureImage, {
        x: signature.x * scale,
        y: pageHeight - (signature.y + signature.height) * scale,
        width: signature.width * scale,
        height: signature.height * scale,
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      saveAs(blob, `signed-${file.name}`);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      toast.error("Failed to save PDF");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              onClick={() => setShowSignatureDrawer(true)}
            >
              <UploadIcon className="mr-2 h-4 w-4" />
              Draw Signature
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleSignatureImageUpload}
              className="hidden"
            />
            <Button
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadIcon className="mr-2 h-4 w-4" />
              Upload Signature
            </Button>
            {signature && (
              <Button
                variant="outline"
                onClick={handleReset}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            )}
            <Button
              onClick={handleDownload}
              disabled={!signature}
              variant="default"
            >
              <Download className="mr-2 h-4 w-4" />
              Save & Download
            </Button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="bg-card rounded-2xl shadow-[0_20px_60px_-10px_hsl(var(--primary)/0.2)] p-6"
        >
          <div className="flex justify-center">
            <div className="relative inline-block">
              <canvas
                ref={canvasRef}
                className="border border-border rounded-lg shadow-sm max-w-full h-auto"
              />
              <canvas
                ref={overlayCanvasRef}
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onMouseLeave={handleCanvasMouseUp}
                className="absolute top-0 left-0 cursor-default"
              />
            </div>
          </div>
          
          {signature && signature.page === currentPage && (
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>💡 Drag signature to move • Use corner handles to resize</p>
            </div>
          )}
        </div>

        {numPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm font-medium">
              Page {currentPage} of {numPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))}
              disabled={currentPage === numPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {showSignatureDrawer && (
        <SignatureDrawer
          onSignatureCreated={handleSignatureCreated}
          onCancel={() => setShowSignatureDrawer(false)}
        />
      )}
    </div>
  );
};
