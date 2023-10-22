import {
  ComponentProps,
  UniformRichText,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

import { Card } from "@/components/ui/card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faTty,
  faClock,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

type ContactCardProps = ComponentProps & {
  title: string;
  phone: {
    path: string;
  };
  email: {
    path: string;
  };
  tty: string;
  hours: string;
};

export function ContactCard({
  title,
  phone,
  email,
  tty,
  hours,
  component,
}: ContactCardProps) {
  return (
    <div className="mb-10 w-full rounded border bg-white p-4 lg:max-w-[400px]">
      <h3 className="mb-4">{title}</h3>
      <UniformRichText
        parameterId="text"
        component={component}
        className="mb-10 lg:max-w-[21rem]"
      />
      <div className="flex flex-col justify-end">
        {phone || email || tty || hours ? (
          <h4 className="mb-2">Questions?</h4>
        ) : null}
        <div className="space-y-2">
          {phone ? (
            <div className="flex gap-1">
              <div className="flex items-center gap-1">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="h-4 w-4 scale-x-[-1]"
                />
                <span className="font-bold">Phone:</span>
              </div>
              <span>
                <a href={`tel:${phone.path}`}>{phone.path}</a>
              </span>
            </div>
          ) : null}

          {email ? (
            <div className="flex gap-1">
              <div className="flex items-center gap-1">
                <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
                <span className="font-bold">Email:</span>
              </div>
              {/* email link */}
              <span className="truncate">
                <a href={`mailto:${email.path}`}>{email.path}</a>
              </span>
            </div>
          ) : null}

          {tty ? (
            <div className="flex gap-1">
              <div className="flex items-center gap-1">
                <FontAwesomeIcon icon={faTty} className="h-4 w-4" />
                <span className="font-bold">TTY:</span>
              </div>
              <span>{tty}</span>
            </div>
          ) : null}

          {hours ? (
            <div className="flex gap-1">
              <div className="flex items-center gap-1">
                <FontAwesomeIcon icon={faClock} className="h-4 w-4" />
                <span className="font-bold">Hours:</span>
              </div>
              <span>{hours}</span>
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

registerUniformComponent({
  type: "contactCard",
  component: ContactCard,
});
