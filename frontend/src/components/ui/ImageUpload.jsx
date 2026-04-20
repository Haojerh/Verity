import React, { useState, useRef, useEffect } from "react";
import { CloudUpload, Trash2 } from "lucide-react";

export default function ImageUpload({ value, onChange, label, type="banner" }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Handle preview URL generation and cleanup
  useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return;
    }

    // If it's already a string (URL from database), use it
    if (typeof value === "string") {
      setPreviewUrl(value);
      return;
    }

    // If it's a new File object, create a local blob URL
    const objectUrl = URL.createObjectURL(value);
    setPreviewUrl(objectUrl);

    // Free memory when component unmounts or value changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [value]);

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      onChange(file);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  // Style Toggles based on "type"
  const isBanner = type === "banner";
  
  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-widest ml-1 text-muted-foreground">
        {label}
      </label>

      <div
        onClick={() => !previewUrl && fileInputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`
          relative flex flex-col items-center justify-center w-full transition-all cursor-pointer overflow-hidden min-h-40 rounded-2xl
          ${previewUrl ? "border-transparent" : "bg-muted/70 border-2 border-dashed border-muted-foreground/20 hover:bg-muted/50"}
          ${isDragging ? "border-primary bg-primary/5" : ""}
        `}
      >
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={(e) => handleFile(e.target.files[0])}
          accept="image/*"
        />

        {previewUrl ? (
          <div className={`relative group w-full h-full flex justify-center items-center ${isBanner ? "p-0" : "p-4"}`}>
            {/* Preview Image */}
            <div className={`
              overflow-hidden shadow-xl
              ${isBanner 
                ? "w-full h-40 rounded-xl" 
                : "w-32 h-32 rounded-full"
              }
            `}>
              <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
            
            {/* Action Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <button
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(null);
                }}
                className="bg-destructive text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center gap-3 text-muted-foreground p-6 text-center">
            <CloudUpload size={32} className={isDragging && "text-primary"} />
            <div className="space-y-1">
               <p className="text-sm font-medium">Click to upload {type}</p>
               <p className="text-xs opacity-60">PNG, JPG up to 10MB</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}