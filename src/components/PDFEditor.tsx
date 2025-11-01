import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Download, Edit, ArrowLeft } from "lucide-react";
import { SignatureDrawer } from "./SignatureDrawer";
import { toast } from "sonner";
import { saveAs } from "file-saver";

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

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

export const PDFEditor = ({ file, onBack }: PDFEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showSignatureDrawer, setShowSignatureDrawer] = useState(false);
  const [signature, setSignature] = useState<SignaturePosition | null>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    loadPDF();
  }, [file]);

  useEffect(() => {
    if (pdfDoc && currentPage) {
      renderPage(currentPage);
    }
  }, [pdfDoc, currentPage, signature]);

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
    if (!pdfDoc || !canvasRef.current) return;

    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise;

    // Draw signature if on current page
    if (signature && signature.page === pageNum && context) {
      const img = new Image();
      img.onload = () => {
        context.drawImage(
          img,
          signature.x,
          signature.y,
          signature.width,
          signature.height
        );
      };
      img.src = signature.dataUrl;
    }
  };

  const handleSignatureCreated = (dataUrl: string) => {
    setSignature({
      x: 50,
      y: 50,
      width: 200,
      height: 100,
      dataUrl,
      page: currentPage,
    });
    setShowSignatureDrawer(false);
    toast.success("Signature added! Drag it to position.");
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!signature || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (
      x >= signature.x &&
      x <= signature.x + signature.width &&
      y >= signature.y &&
      y <= signature.y + signature.height
    ) {
      setIsDragging(true);
      setDragOffset({
        x: x - signature.x,
        y: y - signature.y,
      });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !signature || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;

    setSignature({
      ...signature,
      x: Math.max(0, Math.min(x, canvasRef.current.width - signature.width)),
      y: Math.max(0, Math.min(y, canvasRef.current.height - signature.height)),
    });
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };

  const handleDownload = async () => {
    if (!signature) {
      toast.error("Please add a signature first");
      return;
    }

    try {
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
      const { height: pageHeight } = page.getSize();
      const scale = page.getWidth() / (canvasRef.current?.width || 1);

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

          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => setShowSignatureDrawer(true)}
            >
              <Edit className="mr-2 h-4 w-4" />
              {signature ? "Change Signature" : "Add Signature"}
            </Button>
            <Button
              onClick={handleDownload}
              disabled={!signature}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Signed PDF
            </Button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="bg-card rounded-2xl shadow-[0_20px_60px_-10px_hsl(var(--primary)/0.2)] p-6 overflow-auto"
        >
          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
              className="border border-border rounded-lg shadow-sm cursor-move max-w-full h-auto"
            />
          </div>
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
            <span className="text-sm text-muted-foreground">
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
