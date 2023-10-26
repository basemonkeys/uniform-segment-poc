// https://github.com/typicode/json-server#getting-started
// TODO: intergrate SilverSneakers API
// TODO: cacheing, and revalidation

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

export async function getUser() {
  const res = await fetch("http://127.0.0.1:4000/user");
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }
}

export async function getVisits() {
  const res = await fetch("http://127.0.0.1:4000/visits");
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }
}
