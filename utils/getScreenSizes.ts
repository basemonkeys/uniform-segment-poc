"use client";

import { useMediaQuery } from "react-responsive";

// TODO: https://medium.com/@techrally/react-responsive-its-pretty-cool-d61e5ed56d95
// https://github.com/yocontra/react-responsive

// Components
export const Mobile = (children: JSX.Element) => {
  const isMobile = useMediaQuery({
    query: "(min-width: 376px)",
  });
  return isMobile ? children : null;
};

export const Tablet = (children: JSX.Element) => {
  const isMobile = useMediaQuery({
    query: "(min-width: 376px)",
  });
  return isMobile ? children : null;
};

export const Desktop = (children?: JSX.Element) => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  return isDesktop ? children : null;
};
// End Components

export const useIsLargeScreen = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  return isDesktop;
};
