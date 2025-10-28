import { Label } from "@radix-ui/react-label";
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";

function ProductImageUpload({ imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl }) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    console.log(selectedFile)
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  return (
    <div className="w-full max-w-md mx-auto mt-5">
      <Label className="text-lg font-semibold mb-2 block">Upload Product Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-5"
      >
        <div>
          <Input
            id="uploadImage"
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={handleImageFileChange}
          />
          {!imageFile ? (
            <Label
              htmlFor="uploadImage"
              className="flex flex-col items-center justify-center h-32 cursor-pointer"
            >
              <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
              <span>Drag & Drop or Click to Upload</span>
            </Label>
          ) : (
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 text-primary">
                <FileIcon className="w-8 h-8 text-primary mr-2" />
              </div>
              <p className="text-sm font-medium truncate max-w-[150px]">{imageFile.name}</p>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={handleRemoveImage}
              >
                <XIcon className="w-4 h-4" />
                <span className="sr-only">Remove File</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductImageUpload;
