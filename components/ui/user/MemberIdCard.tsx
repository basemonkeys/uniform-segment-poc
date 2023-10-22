import Image from "next/image";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faDownload } from "@fortawesome/free-solid-svg-icons";

import { getUser } from "@/utils/api";

export async function MemberIdCard() {
  const user = await getUser();
  const { eligibility } = user;

  const memberCardNumber = user.eligibility.cardNumber.replace(
    /(.{4})\B/g,
    "$1-",
  );

  return (
    <Card className="flex flex-col justify-between gap-6 md:flex-row">
      <div>
        <CardHeader>
          <CardTitle>Member ID</CardTitle>
          <span className="space-x-1 text-lg tracking-wider">
            <span>#</span>
            <span>{memberCardNumber}</span>
          </span>
        </CardHeader>
        <CardContent className="pt-2">
          <p className="md:max-w-sm">
            Your member ID gets you into thousands of fitness locations and
            classes. Just download or print your member ID and share it at your
            favorite location.
          </p>
        </CardContent>

        {/* TODO: write the Print and Download functions */}
        <CardFooter className="flex gap-4">
          <Button variant="secondaryWhite" className="space-x-2">
            <FontAwesomeIcon icon={faPrint} className="h-5 w-5" />
            <span>Print</span>
          </Button>
          <Button variant="secondaryWhite" className="space-x-2">
            <FontAwesomeIcon icon={faDownload} className="h-5 w-5" />
            <span>Download</span>
          </Button>
        </CardFooter>
      </div>
      <div className="max-md:mt-5">
        <Image
          src={eligibility.cardImageUrl}
          width={400}
          height={288}
          alt="Your SilverSneakers Member Card"
          className="rounded-lg border shadow-lg"
        />
      </div>
    </Card>
  );
}
