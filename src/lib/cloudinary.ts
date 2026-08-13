import imageCompression from "browser-image-compression";
const CLOUD_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD;
if (!CLOUD_NAME || !CLOUD_PRESET) {
  console.warn(`Missing Cloudinary Information form Enviourment`);
}
export interface CloudinaryUploadResp {
  public_id: string;
  secure_url: string;
}

export const uploadCloudinary = async (
  file: File,
): Promise<CloudinaryUploadResp> => {
  const compressionOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1200,
    useWebWorker: true,
  };
  const compressedImage = await imageCompression(file, compressionOptions);
  const formData = new FormData();
  formData.append("file", compressedImage);
  formData.append("upload_preset", CLOUD_PRESET);
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );
  if(!response.ok)
  {
    const errorData = await response.json();
    throw new Error(errorData?.error?.message || "Failed to upload image.");
  }
  const data = await response.json();
  return {
    secure_url: data.secure_url,
    public_id: data.public_id
  }
};
