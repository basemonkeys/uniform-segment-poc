// This is a site wide loading state and can be overriden for component specific loading states with React <Suspense />

import { CloudinaryImage } from "@/components/ui/client-components/Cloudinary";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export default function Loading() {
  return (
    <main className="flex h-screen flex-col items-center justify-center space-y-6">
      <CloudinaryImage
        src="silversneakers/logo_primary_vk0ca4"
        alt="Loading"
        width={250}
        height={100}
      />
      <h3 className="flex animate-pulse items-center text-primary">
        <FontAwesomeIcon
          icon={faCircleNotch}
          className="mr-2 h-5 w-5 animate-spin"
        />
        loading content...
      </h3>
    </main>
  );
}
