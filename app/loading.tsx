// This is a site wide loading state and can be overriden for component specific loading states with React <Suspense />

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export default function Loading() {
  return (
    <main className="flex h-screen items-center justify-center">
      <h3 className="flex animate-pulse items-center text-primary">
        <FontAwesomeIcon
          icon={faCircleNotch}
          className="mr-2 h-5 w-5 animate-spin"
        />
        loading...
      </h3>
    </main>
  );
}
