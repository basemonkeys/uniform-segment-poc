// // "use client";
// // To obey the rules of hooks, these have to be called in the body of a function. They also need to be run on the client with "use client". I wanted to run this before the return statement in Hero.tsx but that is a server component. What is the best pattern to run these hooks on the client and use them within a server component? The suggested way to do this is the send down as a prop, but that seems like over engineering for this particular need.

// import { useMediaQuery } from "react-responsive";

// export const isXsScreen = useMediaQuery({
//   query: "(min-width: 376px)",
// });

// export const isSmScreen = useMediaQuery({
//   query: "(min-width: 640px)",
// });

// export const isMdScreen = useMediaQuery({
//   query: "(min-width: 768px)",
// });

// export const isLgScreen = useMediaQuery({
//   query: "(min-width: 1024px)",
// });

// export const isXlScreen = useMediaQuery({
//   query: "(min-width: 1280px)",
// });

// export const is2XlScreen = useMediaQuery({
//   query: "(min-width: 1536px)",
// });

// // Usage
// // size={isSmScreen ? "sm" : "lg"}
