import { ReactNode } from "react";

import classNames from "classnames";

interface Props {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  return (
    <div className={classNames(className, "m-auto max-w-screen-xl")}>
      {children}
    </div>
  );
};

export default Container;
