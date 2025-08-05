import { useUploadThing } from "@/lib/uploadthing";
import { useDropzone } from "@uploadthing/react";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImageIcon, Loader2, Upload } from "lucide-react";
import Image from "next/image";

type CustomUploaderProps = {
  onChange?: (url: string) => void;
  setisUploading?: Dispatch<SetStateAction<boolean>>;
  imageUrl?: string;
};

const CustomUploader = ({
  onChange,
  setisUploading,
  imageUrl,
}: CustomUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string>();
  const imgSrc = previewUrl || imageUrl;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    if (acceptedFiles.length > 0) {
      const preview = URL.createObjectURL(acceptedFiles[0]);
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return preview;
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const { startUpload, isUploading, routeConfig } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: (res) => {
        if (res && res[0]?.ufsUrl) onChange?.(res[0].ufsUrl);
        setisUploading?.(false);
        setFiles([]);
        setPreviewUrl(undefined);
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
    <div>
      {!imageUrl && (
        <div className="rounded-lg border border-dashed p-6 text-center">
          <div {...getRootProps()}>
            <Input {...getInputProps()} />
            <ImageIcon className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
            <p className="text-muted-foreground mb-2 cursor-pointer text-sm hover:underline">
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
      )}
      <div className="relative grid h-44 place-items-center overflow-clip rounded-lg border">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt="preview-image"
            fill
            className="object-cover"
          />
        ) : (
          <span className="text-lg">Preview</span>
        )}
      </div>
    </div>
  );
};

export default CustomUploader;
