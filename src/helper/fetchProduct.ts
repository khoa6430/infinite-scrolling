import axios from "axios";
import { ListProduct } from "../types/typesProduct";

export const getListProductApi = async ({
  page = 0,
  take = 20,
  search = "",
}: {
  page: number;
  take: number;
  search: string;
}): Promise<ListProduct | null> => {
  try {
    const res = await axios(
      `https://dummyjson.com/products/search?q=${search}&skip=${
        page * 10
      }&limit=${take}
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
