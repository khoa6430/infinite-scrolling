// ** React Imports
import * as React from "react";
// ** Third Party Components
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
// ** Custom Components Imports
import { SkeletonContainer } from "../SkeletonContainer";
// ** Hooks Import
import { useFetchListProductInfiniteHook } from "../../hooks/useFetchListProductInfiniteHook";

export interface InfiniteScrollListProps {}

export default function InfiniteScrollList(props: InfiniteScrollListProps) {
  // ** Hooks
  const {
    filter,
    data,
    isLoadingInit,
    loading,
    handleLoadMore,
    isLastPage,
    handleSearch,
  } = useFetchListProductInfiniteHook();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    handleSearch(searchQuery); // Call the handleSearch function with the input value
  };
  return (
    <div
      style={{
        height: "100vh",
        margin: "auto",
        maxWidth: "540px",
      }}
    >
      <h1>Infinite Scrolling and Searchable Product List</h1>
      <input
        type="text"
        placeholder="Search product..."
        style={{
          width: "100%",
          height: "50px",
          border: "1px blue solid",
          marginBottom: "50px",
          marginTop: "50px",
          borderRadius: "8px",
        }}
        onChange={handleInputChange}
      />
      <InfiniteScroll
        dataLength={data?.length}
        next={handleLoadMore}
        hasMore={true}
        loader={<>{!isLastPage ? <h4>Loading...</h4> : <h4>End</h4>}</>}
      >
        <div>
          <div className="px-4 mt-6">
            <SkeletonContainer
              isLoading={isLoadingInit}
              skeletonComponent={
                <div className="w-[133px] h-[133px] relative">
                  <Skeleton width="100%" height="100%" />
                </div>
              }
            >
              {data.map((item, index) => {
                return (
                  <div style={{ height: "100px" }}>
                    PRODUCT {item.id} : {item.title}
                  </div>
                );
              })}
            </SkeletonContainer>
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
}
