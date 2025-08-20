import { useState } from "react";
import { RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InteractiveImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const InteractiveImage = ({ src, alt, className = "" }: InteractiveImageProps) => {
  const [isRotating, setIsRotating] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleRotate = () => {
    setRotation(prev => prev + 90);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const toggleAutoRotate = () => {
    setIsRotating(!isRotating);
  };

  return (
    <div className={`relative group overflow-hidden rounded-lg ${className}`}>
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isRotating ? 'animate-rotate-slow' : ''
          }`}
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
          }}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-luxury"></div>
      </div>

      {/* Interactive Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-luxury">
        <Button
          size="icon"
          variant="secondary"
          className="w-8 h-8 bg-luxury-black/80 text-white hover:bg-wine border-0"
          onClick={toggleAutoRotate}
        >
          <RotateCw className={`w-4 h-4 ${isRotating ? 'animate-pulse-glow' : ''}`} />
        </Button>
        
        <Button
          size="icon"
          variant="secondary"
          className="w-8 h-8 bg-luxury-black/80 text-white hover:bg-wine border-0"
          onClick={handleZoomIn}
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        
        <Button
          size="icon"
          variant="secondary"
          className="w-8 h-8 bg-luxury-black/80 text-white hover:bg-wine border-0"
          onClick={handleZoomOut}
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
      </div>

      {/* Manual Rotate Button */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-luxury">
        <Button
          size="icon"
          variant="secondary"
          className="w-8 h-8 bg-luxury-black/80 text-white hover:bg-gold border-0"
          onClick={handleRotate}
        >
          <RotateCw className="w-4 h-4" />
        </Button>
      </div>

      {/* Zoom Indicator */}
      {zoom !== 1 && (
        <div className="absolute top-4 left-4 px-2 py-1 bg-luxury-black/80 text-white text-xs rounded">
          {Math.round(zoom * 100)}%
        </div>
      )}
    </div>
  );
};