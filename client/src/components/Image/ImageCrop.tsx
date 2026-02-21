import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  ZoomIn,
  ZoomOut,
  Crop as CropIcon,
  SquareAsterisk,
  CropIcon as CropRatioIcon,
  Check,
} from "lucide-react";

const ImageCropper = ({
  onCropDone,
  imageSrc,
  setCroppedAreaPixels,
  croppedAreaPixels,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1); // Default aspect ratio

  // Handle crop complete
  const handleCropComplete = useCallback(
    (_, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [setCroppedAreaPixels]
  );

  // Handle "Done" button click
  const handleDone = () => {
    if (croppedAreaPixels) {
      onCropDone(imageSrc, croppedAreaPixels);
    }
  };

  // Handle zoom change via slider
  const handleZoomChange = useCallback((value) => {
    setZoom(value[0]);
  }, []);

  return (
    <div className="w-full rounded-lg overflow-hidden bg-background border">
      {imageSrc && (
        <>
          <div className="relative h-80 sm:h-96 w-full bg-black">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
              classes={{
                containerClassName: "w-full h-full",
              }}
            />
          </div>

          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-4">
              <ZoomOut className="h-4 w-4 text-muted-foreground" />
              <Slider
                defaultValue={[1]}
                min={1}
                max={3}
                step={0.1}
                value={[zoom]}
                onValueChange={handleZoomChange}
                className="flex-1"
              />
              <ZoomIn className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium mr-2 flex items-center">
                <CropRatioIcon className="h-4 w-4 mr-1" />
                Aspect ratio:
              </span>
              <Button
                size="sm"
                variant={aspect === 1 ? "default" : "outline"}
                onClick={() => setAspect(1)}
                className="h-8"
              >
                1:1
              </Button>
              <Button
                size="sm"
                variant={aspect === 4 / 3 ? "default" : "outline"}
                onClick={() => setAspect(4 / 3)}
                className="h-8"
              >
                4:3
              </Button>
              <Button
                size="sm"
                variant={aspect === 16 / 9 ? "default" : "outline"}
                onClick={() => setAspect(16 / 9)}
                className="h-8"
              >
                16:9
              </Button>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleDone} className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                Crop
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCropper;
