// Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
// TODO: remove this any type
export default function cloudinaryLoader({ src, width, quality }: any) {
  const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality || "auto"}`];
  return `https://res.cloudinary.com/${params.join(",")}${src}`;
}
