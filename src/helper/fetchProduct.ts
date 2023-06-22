import axios from "axios";
import { ListProduct } from "../types/typesProduct";

export const getListProductApi = async ({
  skip = 0,
  limit = 20,
  search = "",
}: {
  skip: number;
  limit: number;
  search: string;
}): Promise<ListProduct | null> => {
  try {
    const res = await axios(
      `https://dummyjson.com/products/search?q=${search}&skip=${
        skip * 10
      }&limit=${limit}
      `,
      {
        method: "GET",
        timeout: 30000,
      }
    );
    const { data } = res;
    return data;
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.data?.message ||
        "There was an error please try again"
    );
  }
};
