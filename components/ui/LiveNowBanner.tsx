import { useAtomValue } from "jotai";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { liveClassStatusAtom } from "@/utils/uiState";

export function LiveNowBanner() {
  const status = useAtomValue(liveClassStatusAtom);
  return (
    <>
      {status ? (
        // TODO: break this out into a component
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCircle} className="h-3 w-3 text-red-500" />
          <span>Live Now</span>
        </div>
      ) : (
        <div>Up Next</div>
      )}
    </>
  );
}
