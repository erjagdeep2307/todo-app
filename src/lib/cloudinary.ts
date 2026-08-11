// Types for Cloudinary API responses
export interface CloudinarySuccessResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
}

export interface CloudinaryErrorResponse {
  error: {
    message: string;
  };
}

export type CloudinaryResponse = CloudinarySuccessResponse | CloudinaryErrorResponse;

const CLOUD_NAME = "todoupload"; 
const UPLOAD_PRESET = "todoupload";

/**
 * Uploads a File object to Cloudinary and returns the secure URL string.
 */
export async function uploadToCloudinary(image: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data: CloudinaryResponse = await response.json();

  if (!response.ok || "error" in data) {
    const errorMessage = "error" in data ? data.error.message : "Upload failed";
    throw new Error(errorMessage);
  }

  return data.secure_url;
}