import { useUploadThing } from "@/lib/uploadthing";
import { useDropzone } from "@uploadthing/react";
import { useCallback, useState } from "react";
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImageIcon, Loader2, Upload } from "lucide-react";

type CustomUploaderProps = {
  onChange?: (url: string) => void;
  setisUploading?: (uploading: boolean) => void;
};

const CustomUploader = ({ onChange, setisUploading }: CustomUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, isUploading, routeConfig } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: (res) => {
        if (res && res[0]?.ufsUrl) onChange?.(res[0].ufsUrl);
        setisUploading?.(false);
        setFiles([]);
      },
      onUploadError: () => {
        console.log("error occurred while uploading");
        setisUploading?.(false);
      },
      onUploadBegin: (file) => {
        setisUploading?.(true);
      },
    },
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes,
    ),
  });

  return (
    <div className="rounded-lg border border-dashed p-6 text-center">
      <div {...getRootProps()}>
        <Input {...getInputProps()} />
        <ImageIcon className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
        <p className="text-muted-foreground mb-2 text-sm">
          Drag and drop an image or click to browse
        </p>
      </div>
      <Button
        type="button"
        size="sm"
        disabled={files.length === 0 || isUploading}
        onClick={() => startUpload(files)}
        className="gap-2"
      >
        {isUploading ? (
          <>
            <Loader2 className="animate-spin" />
            Uploading
          </>
        ) : (
          <>
            <Upload />
            Upload {files.length} {files.length > 1 ? "Images" : "Image"}
          </>
        )}
      </Button>
    </div>
  );
};

export default CustomUploader;
