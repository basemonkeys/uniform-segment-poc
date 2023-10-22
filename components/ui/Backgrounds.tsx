import { CloudinaryImage } from "@/components/ui/client-components/Cloudinary";

export function LightBackground() {
  return (
    <div className="absolute z-0 h-full w-full bg-white bg-cover bg-left-top bg-no-repeat">
      <CloudinaryImage
        fill
        src="silversneakers/ayfp6mzjmqo5dpyzhosj"
        alt="White Swoosh"
        className="object-cover"
      />
      <CloudinaryImage
        fill
        src="silversneakers/feffiy7gf94xaebp2lep"
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
        src="silversneakers/oydg5urpuzfkrh2pywu6"
        alt="Blue Swoosh"
        className="object-cover"
      />
      <CloudinaryImage
        fill
        src="silversneakers/okjz19zlcyva7oyeisrs"
        alt="Blue Swoosh"
        className="object-cover"
      />
    </div>
  );
}
