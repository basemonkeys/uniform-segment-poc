import {
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-next-rsc";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { format } from "date-fns";

import Container from "../Container";

const PrivacyPolicy: React.FC<Types.PolicyUseProps> = ({
  title,
  lastUpdated,
  text,
}) => {
  return (
    <Container className="my-8">
      <h1 className="mb-2 text-3xl font-bold">{title}</h1>
      <p className="mb-6 text-sm italic text-gray-500">
        <span className="font-semibold">Last updated:</span>{" "}
        {format(new Date(lastUpdated), "MMMM do yyyy, h:mm:ss a")}
      </p>
      {/* the prose class comes from https://tailwindcss.com/docs/typography-plugin */}
      <div className="prose prose-table:border-1 odd:prose-tr:bg-gray-100 prose-td:p-4 prose-td:border-1 prose-a:text-link prose-td:w-[340px] max-w-full ">
        {documentToReactComponents(text)}
      </div>
    </Container>
  );
};

registerUniformComponent({
  type: "privacyPolicy",
  component: PrivacyPolicy,
});

export default PrivacyPolicy;
