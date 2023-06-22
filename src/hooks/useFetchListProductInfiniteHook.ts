// ** React Imports
import { useState, useEffect, useCallback, useMemo } from "react";
// ** Helper Import
import { getListProductApi } from "../helper/fetchProduct";
// ** Types
import { Product } from "../types/typesProduct";

export const useFetchListProductInfiniteHook = () => {
  // ** State
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLastPage, setLastPage] = useState<boolean>(false);

  const [filter, setFilter] = useState<{
    skip: number;
    limit: number;
    searchQuery: string;
  }>({
    skip: 0,
    limit: 20,
    searchQuery: "",
  });

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getListProductApi({
        search: filter.searchQuery,
        skip: filter.skip,
        limit: filter.limit,
      });
      if (result) {
        if (result?.products.length) {
          let newData = [...data, ...result.products];
          setData(newData);
        }
        if (result?.products.length < filter.limit) {
          setLastPage(true);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [filter.skip, filter.limit, filter.searchQuery]);

  const handleLoadMore = useCallback(() => {
    setFilter({
      ...filter,
      skip: Number(filter.skip) + 1,
    });
  }, [filter.skip]);

  const isLoadingInit = useMemo(() => {
    return loading && filter?.skip === 1;
  }, [loading, filter]);

  const handleSearch = useCallback((searchQuery: string) => {
    console.log("searchQuery:", searchQuery);
    if (searchQuery !== filter.searchQuery) {
      setData([]); // Clear previous data
      setLastPage(false); // Reset last page state
      setFilter({
        skip: 0, // Reset skip number to start from the first page
        limit: 20,
        searchQuery,
      });
    } else {
      setFilter({
        ...filter,
        skip: Number(filter.skip) + 1,
      });
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [filter.skip, filter.searchQuery]);

  return {
    data,
    filter,
    isLoadingInit,
    loading,
    handleLoadMore,
    isLastPage,
    handleSearch,
  };
};
