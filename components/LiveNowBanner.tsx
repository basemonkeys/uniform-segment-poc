import { useAtomValue } from "jotai";

import { liveClassStatusAtom } from "@/utils/uiState";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export function LiveNowBanner() {
  const status = useAtomValue(liveClassStatusAtom);
  return (
    <>
      {status ? (
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
