// https://github.com/typicode/json-server#getting-started

type UserProps = {
  firstName: string;
  lastName: string;
  email: {
    address: string;
  };
  eligibility: {
    cardNumber: string;
    cardImageUrl: string;
  };
};

type VisitsProps = {
  date: string;
  isFlex: boolean;
  locationId: string;
  locationName: string;
};

// TODO: cacheing, revalidation, error handling, etc
export async function getUser() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const res = await fetch("http://127.0.0.1:4000/user", {});
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const data: Promise<UserProps> = await res.json();
  return data;
}

export async function getVisits() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const res = await fetch("http://127.0.0.1:4000/visits", {
    // next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const data: Promise<VisitsProps[]> = await res.json();
  return data;
}
