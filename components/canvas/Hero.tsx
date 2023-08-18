import {
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-next-rsc";

import { Button } from "../Button";

type HeroProps = ComponentProps<{
  // bgImage: Types.CloudinaryImage;
  // image: Types.CloudinaryImage;
  title: string;
  description: string;
  primaryCTA: string;
  secondaryCTA: string;
}>;

const Hero: React.FC<HeroProps> = ({ 
  // bgImage,
  // image,
  title,
  description,
  primaryCTA,
  secondaryCTA
 }) => (
  <div>
    <h1 className="text-3xl font-bold underline">{title}</h1>
    <p>{description}</p>
    <div className="flex justify-around">
      {/* can we improve VS code on Button hover data */}
      <Button primary={true} label={primaryCTA} />
      <Button label={secondaryCTA} />
    </div>
  </div>
);

registerUniformComponent({
  type: "hero",
  component: Hero,
});

export default Hero;
