"use client"
import React, { useState } from "react";
import Link from "next/link"; // Import Link from Next.js

export default function UploadImage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null); // To store image preview URL
  const [imageUrl, setImageUrl] = useState<string | null>(null); // Store the image URL from Cloudinary
  const [digit, setDigit] = useState<number | null>(null); // Store the predicted digit
  const [isImageUploaded, setIsImageUploaded] = useState(false); // Track if the image is uploaded
  const [isLoading, setIsLoading] = useState(false); // Track if prediction is in progress

  interface CloudinaryResponse {
    secure_url: string;
  }

  interface PredictionResponse {
    predicted_digit: number; // Update this to match the response structure
  }

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file: File | undefined = event.target.files?.[0];
    if (!file) return;

    const formData: FormData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "ai_project"); // Set your Cloudinary upload preset
    formData.append("cloud_name", "de1yfnzdz"); // Set your Cloudinary cloud name

    // Set image preview before upload
    setImagePreview(URL.createObjectURL(file));
    setIsImageUploaded(true); // Mark that the image has been uploaded

    try {
      const res: Response = await fetch(`https://api.cloudinary.com/v1_1/de1yfnzdz/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data: CloudinaryResponse = await res.json();
      setImageUrl(data.secure_url); // Set the image URL after successful upload
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const getResult = async () => {
    if (!imageUrl) return; // Do nothing if there's no image URL

    setIsLoading(true); // Start loading

    try {
      // Send the image URL to the new backend endpoint for prediction
      const result: Response = await fetch("https://ea94-35-231-68-211.ngrok-free.app/predict_from_url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: imageUrl }), // Send the image URL as "url" field
      });
      const resultData: PredictionResponse = await result.json();
      setDigit(resultData.predicted_digit); // Access predicted_digit from the response
    } catch (error) {
      console.error("Error during prediction:", error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const handleImageClick = () => {
    // Trigger the file input when the image is clicked to change it
    document.getElementById("file-input")?.click();
  };

  const handleChangeImage = () => {
    // Reset the image states to allow uploading a new image
    setImagePreview(null);
    setImageUrl(null);
    setDigit(null);
    setIsImageUploaded(false);
  };

  return (
    <section className="mb-6 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-green-600">Upload Digit Image</h2>
      
      <p className="text-green-300 mb-4">
        Upload an image of a digit, and we'll use a pre-trained model to predict the digit for you.
      </p>

      <div className="flex justify-center items-center mb-6">
        {!isImageUploaded ? (
          <label
            htmlFor="file-input"
            className="bg-green-100 p-4 rounded-md cursor-pointer w-64 h-32 flex justify-center items-center text-center text-green-600 border-2 border-green-200"
          >
            <span>Click to upload image</span>
            <input
              type="file"
              id="file-input"
              onChange={uploadImage}
              className="hidden"
            />
          </label>
        ) : (
          <div className="relative cursor-pointer" onClick={handleImageClick}>
            <img
              src={imagePreview || ""}
              alt="Uploaded Preview"
              className="w-64 h-32 object-contain border-2 border-green-200 rounded-md"
            />
          </div>
        )}
      </div>

      {isImageUploaded && !digit && (
        <div className="text-center mt-4">
          <button
            onClick={getResult}
            disabled={isLoading}
            className={`bg-green-600 text-white p-2 rounded-md hover:bg-green-700 ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            {isLoading ? 'Processing...' : 'Get Predicted Result'}
          </button>
        </div>
      )}

      {digit !== null && (
        <div className="flex justify-center mt-6">
          <div className="bg-green-100 p-4 rounded-md w-64 text-center text-xl text-green-600">
            Predicted Digit: {digit}
          </div>
        </div>
      )}

      {/* Change Image Button */}
      {(isImageUploaded || digit !== null) && (
        <div className="text-center mt-4">
          <button
            onClick={handleChangeImage}
            className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700"
          >
            Change Image
          </button>
        </div>
      )}

      {/* Back to Home Button */}
      <div className="text-center mt-4">
        <Link href="/" passHref>
          <button className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
            Back to Home
          </button>
        </Link>
      </div>
    </section>
  );
}
