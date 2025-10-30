import { Label } from "@radix-ui/react-label";
import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";


function ProductImageUpload({ imageFile, setImageFile, imageLoadingState, uploadedImageUrl, setUploadedImageUrl, setImageLoadingState , isEditMode}) {
  const inputRef = useRef(null);

  console.log(isEditMode, "isEditMode")

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

  console.log(imageFile)

 async function uploadImageTpCloudinary() {
  setImageLoadingState(true)
  const data = new FormData();
  data.append('my_file', imageFile)
  const response = await axios.post('http://localhost:3000/api/admin/products/upload-image', data)
  console.log(response, 'response')
  if(response?.data?.success) {
    
    setUploadedImageUrl(response.data.result.url)};
    setImageLoadingState(false)
 }

  useEffect(()=> {
    if(imageFile !== null) uploadImageTpCloudinary()
  }, [imageFile])

  return (
    <div className="w-full max-w-md mx-auto mt-5">
      <Label className="text-lg font-semibold mb-2 block">Upload Product Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-5`}
      >
        <div>
          <Input
            id="uploadImage"
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={handleImageFileChange}
            disabled = {isEditMode}
          />
          {!imageFile ? (
            <Label
              htmlFor="uploadImage"
              className={`${isEditMode ? 'cursor-not-allowed' : '' } flex flex-col items-center justify-center h-32 cursor-pointer`}
            >
              <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
              <span>Drag & Drop or Click to Upload</span>
            </Label>
          ) : (
            imageLoadingState ? (
  <div className="flex flex-col items-center justify-center gap-2 py-6">
    <Skeleton className="h-20 w-20 rounded-md" /> 
    <Skeleton className="h-4 w-32" /> 
    <p className="text-xs text-muted-foreground">Uploading image...</p>
  </div>
) :
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
