// https://github.com/typicode/json-server#getting-started

export type UserProps = {
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

export type VisitsProps = {
  date: string;
  isFlex: boolean;
  locationId: string;
  locationName: string;
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// TODO: cacheing, and revalidation
export async function getUser(time: number = 0, shouldError: boolean = false) {
  await delay(time);
  const res = await fetch("http://127.0.0.1:4000/user", {
    // next: { revalidate: 60 },
  });
  if (!res.ok || shouldError) {
    throw new Error(res.statusText);
  }
  const data: Promise<UserProps> = await res.json();
  return data;
}

export async function getVisits(
  time: number = 0,
  shouldError: boolean = false,
) {
  await delay(time);
  const res = await fetch("http://127.0.0.1:4000/visits", {
    // next: { revalidate: 60 },
  });
  if (!res.ok || shouldError) {
    throw new Error(res.statusText);
  }
  const data: Promise<VisitsProps[]> = await res.json();
  return data;
}
