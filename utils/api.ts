// https://github.com/typicode/json-server#getting-started
// TODO: intergrate SilverSneakers API
// TODO: cacheing, and revalidation

import axios from "axios";

const userUrl = "http://127.0.0.1:4000/user";
const visitsUrl = "http://127.0.0.1:4000/visits";
const liveClassesUrl = "http://127.0.0.1:4000/live";
const fitnessLocationsUrl = "http://127.0.0.1:4000/locations";
const memberUrl = "http://127.0.0.1:4000/member";

export async function getUser() {
  try {
    const res = await axios.get(userUrl);
    return res.data;
  } catch (error) {
    throw new Error(`Error:${error}`);
  }
}

export async function getVisits() {
  try {
    const res = await axios.get(visitsUrl);
    return res.data;
  } catch (error) {
    throw new Error(`Error:${error}`);
  }
}

export async function getLiveClasses() {
  const res = await fetch(liveClassesUrl);
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }
}

export async function getFitnessLocations() {
  const res = await fetch(fitnessLocationsUrl);
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }
}

export async function getMember() {
  const res = await fetch(memberUrl);
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }
}
