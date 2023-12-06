import { CloudinaryImage } from "@/components/client-components/Cloudinary";

export function LightBackground() {
  return (
    <div className="absolute z-0 h-full w-full bg-white bg-cover bg-left-top bg-no-repeat">
      <CloudinaryImage
        fill
        src="SilverSneakers/Graphics/white_swoosh_1"
        alt="White Swoosh"
        className="object-cover"
      />
      <CloudinaryImage
        fill
        src="SilverSneakers/Graphics/white_swoosh_2"
        alt="White Swoosh"
        className="object-cover"
      />
    </div>
  );
}

export function DarkBackground() {
  return (
    <div className="absolute z-0 h-full w-full bg-primary bg-cover bg-left-top bg-no-repeat">
      <CloudinaryImage
        fill
        src="SilverSneakers/Graphics/blue_swoosh_1"
        alt="Blue Swoosh"
        className="object-cover"
      />
      <CloudinaryImage
        fill
        src="SilverSneakers/Graphics/blue_swoosh_2"
        alt="Blue Swoosh"
        className="object-cover"
      />
    </div>
  );
}
