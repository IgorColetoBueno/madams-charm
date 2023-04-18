// Import necessary dependencies and components
import Image from "next/image";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import IconButton from "../icon-button/IconButton";
import { XMarkIcon } from "@heroicons/react/24/solid";

// Define the props interface for this component
interface IPhotoFromInputViewerProps {
  photos: File[];
  onRemove: (index: number) => void;
}

// Function to process a file asynchronously
const processFileAsync = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();

    // Read the file as a data URL
    fileReader.readAsDataURL(file);

    // Resolve the Promise with the data URL when the file is loaded
    fileReader.onload = (e) => {
      resolve(e.target?.result as string);
    };

    // Reject the Promise if there's an error
    fileReader.onerror = (err) => reject(err);
  });

// Define the PhotoFromInputViewer component
const PhotoFromInputViewer = ({
  photos,
  onRemove,
}: IPhotoFromInputViewerProps) => {
  // Store the processed photos in state
  const [processedPhotos, setProcessedPhotos] = useState<string[]>([]);

  // Define a callback function to process all files asynchronously
  const processAllFilesAsync = useCallback(async () => {
    // Process each file using the processFileAsync function and store the results in state
    const results = await Promise.all(photos.map(processFileAsync));
    setProcessedPhotos(results);
  }, [photos]);

  // Call the processAllFilesAsync function whenever the photos prop changes
  useEffect(() => {
    processAllFilesAsync();
  }, [photos, processAllFilesAsync]);

  // Render the component
  return (
    <div className="flex justify-start flex-wrap gap-3 p-3">
      {processedPhotos.map((photo, index) => (
        <div
          style={{ height: "220px", width: "280px" }}
          className="relative"
          key={`photo-from-input-viewer-${index}`}
        >
          {/* Render an Image component for each processed photo */}
          <Image
            alt="A"
            src={photo}
            width={280}
            height={220}
            style={{ height: "220px", width: "280px" }}
            className="rounded-lg"
          />
          {/* Render a button to remove the current photo */}
          <IconButton
            onClick={() => {
              onRemove(index);
            }}
            bgColor="red"
            color="white"
            textColor="white"
            textColorOnHover="red"
            className="absolute -top-2 -right-2"
          >
            <XMarkIcon width={15} />
          </IconButton>
        </div>
      ))}
    </div>
  );
};

// Memoize the PhotoFromInputViewer component so that it only re-renders when its props change
export default memo(PhotoFromInputViewer, (prev, next) => {
  // If the number of photos is different between the previous and next props, we need to re-render
  if (prev.photos.length !== next.photos.length) return false;

  // Otherwise, check if the file names and sizes are the same for each photo in the previous and next props
  const fileNamesPrev = prev.photos
    .map((photo) => photo.name + photo.size)
    .join(",");
  const fileNamesNext = next.photos
    .map((photo) => photo.name + photo.size)
    .join(",");

  // Return true if the file names and sizes are the same, indicating that we don't need to re-render
  if (fileNamesNext !== fileNamesPrev) return false;

  return true;
});
