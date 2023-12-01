// import React from "react";
// export function useBooksList({ fetchDelay = 0 } = {}) {
//   const [items, setItems] = React.useState([]);
//   const [hasMore, setHasMore] = React.useState(true);
//   const [isLoading, setIsLoading] = React.useState(false);
//   const [offset, setOffset] = React.useState(0);
//   const limit = 10; // Number of items per page, adjust as necessary

//   const loadBooks = async (currentOffset) => {
//     const controller = new AbortController();
//     const { signal } = controller;

//     try {
//       setIsLoading(true);

//       if (offset > 0) {
//         // Delay to simulate network latency
//         await new Promise((resolve) => setTimeout(resolve, fetchDelay));
//       }

//       let res = await fetch(
//         `https://www.googleapis.com/books/v1/volumes?q=HarryPotter&maxResults=20`,
//         { signal }
//       );

//       if (!res.ok) {
//         throw new Error("Network response was not ok");
//       }

//       let json = await res.json();
//       console.log(json.items);

//       // setHasMore(json.items !== null);
//       // // Append new results to existing ones
//       setItems(json.items);
//     } catch (error) {
//       if (error.name === "AbortError") {
//         console.log("Fetch aborted");
//       } else {
//         console.error("There was an error with the fetch operation:", error);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   React.useEffect(() => {
//     loadBooks(offset);
//   }, []);

//   return {
//     items,
//     isLoading,
//   };
// }
