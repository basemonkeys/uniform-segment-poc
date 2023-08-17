import {
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-next-rsc";

type HeroProps = ComponentProps<{
  title: string;
  description?: string;
}>;

const Hero: React.FC<HeroProps> = ({ title, description }) => (
  <div>
    <h1 className="text-3xl font-bold underline">{title}</h1>
    {description ? (
      <div
        className="description"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    ) : null}
  </div>
);

registerUniformComponent({
  type: "hero",
  component: Hero,
});

export default Hero;
