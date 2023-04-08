import Image from "next/image";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import IconButton from "../IconButton";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface IPhotoFromInputViewerProps {
  photos: File[];
  onRemove: (index: number) => void;
}

const processFileAsync = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = (e) => {
      resolve(e.target?.result as string);
    };

    fileReader.onerror = (err) => reject(err);
  });

const PhotoFromInputViewer = ({
  photos,
  onRemove,
}: IPhotoFromInputViewerProps) => {
  const [processedPhotos, setProcessedPhotos] = useState<string[]>([]);

  const processAllFilesAsync = useCallback(async () => {
    const results = await Promise.all(photos.map(processFileAsync));
    setProcessedPhotos(results);
  }, [photos]);

  useEffect(() => {
    processAllFilesAsync();
  }, [photos, processAllFilesAsync]);

  return (
    <div className="flex justify-start flex-wrap gap-3 p-3">
      {processedPhotos.map((photo, index) => (
        <div
          style={{ height: "220px", width: "280px" }}
          className="relative"
          key={`photo-from-input-viewer-${index}`}
        >
          <Image
            alt="A"
            src={photo}
            width={280}
            height={220}
            style={{ height: "220px", width: "280px" }}
            className="rounded-lg"
          />
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

export default memo(PhotoFromInputViewer, (prev, next) => {
  if (prev.photos.length !== next.photos.length) return false;

  const fileNamesPrev = prev.photos
    .map((photo) => photo.name + photo.size)
    .join(",");
  const fileNamesNext = next.photos
    .map((photo) => photo.name + photo.size)
    .join(",");

  if (fileNamesNext !== fileNamesPrev) return false;

  return true;
});
