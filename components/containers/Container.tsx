import { cn } from "@/utils";

export enum ContainerVariants {
  FullWidth = "fullWidth",
}

export type Props = {
  containerVariant?: string;
  children: React.ReactNode;
  className?: string;
};

function BaseContainer({ children, className }: Props) {
  return <div className={cn("", className)}>{children}</div>;
}

function ScreenContainer({ children, className }: Props) {
  return (
    <BaseContainer
      className={cn("container m-auto max-w-screen-xl", className)}
    >
      {children}
    </BaseContainer>
  );
}

export function Container({ containerVariant, children, className }: Props) {
  if (containerVariant === ContainerVariants.FullWidth) {
    return <BaseContainer className={className}>{children}</BaseContainer>;
  }

  return <ScreenContainer className={className}>{children}</ScreenContainer>;
}
