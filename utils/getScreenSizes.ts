"use client";
// TODO: https://medium.com/@techrally/react-responsive-its-pretty-cool-d61e5ed56d95

// https://github.com/yocontra/react-responsive

import { useMediaQuery } from "react-responsive";

type Props = {
  children: JSX.Element;
};

// Components
export const Mobile = ({ children }: Props) => {
  const isMobile = useMediaQuery({
    query: "(min-width: 376px)",
  });
  return isMobile ? children : null;
};

export const Tablet = ({ children }: Props) => {
  const isMobile = useMediaQuery({
    query: "(min-width: 376px)",
  });
  return isMobile ? children : null;
};

export const Desktop = ({ children }: Props) => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  return isDesktop ? children : null;
};

// Media Queries
export const isLgScreen = () => {
  const isLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  return isLgScreen;
};
