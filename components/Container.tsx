import { ReactNode } from "react";
import classNames from "classnames";

interface Props {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  return (
    <div className={classNames("m-auto max-w-screen-xl", className)}>
      {children}
    </div>
  );
};

export default Container;
