import { registerUniformComponent } from "@uniformdev/canvas-next-rsc";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { format } from "date-fns";

const TermsOfUse: React.FC<Types.PolicyUseProps> = ({
  title,
  lastUpdated,
  text,
}) => {
  return (
    <div className="mb-12">
      <p className="mb-6 text-sm italic text-gray-500">
        <span className="font-semibold">Last updated:</span>{" "}
        {format(new Date(lastUpdated), "MMMM do yyyy, h:mm:ss a")}
      </p>
      {/* the "prose" class comes from https://tailwindcss.com/docs/typography-plugin. Custom SilverSneakers styles can be found in tailwind.config.js. */}
      <div className="prose max-w-full">{documentToReactComponents(text)}</div>
    </div>
  );
};

registerUniformComponent({
  type: "termsOfUse",
  component: TermsOfUse,
});

export default TermsOfUse;
