import { registerUniformComponent } from "@uniformdev/canvas-next-rsc";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faTty, faClock } from "@fortawesome/free-solid-svg-icons";

type ContactPhoneProps = {
  heading: string;
  phone: {
    path: string;
  };
  tty: string;
  hours: string;
};

export function ContactPhone({
  heading,
  phone,
  tty,
  hours,
}: ContactPhoneProps) {
  return (
    <div className="container m-auto mb-6">
      <h2 className="mb-4">{heading}</h2>
      <div className="space-y-2">
        <div className="flex gap-1">
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faPhone} className="h-4 w-4 scale-x-[-1]" />
            <span className="font-bold">Phone:</span>
          </div>
          <span>
            <a href={`tel:${phone.path}`}>{phone.path}</a>
          </span>
        </div>

        <div className="flex gap-1">
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faTty} className="h-4 w-4" />
            <span className="font-bold">TTY:</span>
          </div>
          <span>{tty}</span>
        </div>

        <div className="flex gap-1">
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faClock} className="h-4 w-4" />
            <span className="font-bold">Hours:</span>
          </div>
          <span>{hours}</span>
        </div>
      </div>
    </div>
  );
}

registerUniformComponent({
  type: "contactPhone",
  component: ContactPhone,
});
