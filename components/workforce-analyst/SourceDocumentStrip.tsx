"use client";

import { Button } from "@/components/design-system/Button";
import { Badge } from "@/components/design-system/Badge";

interface SourceDocumentStripProps {
  fileName: string;
  onUploadNew?: () => void;
}

export function SourceDocumentStrip({ fileName, onUploadNew }: SourceDocumentStripProps) {
  const handleUploadNew = () => {
    // TODO: Open upload modal or navigate to upload screen
    console.log("Upload new document clicked");
    if (onUploadNew) {
      onUploadNew();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Source document</span>
          <span className="text-sm text-gray-600">{fileName} · Uploaded successfully</span>
          <Badge value="Published" type="filled" size="small" />
        </div>
        <Button
          buttonType="secondary"
          label="Upload new document"
          onClick={handleUploadNew}
          size="small"
        />
      </div>
    </div>
  );
}

