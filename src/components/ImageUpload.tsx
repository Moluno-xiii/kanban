import {
  useState,
  useRef,
  ChangeEvent,
  DragEvent,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
} from "react";
import toast from "react-hot-toast";
import { IoIosCloudUpload } from "react-icons/io";

interface ImageUploadProps {
  onImageUpload: Dispatch<SetStateAction<string>>;
  storedImgUrl?: string | undefined;
  error?: string | null;
  imageUrl?: string | File;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  storedImgUrl,
  error,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadImageToCloudinary = async (file: File) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_1");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );
      if (!response.ok) {
        throw new Error("Network error, try again.");
      }

      const data = await response.json();
      if (data.secure_url) {
        setSelectedImage(data.secure_url);
        onImageUpload(data.secure_url);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected error";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      uploadImageToCloudinary(file);
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      uploadImageToCloudinary(file);
    }
  };

  return (
    <div
      className="border-secondary bg-secondary/25 relative flex size-60 cursor-pointer flex-col items-center justify-center rounded-4xl border-2"
      tabIndex={0}
      role="button"
      aria-label="Upload an image"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        name="profile_picture"
        id="profile_picture"
        className="hidden"
        onChange={handleChange}
      />
      {error && <p className="text-error mt-2 text-sm">{error}</p>}

      {isLoading ? (
        <div className="flex flex-col items-center space-y-4">
          <span>Uploading image...</span>
        </div>
      ) : selectedImage ? (
        <img
          src={selectedImage}
          alt="Selected image"
          className="h-full w-full rounded-4xl object-cover"
          aria-label="selected image"
        />
      ) : storedImgUrl ? (
        <img
          src={storedImgUrl as string}
          alt="Selected image"
          className="h-full w-full rounded-4xl object-cover"
          aria-label="selected image"
        />
      ) : (
        <div className="flex flex-col items-center space-y-4 p-4 text-center">
          <IoIosCloudUpload color="var(--color-primary)" size={30} />
          <p className="text-sm">Drag & drop or click to upload</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
