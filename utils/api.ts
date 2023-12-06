// https://github.com/typicode/json-server#getting-started
// TODO: intergrate SilverSneakers API
// TODO: cacheing, and revalidation

import axios from "axios";

export async function getApiData(id: string) {
  try {
    const res = await axios.get(`http://localhost:4000/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(`Error:${error}`);
  }
}
