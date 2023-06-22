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
    pageNumber: number;
    pageSize: number;
    searchQuery: string;
  }>({
    pageNumber: 0,
    pageSize: 20,
    searchQuery: "",
  });

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getListProductApi({
        search: filter.searchQuery,
        page: filter.pageNumber,
        take: filter.pageSize,
      });
      if (result) {
        if (result?.products.length) {
          let newData = [...data, ...result.products];
          setData(newData);
        }
        if (result?.products.length < filter.pageSize) {
          setLastPage(true);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [filter.pageNumber, filter.pageSize, filter.searchQuery]);

  const handleLoadMore = useCallback(() => {
    setFilter({
      ...filter,
      pageNumber: Number(filter.pageNumber) + 1,
    });
  }, [filter.pageNumber]);

  const isLoadingInit = useMemo(() => {
    return loading && filter?.pageNumber === 1;
  }, [loading, filter]);

  const handleSearch = useCallback((searchQuery: string) => {
    setData([]); // Clear previous data
    setLastPage(false); // Reset last page state
    setFilter({
      pageNumber: 0, // Reset page number to start from the first page
      pageSize: 20,
      searchQuery,
    });
  }, []);

  useEffect(() => {
    fetch();
  }, [filter.pageNumber, filter.searchQuery]);

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
