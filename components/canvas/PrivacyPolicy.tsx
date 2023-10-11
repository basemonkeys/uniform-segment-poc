import { registerUniformComponent } from "@uniformdev/canvas-next-rsc";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { format } from "date-fns";

const PrivacyPolicy: React.FC<Types.PolicyUseProps> = ({
  title,
  lastUpdated,
  text,
}) => {
  return (
    <div className="my-8">
      <h1 className="mb-2 text-3xl font-bold">{title}</h1>
      <p className="mb-6 text-sm italic text-gray-500">
        <span className="font-semibold">Last updated:</span>{" "}
        {format(new Date(lastUpdated), "MMMM do yyyy, h:mm:ss a")}
      </p>
      {/* the prose class comes from https://tailwindcss.com/docs/typography-plugin */}
      <div className="prose max-w-full prose-a:text-link prose-table:border odd:prose-tr:bg-gray-100 prose-td:w-[340px] prose-td:border prose-td:p-4 ">
        {documentToReactComponents(text)}
      </div>
    </div>
  );
};

registerUniformComponent({
  type: "privacyPolicy",
  component: PrivacyPolicy,
});

export default PrivacyPolicy;
