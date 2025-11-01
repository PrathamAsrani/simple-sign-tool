import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PDFUploadProps {
  onFileSelect: (file: File) => void;
}

export const PDFUpload = ({ onFileSelect }: PDFUploadProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      onFileSelect(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8 px-4">
      <div className="text-center space-y-4 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          SignEase
        </h1>
        <p className="text-xl text-muted-foreground">
          Secure Digital Signing Made Simple
        </p>
        <p className="text-base text-muted-foreground max-w-lg mx-auto">
          Upload your PDF document, add your signature, and download the signed version—all securely processed in your browser.
        </p>
      </div>

      <label htmlFor="pdf-upload">
        <input
          id="pdf-upload"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          variant="hero"
          size="lg"
          className="cursor-pointer"
          asChild
        >
          <span>
            <Upload className="mr-2 h-5 w-5" />
            Upload PDF Document
          </span>
        </Button>
      </label>

      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>Client-side processing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span>100% secure</span>
        </div>
      </div>
    </div>
  );
};
