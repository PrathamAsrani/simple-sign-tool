import { useState } from "react";
import { PDFUpload } from "@/components/PDFUpload";
import { PDFEditor } from "@/components/PDFEditor";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleBack = () => {
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {!selectedFile ? (
          <PDFUpload onFileSelect={handleFileSelect} />
        ) : (
          <PDFEditor file={selectedFile} onBack={handleBack} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
