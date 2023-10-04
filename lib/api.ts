// https://github.com/typicode/json-server#getting-started

// TODO: cacheing, revalidation, error handling, etc
export const getUser = async () => {
  const res = await fetch("http://127.0.0.1:4000/user", {
    next: { revalidate: 5000 },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
};

export const getVisits = async () => {
  const res = await fetch("http://127.0.0.1:4000/visits");
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
};
